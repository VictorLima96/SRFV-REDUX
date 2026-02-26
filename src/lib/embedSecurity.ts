const RETROGAMES_HOSTS = new Set(['www.retrogames.cc', 'retrogames.cc']);
const YOUTUBE_HOSTS = new Set(['www.youtube.com', 'youtube.com']);

function isSafePathForHost(hostname: string, pathname: string): boolean {
  if (RETROGAMES_HOSTS.has(hostname)) {
    return pathname.startsWith('/embed/') && pathname.endsWith('.html');
  }

  if (YOUTUBE_HOSTS.has(hostname)) {
    return pathname.startsWith('/embed/');
  }

  return false;
}

export function sanitizeEmbedUrl(input: string): string | null {
  try {
    const url = new URL(input);
    const hostname = url.hostname.toLowerCase();

    if (url.protocol !== 'https:') return null;
    if (!isSafePathForHost(hostname, url.pathname)) return null;
    if (!RETROGAMES_HOSTS.has(hostname) && !YOUTUBE_HOSTS.has(hostname)) return null;

    return url.toString();
  } catch {
    return null;
  }
}
