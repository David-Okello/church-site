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
          `<h2 style="color:red;font-family:sans-serif">OAuth Error</h2><pre>${msg}</pre>`,
          { status: 400, headers: { 'Content-Type': 'text/html' } }
        );
      }

      const token = tokenData.access_token;
      const success = `authorization:github:success:${JSON.stringify({ token, provider: 'github' })}`;

      const html = `<!DOCTYPE html>
<html>
<head><title>Authorized</title></head>
<body style="font-family:sans-serif;text-align:center;padding-top:80px;">
<p>Authorized. Closing...</p>
<script>
(function () {
  var success = ${JSON.stringify(success)};

  if (!window.opener) {
    document.body.innerHTML = '<p style="color:red">Error: lost connection to CMS window. Close this and try again.</p>';
    return;
  }

  // Send token directly — no handshake needed
  window.opener.postMessage(success, '*');

  // Also try after a short delay in case CMS listener isn't ready yet
  setTimeout(function () {
    window.opener.postMessage(success, '*');
    setTimeout(function () { window.close(); }, 500);
  }, 300);
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
