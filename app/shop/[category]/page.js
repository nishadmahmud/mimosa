import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import {
  getCatalogCategories,
  getCatalogCategory,
  getCatalogProductsByCategory,
} from "@/lib/catalog";
import { categories as staticCategories } from "@/lib/products";

export async function generateStaticParams() {
  return staticCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }) {
  const { category: slug } = await params;
  const category = await getCatalogCategory(slug);
  if (!category) return { title: "Category" };
  return {
    title: category.name,
    description: category.description,
  };
}

function CategoryFallback() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="h-3 w-16 animate-pulse rounded bg-sage-deep/50" />
      <div className="mt-3 h-10 w-48 animate-pulse rounded bg-sage-deep/60" />
      <div className="mt-3 h-4 w-72 max-w-full animate-pulse rounded bg-sage-deep/40" />
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-[4/5] animate-pulse bg-sage" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-sage-deep/50" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-sage-deep/40" />
          </div>
        ))}
      </div>
    </div>
  );
}

async function CategoryContent({ params }) {
  const { category: slug } = await params;
  const [category, categories, items] = await Promise.all([
    getCatalogCategory(slug),
    getCatalogCategories(),
    getCatalogProductsByCategory(slug),
  ]);
  if (!category) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="text-xs tracking-[0.2em] text-gold uppercase">Shop</p>
      <h1 className="font-serif mt-2 text-4xl text-forest-deep sm:text-5xl">
        {category.name}
      </h1>
      <p className="mt-3 max-w-xl text-muted">{category.description}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/shop"
          className="rounded-full border border-forest/20 px-4 py-1.5 text-xs font-medium tracking-wide text-forest transition hover:bg-sage"
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/shop/${cat.slug}`}
            className={
              cat.slug === slug
                ? "rounded-full bg-forest px-4 py-1.5 text-xs font-medium tracking-wide text-cream"
                : "rounded-full border border-forest/20 px-4 py-1.5 text-xs font-medium tracking-wide text-forest transition hover:bg-sage"
            }
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="mt-12 text-muted">No products in this category yet.</p>
      ) : (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryPage({ params }) {
  return (
    <Suspense fallback={<CategoryFallback />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}
