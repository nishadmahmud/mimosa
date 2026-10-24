"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/site";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, ready } = useCart();

  if (!ready) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center text-muted sm:px-6">
        Loading cart…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-serif text-3xl text-forest-deep">Your cart is empty</h1>
        <p className="mt-3 text-muted">
          Discover handmade organic care and add something you love.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream hover:bg-forest-deep"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-4xl text-forest-deep">Cart</h1>
      <ul className="mt-10 divide-y divide-forest/10">
        {items.map((item) => (
          <li key={item.id} className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-sage">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div className="flex-1">
              <Link
                href={`/products/${item.slug}`}
                className="font-serif text-lg text-forest-deep hover:text-forest"
              >
                {item.name}
              </Link>
              <p className="text-xs text-muted">{item.weight}</p>
              <p className="mt-1 text-sm font-medium">
                {formatPrice(item.price)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-forest/20">
                <button
                  type="button"
                  className="px-3 py-1.5"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <button
                  type="button"
                  className="px-3 py-1.5"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <p className="w-20 text-right text-sm font-semibold">
                {formatPrice(item.price * item.quantity)}
              </p>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-xs text-maroon underline-offset-2 hover:underline"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col items-end gap-4 border-t border-forest/10 pt-8">
        <p className="text-lg">
          Subtotal{" "}
          <span className="font-semibold">{formatPrice(subtotal)}</span>
        </p>
        <p className="text-xs text-muted">
          Cash on Delivery · Delivery fees confirmed on WhatsApp
        </p>
        <Link
          href="/checkout"
          className="rounded-full bg-forest px-8 py-3 text-sm font-medium text-cream hover:bg-forest-deep"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
