/**
 * Slim Brand Empire public API client for Mimosa.
 * Safe: never throws — callers get null / empty on failure.
 */

export function isApiConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_API?.trim() &&
      process.env.NEXT_PUBLIC_USER_ID?.trim(),
  );
}

function baseUrl() {
  return process.env.NEXT_PUBLIC_API?.replace(/\/$/, "") || "";
}

function userId() {
  return process.env.NEXT_PUBLIC_USER_ID || "";
}

async function safeFetch(url, options = {}) {
  if (!isApiConfigured()) return null;
  try {
    const res = await fetch(url, {
      ...options,
      next: options.next ?? { revalidate: 60 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/** Categories with subcategories */
export async function getCategoriesFromServer() {
  return safeFetch(`${baseUrl()}/public/categories/${userId()}`);
}

/** Paginated products for this store user */
export async function getProducts(page = 1, category_id = 0) {
  const url = `${baseUrl()}/public/products/userwise?user_id=${userId()}&page=${page}&per_page=50&category_id=${category_id}`;
  return safeFetch(url);
}

export async function getCategoryWiseProducts(category_id, page = 1) {
  return safeFetch(
    `${baseUrl()}/public/categorywise-products/${category_id}?page=${page}`,
  );
}

export async function getProductById(product_id) {
  return safeFetch(`${baseUrl()}/public/products-detail/${product_id}`);
}

export async function getRelatedProduct(product_id) {
  return safeFetch(`${baseUrl()}/public/get-related-products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product_id,
      user_id: userId(),
    }),
    next: { revalidate: 120 },
  });
}

/** Latest ecommerce blogs for this store */
export async function getBlogs() {
  return safeFetch(
    `${baseUrl()}/latest-ecommerce-blog-list/${userId()}`,
  );
}
