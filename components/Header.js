"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-script text-3xl text-forest transition group-hover:text-forest-deep sm:text-4xl">
            Mimosa
          </span>
          <span className="mt-0.5 text-[10px] font-medium tracking-[0.2em] text-maroon uppercase">
            Organic Solution
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-wide text-ink/80 transition hover:text-forest"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/cart"
            className="relative rounded-full bg-forest px-4 py-2 text-sm font-medium text-cream transition hover:bg-forest-deep"
          >
            Cart
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-maroon px-1 text-[11px] text-cream">
                {count}
              </span>
            )}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/cart"
            className="relative rounded-full border border-forest/20 px-3 py-1.5 text-sm font-medium text-forest"
          >
            Cart
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-maroon px-1 text-[11px] text-cream">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-forest/15 text-forest"
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-0.5 w-full bg-forest transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`h-0.5 w-full bg-forest transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 w-full bg-forest transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-forest/10 bg-cream px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
