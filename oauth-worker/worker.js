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

    // ── /auth  →  redirect user to GitHub login ──────────────────────────
    if (url.pathname === '/auth') {
      const authUrl = new URL('https://github.com/login/oauth/authorize');
      authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authUrl.searchParams.set('scope', 'repo,user');
      authUrl.searchParams.set('state', crypto.randomUUID());
      return Response.redirect(authUrl.toString(), 302);
    }

    // ── /callback  →  exchange code, do Decap CMS handshake ──────────────
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
        const msg = tokenData.error_description || tokenData.error || 'Unknown error';
        return new Response(`GitHub OAuth error: ${msg}`, { status: 400 });
      }

      const token = tokenData.access_token;

      // Decap CMS handshake:
      // 1. We send "authorizing:github" to the opener (with target *)
      // 2. Decap CMS bounces it back to us
      // 3. Our receiveMessage fires with e.origin = the CMS page's origin
      // 4. We send the success token using that confirmed origin as target
      const html = `<!DOCTYPE html>
<html>
<head><title>Authorized</title></head>
<body>
<script>
(function () {
  var token    = ${JSON.stringify(token)};
  var provider = 'github';
  var success  = 'authorization:' + provider + ':success:' + JSON.stringify({ token: token, provider: provider });

  function receiveMessage(e) {
    window.removeEventListener('message', receiveMessage, false);
    window.opener.postMessage(success, e.origin);
    setTimeout(function () { window.close(); }, 500);
  }

  window.addEventListener('message', receiveMessage, false);

  // Kick off the handshake
  window.opener.postMessage('authorizing:' + provider, '*');
})();
</script>
<p>Authorized. This window will close automatically.</p>
</body>
</html>`;

      return new Response(html, {
        headers: { 'Content-Type': 'text/html', ...corsHeaders },
      });
    }

    return new Response('Decap CMS OAuth Proxy — OK', { headers: corsHeaders });
  },
};
