"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { site } from "@/lib/site";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function OrganicMark({ className = "h-9 w-9" }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-maroon ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 32 32" className="h-[58%] w-[58%] text-[#E8C96A]" fill="currentColor">
        <path d="M16 4c.5 3.6-1.4 6.5-4.2 8.1 2.5-.4 4.7-1.8 5.8-4 .9 2.7-.2 5.4-2.7 7.2 2.9-.4 5.1-2.5 6-5.1-.2 3.8-2.9 6.9-6.4 8.2V28h-1.4V18.4C10.4 17.1 8 13.8 8 10c0-3.1 2.4-5.4 5.6-5.8 1.1.9 2.2 2 2.4 3.5V4z" />
      </svg>
    </span>
  );
}

function BagIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
      aria-hidden
    >
      <path d="M6.5 9h11l-.7 10.2a1.5 1.5 0 0 1-1.5 1.4H8.7a1.5 1.5 0 0 1-1.5-1.4L6.5 9Z" />
      <path d="M9 9V7.2A3 3 0 0 1 12 4.2 3 3 0 0 1 15 7.2V9" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition duration-300 ${
          scrolled
            ? "border-b border-forest/10 bg-cream/95 shadow-[0_8px_30px_-18px_rgba(15,61,39,0.45)] backdrop-blur-md"
            : "border-b border-transparent bg-cream/80 backdrop-blur-sm"
        }`}
      >
        <div className="h-px bg-gradient-to-r from-maroon via-gold to-forest" />

        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-2 px-4 py-1.5 sm:px-6 md:grid-cols-[1fr_auto_1fr] md:py-2">
          {/* Brand */}
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <OrganicMark className="h-7 w-7 sm:h-8 sm:w-8" />
            <span className="flex min-w-0 flex-col leading-none">
              <span className="font-script text-[1.65rem] leading-none text-forest transition duration-300 group-hover:text-forest-deep sm:text-[1.85rem]">
                Mimosa
              </span>
              <span className="mt-0.5 flex items-center gap-1.5 text-[8px] font-medium tracking-[0.2em] text-maroon uppercase sm:text-[9px] sm:tracking-[0.24em]">
                <span className="hidden h-px w-2.5 bg-gold/80 sm:block" />
                Organic Solution
              </span>
            </span>
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-3 py-1.5 text-[12px] font-medium tracking-[0.12em] text-ink/75 uppercase transition duration-300 hover:text-forest after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center justify-end gap-2.5 md:flex">
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-medium tracking-[0.14em] text-muted uppercase transition duration-300 hover:text-forest"
            >
              WhatsApp
            </a>
            <Link
              href="/cart"
              className="group relative inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-forest px-3 py-1.5 text-cream transition duration-300 hover:scale-[1.02] hover:bg-forest-deep active:scale-[0.98]"
            >
              <BagIcon className="h-3.5 w-3.5" />
              <span className="text-[11px] font-medium tracking-[0.1em] uppercase">
                Cart
              </span>
              {count > 0 && (
                <span className="animate-soft-pop absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-maroon px-1 text-[10px] font-semibold text-cream ring-2 ring-cream">
                  {count}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center justify-end gap-1.5 md:hidden">
            <Link
              href="/cart"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-forest/15 text-forest transition duration-300 hover:bg-sage active:scale-[0.96]"
              aria-label={`Cart${count > 0 ? `, ${count} items` : ""}`}
            >
              <BagIcon className="h-4 w-4" />
              {count > 0 && (
                <span className="animate-soft-pop absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-maroon px-1 text-[9px] font-semibold text-cream">
                  {count}
                </span>
              )}
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-forest/15 text-forest transition duration-300 hover:bg-sage"
            >
              <span className="sr-only">Menu</span>
              <span className="relative flex h-4 w-5 flex-col justify-between">
                <span
                  className={`block h-[1.5px] w-full origin-center bg-forest transition duration-300 ${
                    open ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-forest transition duration-300 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full origin-center bg-forest transition duration-300 ${
                    open ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close menu"
          className={`absolute inset-0 bg-forest-deep/40 transition duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-x-0 top-0 flex max-h-[100dvh] flex-col bg-cream shadow-xl transition duration-300 ease-out ${
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
          style={{ paddingTop: "3.35rem" }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <nav className="flex flex-1 flex-col overflow-y-auto px-5 py-6 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-8">
            <p className="mb-5 text-[10px] font-medium tracking-[0.28em] text-gold uppercase">
              Menu
            </p>
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="animate-menu-in border-b border-forest/10 py-3.5 font-serif text-[1.75rem] leading-tight text-forest-deep transition duration-300 active:text-forest sm:py-4 sm:text-3xl"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="border-b border-forest/10 py-3.5 font-serif text-[1.75rem] leading-tight text-forest-deep transition duration-300 active:text-forest sm:py-4 sm:text-3xl"
            >
              Cart{count > 0 ? ` (${count})` : ""}
            </Link>

            <div className="mt-auto space-y-5 pt-8 sm:pt-10">
              <p className="font-script text-3xl text-forest">BEYOUTIFUL</p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/shop"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-forest py-3.5 text-center text-sm font-medium tracking-wide text-cream transition duration-300 active:scale-[0.98]"
                >
                  Shop the collection
                </Link>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-forest/20 py-3.5 text-center text-sm font-medium text-forest transition duration-300 active:scale-[0.98]"
                >
                  WhatsApp {site.phoneDisplay}
                </a>
              </div>
              <p className="pb-2 text-center text-[11px] tracking-wide text-muted">
                Handmade in Bangladesh
              </p>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
