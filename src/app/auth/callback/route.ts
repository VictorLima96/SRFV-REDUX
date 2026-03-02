import { NextRequest, NextResponse } from 'next/server';

/**
 * OAuth callback relay.
 * Important: some OAuth responses use URL fragments (#access_token...) which
 * are NOT visible to the server. A server redirect would drop that fragment.
 *
 * This handler returns a tiny HTML page that runs in the browser and forwards
 * query + hash to the final localized route, preserving auth payloads.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const next = searchParams.get('next') ?? '/pt-BR';
  const safeNext = next.startsWith('/') ? next : '/pt-BR';

  const relayHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Signing in…</title>
  </head>
  <body style="background:#0b0b0d;color:#fff;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;">
    <div>Signing in…</div>
    <script>
      (function () {
        var origin = ${JSON.stringify(origin)};
        var safeNext = ${JSON.stringify(safeNext)};
        var current = new URL(window.location.href);
        var target = new URL(safeNext, origin);

        var passthrough = ['code', 'error', 'error_description'];
        passthrough.forEach(function (key) {
          var value = current.searchParams.get(key);
          if (value) target.searchParams.set(key, value);
        });

        var destination = target.toString() + (window.location.hash || '');
        window.location.replace(destination);
      })();
    </script>
  </body>
</html>`;

  return new NextResponse(relayHtml, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store, no-cache, max-age=0, must-revalidate',
    },
  });
}
