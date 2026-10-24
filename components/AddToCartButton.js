"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCartButton({
  product,
  quantity = 1,
  compact = false,
  className = "",
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ||
        (compact
          ? "rounded-full bg-forest px-3 py-1.5 text-xs font-medium tracking-wide text-cream transition hover:bg-forest-deep"
          : "w-full rounded-full bg-forest px-6 py-3 text-sm font-medium tracking-wide text-cream transition hover:bg-forest-deep sm:w-auto")
      }
    >
      {added ? "Added" : compact ? "Add" : "Add to cart"}
    </button>
  );
}
