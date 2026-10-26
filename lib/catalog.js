/**
 * Catalog facade: API-first with static fallback for Mimosa.
 */

import {
  getBlogs as fetchBlogs,
  getCategoriesFromServer,
  getProductById,
  getProducts,
  getRelatedProduct,
  isApiConfigured,
} from "./api";
import {
  extractBlogList,
  extractCategoryList,
  extractProductList,
  extractSingleProduct,
  normalizeBlog,
  normalizeCategory,
  normalizeProduct,
} from "./normalize";
import { resolveImageList } from "./media";
import {
  categories as staticCategories,
  getProduct as getStaticProduct,
  getProductsByCategory as getStaticByCategory,
  getRelatedProducts as getStaticRelated,
  products as staticProducts,
} from "./products";

function withStaticSource(list) {
  return list.map((p) => ({
    ...p,
    source: p.source || "static",
    images: resolveImageList(p.images),
  }));
}

/**
 * All products for shop / home.
 */
export async function getCatalogProducts() {
  if (!isApiConfigured()) {
    return withStaticSource(staticProducts);
  }

  const res = await getProducts(1, 0);
  const raw = extractProductList(res);
  const mapped = raw
    .map(normalizeProduct)
    .filter(Boolean)
    .filter((p) => p.inStock);

  if (mapped.length === 0) {
    return withStaticSource(staticProducts);
  }
  return mapped;
}

/**
 * Categories for filters / shop-by-ritual.
 */
export async function getCatalogCategories() {
  if (!isApiConfigured()) {
    return staticCategories.map((c) => ({ ...c, source: "static" }));
  }

  const res = await getCategoriesFromServer();
  const raw = extractCategoryList(res);
  const mapped = raw.map(normalizeCategory).filter(Boolean);

  if (mapped.length === 0) {
    return staticCategories.map((c) => ({ ...c, source: "static" }));
  }
  return mapped;
}

export async function getCatalogCategory(slug) {
  const cats = await getCatalogCategories();
  return cats.find((c) => c.slug === slug) || null;
}

/**
 * Products in a category (by Mimosa slug).
 */
export async function getCatalogProductsByCategory(categorySlug) {
  const cats = await getCatalogCategories();
  const cat = cats.find((c) => c.slug === categorySlug);

  if (!isApiConfigured() || !cat?.apiId) {
    return withStaticSource(getStaticByCategory(categorySlug));
  }

  const all = await getCatalogProducts();
  const filtered = all.filter(
    (p) =>
      p.category?.includes(categorySlug) ||
      String(p.categoryId) === String(cat.apiId),
  );

  if (filtered.length === 0) {
    const staticHit = getStaticByCategory(categorySlug);
    if (staticHit.length) return withStaticSource(staticHit);
  }
  return filtered;
}

/**
 * Resolve product by Mimosa slug or raw API id.
 */
export async function getCatalogProduct(slugOrId) {
  if (!slugOrId) return null;

  // Static first for known marketing slugs (fast path when no API)
  const staticHit = getStaticProduct(slugOrId);
  if (staticHit && !isApiConfigured()) {
    return { ...staticHit, source: "static" };
  }

  if (isApiConfigured()) {
    // Trailing numeric id from slug "name-42" or bare id
    const idMatch = String(slugOrId).match(/(\d+)$/);
    const maybeId = idMatch ? idMatch[1] : null;

    if (maybeId) {
      const detail = await getProductById(maybeId);
      const raw = extractSingleProduct(detail);
      const normalized = normalizeProduct(raw);
      if (normalized) return normalized;
    }

    const list = await getCatalogProducts();
    const fromList = list.find(
      (p) =>
        p.slug === slugOrId ||
        String(p.id) === String(slugOrId) ||
        String(p.apiId) === String(slugOrId),
    );
    if (fromList) {
      if (fromList.apiId) {
        const detail = await getProductById(fromList.apiId);
        const raw = extractSingleProduct(detail);
        const normalized = normalizeProduct(raw);
        if (normalized) return normalized;
      }
      return fromList;
    }
  }

  if (staticHit) return { ...staticHit, source: "static" };
  return null;
}

export async function getCatalogRelated(product, limit = 3) {
  if (!product) return [];

  if (product.source === "api" && product.apiId && isApiConfigured()) {
    const res = await getRelatedProduct(product.apiId);
    const raw = extractProductList(res);
    const mapped = raw
      .map(normalizeProduct)
      .filter(Boolean)
      .filter((p) => String(p.apiId) !== String(product.apiId))
      .slice(0, limit);
    if (mapped.length) return mapped;
  }

  const all = await getCatalogProducts();
  return all
    .filter((p) => p.id !== product.id)
    .filter(
      (p) =>
        !product.category?.length ||
        p.category?.some((c) => product.category.includes(c)),
    )
    .slice(0, limit);
}

/**
 * Active blogs only. Empty array if none / no env (hide UI).
 */
export async function getCatalogBlogs() {
  if (!isApiConfigured()) return [];

  const res = await fetchBlogs();
  const raw = extractBlogList(res);
  return raw
    .map(normalizeBlog)
    .filter(Boolean)
    .filter((b) => b.status == null || Number(b.status) === 1);
}

export async function getCatalogBlog(id) {
  const blogs = await getCatalogBlogs();
  return blogs.find((b) => String(b.id) === String(id)) || null;
}

export { isApiConfigured, staticProducts, getStaticRelated };
