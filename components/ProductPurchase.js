"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import AddToCartButton from "./AddToCartButton";

export default function ProductPurchase({ product }) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-3">
        <label htmlFor="qty" className="text-sm text-muted">
          Quantity
        </label>
        <div className="flex items-center border border-forest/20">
          <button
            type="button"
            aria-label="Decrease quantity"
            className="px-3 py-2 text-forest"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <input
            id="qty"
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className="w-12 border-x border-forest/20 bg-transparent py-2 text-center text-sm outline-none"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            className="px-3 py-2 text-forest"
            onClick={() => setQty((q) => q + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <AddToCartButton product={product} quantity={qty} />
        <Link
          href="/checkout"
          onClick={() => addItem(product, qty)}
          className="inline-flex items-center justify-center rounded-full border border-forest px-6 py-3 text-sm font-medium text-forest transition hover:bg-sage"
        >
          Buy now
        </Link>
      </div>
    </div>
  );
}
