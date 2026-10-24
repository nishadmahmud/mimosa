import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/site";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }) {
  return (
    <article className="product-lift group flex flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[4/5] overflow-hidden bg-sage"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-xs tracking-[0.15em] text-gold uppercase transition duration-300 group-hover:tracking-[0.2em]">
          {product.weight}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif mt-1 text-xl text-forest-deep transition duration-300 group-hover:text-forest">
            {product.shortName}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{product.tagline}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="text-base font-semibold text-ink">
            {formatPrice(product.price)}
          </span>
          <AddToCartButton product={product} compact />
        </div>
      </div>
    </article>
  );
}
