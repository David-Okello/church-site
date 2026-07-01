# Decap CMS — GitHub OAuth via Cloudflare Worker

This folder holds the OAuth proxy that lets Decap CMS (the `/admin` panel)
authenticate church staff with GitHub — **no Netlify account or payment
required**. Netlify's git-gateway was dropped because Netlify started
charging ~$9/month.

- **`worker.js`** — the Cloudflare Worker source. Paste it into the
  Cloudflare dashboard and deploy.

---

## How the whole thing fits together

```
Staff open church-site-27m.pages.dev/admin
        │
        ▼
Decap CMS opens a popup → Worker /auth → GitHub login
        │
        ▼
GitHub redirects → Worker /callback (exchanges code for a token)
        │
        ▼
Callback page hands the token back to the CMS window (postMessage)
        │
        ▼
Decap CMS is logged in → edits commit straight to the GitHub repo
        │
        ▼
Cloudflare Pages rebuilds the site (~60s) → content is live
```

Everything is free: GitHub stores the content, Cloudflare hosts + rebuilds,
the Worker only runs during login (well under the 100k requests/day free tier).

---

## One-time setup

### 1. GitHub OAuth App
GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**
- **Homepage URL:** `https://church-site-27m.pages.dev`
- **Authorization callback URL:** `https://decap-oauth.okellodavid002.workers.dev/callback`
- **Do NOT enable Device Flow** (that's for browserless devices; the CMS runs in a browser)
- After registering, copy the **Client ID** and generate a **Client Secret**

### 2. Cloudflare Worker
Cloudflare → Workers & Pages → Create → Worker → name it `decap-oauth` → deploy.
Then **Edit code**, paste all of `worker.js`, and **Deploy**.

Under the worker's **Settings → Variables and Secrets** add:

| Name | Value | Type |
|---|---|---|
| `GITHUB_CLIENT_ID` | from the OAuth App | Text |
| `GITHUB_CLIENT_SECRET` | from the OAuth App | **Secret** |

> ⚠️ **Re-deploying the code from the Cloudflare editor does NOT happen
> automatically when you push to GitHub.** The worker is edited/deployed by
> hand in the Cloudflare dashboard. Every time `worker.js` changes here,
> you must paste it in and click Deploy again.

### 3. CMS config
`church-site/public/admin/config.yml`:
```yaml
backend:
  name: github
  repo: David-Okello/church-site
  branch: main
  base_url: https://decap-oauth.okellodavid002.workers.dev   # no trailing slash!
  auth_endpoint: /auth
```

---

## The Decap CMS handshake (why the naive version fails)

This was the hard part. Decap CMS does **not** simply wait for a token —
it runs a specific two-step handshake, and it only starts listening for
the token *after* the first step completes:

```js
// Inside Decap CMS (simplified from decap-cms-lib-auth)
handshakeCallback(e) {
  if (e.data === "authorizing:github" && e.origin === this.base_url) {
    window.removeEventListener('message', handshakeCallback);
    window.addEventListener('message', authorizeCallback);   // ← ONLY NOW listens for the token
    return this.authWindow.postMessage(e.data, e.origin);    // ← bounces "authorizing:github" back
  }
}
```

So the callback page **must**:
1. Post `authorizing:github` to `window.opener`.
2. Wait for the CMS to bounce `authorizing:github` back.
3. *Then* post `authorization:github:success:{...token...}`.

If you skip step 1–2, the CMS's token listener was never registered and
your token lands on deaf ears.

---

## Debugging history (what went wrong, in order)

Kept as a record so nobody re-walks this path.

### Symptom 1 — popup closed, but CMS stayed on the login screen
- **Cause:** `admin/index.html` still loaded the old
  `netlify-identity-widget.js`. It intercepted the OAuth popup and then did
  nothing, because Netlify Identity was no longer configured.
- **Fix:** removed the Netlify Identity `<script>` from `admin/index.html`
  (and the matching scripts from `app/layout.tsx`). Commit `3f072e6`.

### Symptom 2 — still stuck after removing Netlify
- **First attempt (wrong):** a handshake listener that fired on *any*
  message and replied to `e.origin`. The debug log showed the reply origin
  came back as the **worker** origin, so the token was posted to the wrong
  origin and the browser **silently dropped it**. Commit `b9d6483`.
- **Second attempt (wrong):** skipped the handshake entirely and sent the
  token directly with `'*'`. This can *never* work — per the code above,
  Decap hasn't registered its token listener yet, so there's nothing
  listening. Commit `c0c9e7c`.
- **Debug UI:** added a visible status page in the popup that logged each
  step. This is what revealed the "reply from worker origin" clue.
  Commit `06e7f5f`.

### The fix that worked (commit `bc23448`)
- **Do** the handshake (so Decap registers its token listener).
- Only respond to the genuine `authorizing:github` bounce
  (`if (e.data !== 'authorizing:github') return;`).
- Reply with the token targeting `'*'` — the message still only reaches
  `window.opener` (the CMS window), but the `'*'` target means an
  origin mismatch can't cause the browser to drop it.
- Added a 1.5s safety-net that sends the token anyway if the bounce never
  arrives.

### Key lessons
1. `postMessage(msg, targetOrigin)` — if `targetOrigin` doesn't exactly
   match the recipient window's real origin, the browser drops the message
   **with no error**. When in doubt for a single trusted opener, `'*'` is
   safe because the message only goes to that one window anyway.
2. Decap only listens for the token *after* the handshake — the handshake
   is mandatory, not optional.
3. `base_url` in `config.yml` must have **no trailing slash** so Decap's
   `e.origin === this.base_url` check passes.
4. The Cloudflare Worker must be **manually re-deployed** from the
   dashboard after every change to `worker.js`; pushing to GitHub alone
   does nothing for the worker.
