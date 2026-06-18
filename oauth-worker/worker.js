/**
 * Decap CMS — GitHub OAuth Proxy
 * Deploy this as a Cloudflare Worker (free tier).
 *
 * Required Environment Variables (set in Cloudflare Worker dashboard):
 *   GITHUB_CLIENT_ID     — from your GitHub OAuth App (plaintext var)
 *   GITHUB_CLIENT_SECRET — from your GitHub OAuth App (add as Secret)
 *   SITE_URL             — your Cloudflare Pages URL, e.g. https://church-site-27m.pages.dev
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const corsHeaders = {
      'Access-Control-Allow-Origin': env.SITE_URL || '*',
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

    // ── /callback  →  exchange code for token, send back to Decap CMS ────
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

      if (tokenData.error) {
        return new Response(
          'OAuth error: ' + (tokenData.error_description || tokenData.error),
          { status: 400 }
        );
      }

      const payload = JSON.stringify({
        token: tokenData.access_token,
        provider: 'github',
      });

      // Decap CMS listens for this exact postMessage format
      const message = 'authorization:github:success:' + payload;
      const siteOrigin = env.SITE_URL || '*';

      const html = `<!DOCTYPE html>
<html>
<head><title>Authorized</title></head>
<body>
<script>
(function () {
  var message = ${JSON.stringify(message)};
  var origin  = ${JSON.stringify(siteOrigin)};
  if (window.opener) {
    window.opener.postMessage(message, origin);
  }
  setTimeout(function () { window.close(); }, 500);
})();
</script>
<p>Authorized. This window will close automatically.</p>
</body>
</html>`;

      return new Response(html, {
        headers: { 'Content-Type': 'text/html', ...corsHeaders },
      });
    }

    // Health check
    return new Response('Decap CMS OAuth Proxy — OK', { headers: corsHeaders });
  },
};
