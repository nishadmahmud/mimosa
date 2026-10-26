import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import {
  getCatalogCategories,
  getCatalogProducts,
} from "@/lib/catalog";

export const metadata = {
  title: "Shop",
  description: "Shop Mimosa Organic Solution handmade skincare and haircare.",
};

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getCatalogProducts(),
    getCatalogCategories(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="text-xs tracking-[0.2em] text-gold uppercase">Shop</p>
      <h1 className="font-serif mt-2 text-4xl text-forest-deep sm:text-5xl">
        All products
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        Handmade organic essentials — crafted in Bangladesh.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/shop"
          className="rounded-full bg-forest px-4 py-1.5 text-xs font-medium tracking-wide text-cream"
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/shop/${cat.slug}`}
            className="rounded-full border border-forest/20 px-4 py-1.5 text-xs font-medium tracking-wide text-forest transition hover:border-forest hover:bg-sage"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
