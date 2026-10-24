import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import {
  categories,
  getCategory,
  getProductsByCategory,
} from "@/lib/products";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category" };
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = getProductsByCategory(slug);

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
