/**
 * Media URL helpers.
 *
 * Fallback assets live under public/Images (capital I) — Linux hosts are
 * case-sensitive, so always use /Images/... not /images/...
 */

export const FALLBACK_IMAGE = "/Images/brand/logo-beyoutiful.jpg";

/**
 * Turn API / relative / protocol-relative paths into usable absolute or local URLs.
 */
export function resolveMediaUrl(src) {
  if (!src || typeof src !== "string") return null;
  let url = src.trim();
  if (!url) return null;

  // Protocol-relative
  if (url.startsWith("//")) {
    url = `https:${url}`;
  }

  // Prefer https for known CDN http links
  if (url.startsWith("http://")) {
    try {
      const u = new URL(url);
      if (u.hostname.includes("outletexpense.xyz")) {
        url = `https://${u.host}${u.pathname}${u.search}`;
      }
    } catch {
      /* keep original */
    }
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Absolute site path — fix legacy lowercase /images/ → /Images/
  if (url.startsWith("/")) {
    if (url.startsWith("/images/") || url === "/images") {
      return url.replace(/^\/images/, "/Images");
    }
    return url;
  }

  // Relative upload path from API (e.g. "uploads/xyz.jpg")
  const api = process.env.NEXT_PUBLIC_API?.replace(/\/$/, "");
  if (api) {
    try {
      const origin = new URL(api).origin;
      return `${origin}/${url.replace(/^\//, "")}`;
    } catch {
      return `${api}/${url.replace(/^\//, "")}`;
    }
  }

  return `/${url.replace(/^\//, "")}`;
}

export function resolveImageList(paths, fallback = FALLBACK_IMAGE) {
  const resolved = (paths || [])
    .map(resolveMediaUrl)
    .filter(Boolean);
  return resolved.length ? [...new Set(resolved)] : [fallback];
}
