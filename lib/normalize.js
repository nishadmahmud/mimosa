/**
 * Map Brand Empire API payloads → Mimosa UI product / category / blog shapes.
 */

export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function stripHtml(html) {
  if (!html) return "";
  let text = String(html).replace(/<[^>]*>/g, " ");
  const entities = {
    "&nbsp;": " ",
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
  };
  text = text.replace(/&[a-z]+;|&#\d+;/gi, (match) => {
    if (entities[match.toLowerCase()]) return entities[match.toLowerCase()];
    const num = match.match(/&#(\d+);/);
    if (num) return String.fromCharCode(parseInt(num[1], 10));
    return " ";
  });
  return text.replace(/\s+/g, " ").trim();
}

function parsePrice(raw) {
  if (raw == null || raw === "") return 0;
  if (typeof raw === "number") return Math.round(raw);
  const n = parseFloat(String(raw).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? Math.round(n) : 0;
}

function collectImages(item) {
  const paths = [];
  if (Array.isArray(item.image_paths) && item.image_paths.length) {
    paths.push(...item.image_paths);
  }
  for (const key of [
    "image_path",
    "image_path1",
    "image_path2",
    "image_path3",
    "image",
    "thumbnail",
  ]) {
    if (item[key]) paths.push(item[key]);
  }
  return [...new Set(paths.filter((p) => typeof p === "string" && p.trim()))];
}

function specValue(specs, names) {
  if (!Array.isArray(specs)) return "";
  const lower = names.map((n) => n.toLowerCase());
  const found = specs.find((s) =>
    lower.some((n) => String(s?.name || "").toLowerCase().includes(n)),
  );
  return found?.description ? stripHtml(found.description) : "";
}

function productPrice(item) {
  const variants = Array.isArray(item.product_variants)
    ? item.product_variants
    : [];
  const base =
    item.final_price ??
    item.selling_price ??
    item.price ??
    item.mrp ??
    0;
  let price = parsePrice(base);
  if ((!price || price === 0) && variants[0]) {
    price = parsePrice(variants[0].price ?? variants[0].selling_price);
  }
  return price;
}

/**
 * @param {object} item - raw API product
 * @returns {object} Mimosa product shape
 */
export function normalizeProduct(item) {
  if (!item) return null;
  const id = item.id;
  const name = item.name || item.product_name || "Product";
  const slugBase = slugify(name) || "product";
  const slug = `${slugBase}-${id}`;
  const images = collectImages(item);
  const descriptionHtml = item.description || item.product_description || "";
  const descriptionEn = stripHtml(descriptionHtml);
  const catName =
    item.category_name ||
    item.categories?.name ||
    item.category?.name ||
    "";
  const catSlug = slugify(catName) || "shop";
  const categoryId = item.category_id || item.category?.id || null;
  const weight =
    specValue(item.specifications, ["weight", "net wt", "size", "volume"]) ||
    item.weight ||
    "";
  const ingredients =
    specValue(item.specifications, ["ingredient"]) || "";
  const applicationRaw = specValue(item.specifications, [
    "how to use",
    "application",
    "usage",
  ]);
  const results = specValue(item.specifications, ["result", "benefit"]);
  const warnings = specValue(item.specifications, ["warning", "caution"]);

  const inStock =
    item.current_stock == null
      ? true
      : Number(item.current_stock) > 0;

  return {
    id: String(id),
    apiId: id,
    slug,
    name,
    shortName: name.replace(/^Mimosa\s+/i, "").slice(0, 48) || name,
    category: [catSlug],
    categoryId,
    categoryName: catName,
    price: productPrice(item),
    weight: weight || "",
    tagline: descriptionEn.slice(0, 90) || catName || "Handmade organic care",
    inStock,
    images: images.length ? images : ["/images/brand/logo-beyoutiful.jpg"],
    descriptionEn: descriptionEn || name,
    descriptionHtml,
    descriptionBn: "",
    ingredients,
    ingredientsBn: "",
    application: applicationRaw ? [applicationRaw] : [],
    applicationBn: [],
    results: results || "",
    warnings: warnings || "",
    source: "api",
  };
}

export function normalizeCategory(item) {
  if (!item) return null;
  const name = item.name || item.category_name || "Category";
  const id = item.id;
  return {
    id: String(id),
    apiId: id,
    slug: slugify(name) || `category-${id}`,
    name,
    description: stripHtml(item.description || "") || `Shop ${name}`,
    image: item.image || item.image_path || null,
    source: "api",
  };
}

export function normalizeBlog(item) {
  if (!item) return null;
  const body = item.description || item.content || item.body || "";
  return {
    id: item.id,
    title: item.title || "Untitled",
    image: item.image || item.image_path || null,
    excerpt: stripHtml(body).slice(0, 140),
    bodyHtml: body,
    status: item.status,
    createdAt: item.created_at || item.createdAt || item.date || null,
    source: "api",
  };
}

/** Extract product array from various API envelope shapes */
export function extractProductList(response) {
  if (!response) return [];
  if (Array.isArray(response.data?.data)) return response.data.data;
  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.products?.data)) return response.products.data;
  if (Array.isArray(response.products)) return response.products;
  return [];
}

export function extractCategoryList(response) {
  if (!response) return [];
  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.categories)) return response.categories;
  if (Array.isArray(response.data?.categories)) return response.data.categories;
  return [];
}

export function extractBlogList(response) {
  if (!response) return [];
  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.blogs)) return response.blogs;
  return [];
}

export function extractSingleProduct(response) {
  if (!response) return null;
  if (response.data && !Array.isArray(response.data) && response.data.id) {
    return response.data;
  }
  if (response.product?.id) return response.product;
  if (response.id && response.name) return response;
  if (Array.isArray(response.data) && response.data[0]) return response.data[0];
  return null;
}
