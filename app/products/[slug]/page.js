import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import ProductPurchase from "@/components/ProductPurchase";
import {
  getProduct,
  getRelatedProducts,
  products,
} from "@/lib/products";
import { formatPrice } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.descriptionEn,
  };
}

function ProductFallback() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8 h-3 w-24 animate-pulse rounded bg-sage-deep/60" />
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="aspect-square animate-pulse bg-sage" />
        <div className="space-y-4">
          <div className="h-3 w-32 animate-pulse rounded bg-sage-deep/50" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-sage-deep/60" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-sage-deep/40" />
          <div className="mt-6 h-8 w-28 animate-pulse rounded bg-sage-deep/50" />
          <div className="mt-8 h-12 w-40 animate-pulse rounded-full bg-sage-deep/50" />
          <div className="mt-6 space-y-2">
            <div className="h-3 w-full animate-pulse rounded bg-sage-deep/40" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-sage-deep/40" />
            <div className="h-3 w-4/6 animate-pulse rounded bg-sage-deep/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

async function ProductContent({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <nav className="mb-8 text-xs text-muted">
          <Link href="/shop" className="hover:text-forest">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{product.shortName}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={product.images} name={product.name} />
          <div>
            <p className="text-xs tracking-[0.2em] text-gold uppercase">
              {product.weight} · Handmade
            </p>
            <h1 className="font-serif mt-2 text-3xl text-forest-deep sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 text-muted">{product.tagline}</p>
            <p className="mt-6 text-2xl font-semibold text-ink">
              {formatPrice(product.price)}
            </p>
            <ProductPurchase product={product} />
            <p className="mt-6 text-sm leading-relaxed text-ink/85">
              {product.descriptionEn}
            </p>
            {product.descriptionBn && (
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {product.descriptionBn}
              </p>
            )}
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-forest/10 pt-12 md:grid-cols-2">
          <section>
            <h2 className="font-serif text-2xl text-forest-deep">Ingredients</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {product.ingredients}
            </p>
            {product.ingredientsBn && (
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {product.ingredientsBn}
              </p>
            )}
          </section>
          <section>
            <h2 className="font-serif text-2xl text-forest-deep">How to use</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
              {product.application.map((step) => (
                <li key={step}>• {step}</li>
              ))}
            </ul>
            {product.applicationBn?.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                {product.applicationBn.map((step) => (
                  <li key={step}>• {step}</li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <h2 className="font-serif text-2xl text-forest-deep">Results</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {product.results}
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-forest-deep">Warnings</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {product.warnings}
            </p>
          </section>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-sage">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="font-serif text-2xl text-forest-deep">
              You may also like
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default function ProductPage({ params }) {
  return (
    <Suspense fallback={<ProductFallback />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
