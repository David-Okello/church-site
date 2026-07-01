/**
 * Decap CMS — GitHub OAuth Proxy
 * Deploy this as a Cloudflare Worker (free tier).
 *
 * Required Environment Variables (set in Cloudflare Worker dashboard):
 *   GITHUB_CLIENT_ID     — from your GitHub OAuth App (plaintext var)
 *   GITHUB_CLIENT_SECRET — from your GitHub OAuth App (add as Secret)
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // ── /auth  →  redirect to GitHub login ───────────────────────────────
    if (url.pathname === '/auth') {
      const authUrl = new URL('https://github.com/login/oauth/authorize');
      authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authUrl.searchParams.set('scope', 'repo,user');
      authUrl.searchParams.set('state', crypto.randomUUID());
      return Response.redirect(authUrl.toString(), 302);
    }

    // ── /callback  →  exchange code, complete Decap CMS handshake ────────
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) {
        return new Response('Missing code parameter', { status: 400 });
      }

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const tokenData = await tokenRes.json();

      if (tokenData.error || !tokenData.access_token) {
        const msg = tokenData.error_description || tokenData.error || 'No token returned';
        return new Response(
          `<h2 style="color:red;font-family:sans-serif">OAuth Error</h2><pre>${msg}</pre>`,
          { status: 400, headers: { 'Content-Type': 'text/html' } }
        );
      }

      const token = tokenData.access_token;
      const success = `authorization:github:success:${JSON.stringify({ token, provider: 'github' })}`;

      // Decap CMS handshake protocol:
      //  1. Popup posts "authorizing:github" to the opener (the CMS window).
      //  2. The CMS registers its token listener, then bounces
      //     "authorizing:github" back to this popup.
      //  3. On receiving that bounce, the popup posts the success/token
      //     message. We target '*' so any origin mismatch cannot drop it —
      //     the message still only reaches window.opener (the CMS).
      const html = `<!DOCTYPE html>
<html>
<head>
  <title>Authorizing…</title>
  <style>
    body { font-family: sans-serif; display:flex; flex-direction:column;
           align-items:center; justify-content:center; min-height:100vh;
           margin:0; background:#f5f5f5; color:#333; }
    #status { font-size:1.1rem; font-weight:bold; }
    #log { font-size:.72rem; color:#888; margin-top:1rem; max-width:420px; }
  </style>
</head>
<body>
  <div id="status">Completing login…</div>
  <div id="log"></div>
<script>
(function () {
  var success  = ${JSON.stringify(success)};
  var statusEl = document.getElementById('status');
  var logEl    = document.getElementById('log');
  function log(m){ logEl.innerHTML += '<div>' + m + '</div>'; }

  if (!window.opener) {
    statusEl.textContent = 'Error: lost connection to the CMS window.';
    statusEl.style.color = 'red';
    log('Disable popup blockers and try again in the same tab.');
    return;
  }

  var sent = false;
  function sendToken() {
    if (sent) return;
    sent = true;
    window.removeEventListener('message', onMessage, false);
    window.opener.postMessage(success, '*');
    statusEl.textContent = 'Authorized! Closing…';
    log('Token delivered to CMS. ✓');
    setTimeout(function(){ window.close(); }, 600);
  }

  // Step 2→3: wait for the CMS to bounce "authorizing:github" back, then send the token
  function onMessage(e) {
    if (e.data !== 'authorizing:github') return;
    log('Handshake confirmed by CMS. ✓');
    sendToken();
  }
  window.addEventListener('message', onMessage, false);

  // Step 1: initiate the handshake
  window.opener.postMessage('authorizing:github', '*');
  log('Handshake sent, waiting for CMS…');

  // Safety net: if the CMS never bounces back within 1.5s, send anyway
  setTimeout(function(){
    if (!sent) { log('No bounce received — sending token directly.'); sendToken(); }
  }, 1500);
})();
</script>
</body>
</html>`;

      return new Response(html, {
        headers: { 'Content-Type': 'text/html', ...corsHeaders },
      });
    }

    return new Response('Decap CMS OAuth Proxy — OK', { headers: corsHeaders });
  },
};
