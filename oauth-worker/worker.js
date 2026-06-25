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

    // ── /callback  →  exchange code, send token to Decap CMS ─────────────
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
          `<h2 style="color:red;font-family:sans-serif">OAuth Error</h2><pre>${msg}</pre>
           <p style="font-family:sans-serif">Check that GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET are set in your Cloudflare Worker environment variables.</p>`,
          { status: 400, headers: { 'Content-Type': 'text/html' } }
        );
      }

      const token = tokenData.access_token;
      const success = `authorization:github:success:${JSON.stringify({ token, provider: 'github' })}`;

      // Show a status page — auto-closes after login completes.
      // Tries the two-step handshake first, falls back to direct send after 2s.
      const html = `<!DOCTYPE html>
<html>
<head>
  <title>Authorizing...</title>
  <style>
    body { font-family: sans-serif; display: flex; flex-direction: column;
           align-items: center; justify-content: center; min-height: 100vh;
           margin: 0; background: #f5f5f5; color: #333; }
    #status { font-size: 1.2rem; font-weight: bold; margin-bottom: 1rem; }
    #log { font-size: 0.75rem; color: #666; max-width: 400px; text-align: left; }
  </style>
</head>
<body>
  <div id="status">Connecting to CMS...</div>
  <div id="log"></div>
<script>
(function () {
  var token   = ${JSON.stringify(token)};
  var success = ${JSON.stringify(success)};
  var statusEl = document.getElementById('status');
  var logEl    = document.getElementById('log');

  function log(msg) {
    logEl.innerHTML += '<div>' + msg + '</div>';
  }

  // Check window.opener
  if (!window.opener) {
    statusEl.textContent = 'Error: popup lost connection to CMS.';
    statusEl.style.color = 'red';
    log('window.opener is null. Try disabling your popup blocker, or use Chrome.');
    return;
  }

  log('Connected to CMS window.');
  log('Token received from GitHub. ✓');

  var done = false;

  // Step 1: Handshake — send "authorizing:github", wait for Decap CMS to bounce it back
  function receiveMessage(e) {
    if (done) return;
    log('Received handshake reply from: ' + e.origin);
    done = true;
    window.removeEventListener('message', receiveMessage, false);
    window.opener.postMessage(success, e.origin);
    log('Token sent to CMS. ✓');
    statusEl.textContent = 'Authorized! Closing...';
    setTimeout(function () { window.close(); }, 1000);
  }

  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
  log('Handshake sent. Waiting for reply...');

  // Fallback: if Decap CMS does not bounce back within 2s, send directly
  setTimeout(function () {
    if (done) return;
    done = true;
    window.removeEventListener('message', receiveMessage, false);
    log('No handshake reply — sending token directly.');
    window.opener.postMessage(success, '*');
    statusEl.textContent = 'Authorized! Closing...';
    setTimeout(function () { window.close(); }, 1000);
  }, 2000);
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
