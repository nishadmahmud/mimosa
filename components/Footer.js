import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-forest/10 bg-forest-deep text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-script text-4xl">Mimosa</p>
          <p className="mt-1 text-xs tracking-[0.25em] text-gold uppercase">
            {site.slogan}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/75">
            Handmade organic care, crafted in Bangladesh. Earth-grown
            ingredients for skin and hair that feels alive.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-lg text-cream">Visit</h3>
          <address className="mt-3 space-y-1 text-sm leading-relaxed text-cream/75 not-italic">
            <p>{site.address.line1}</p>
            <p>{site.address.line2}</p>
            <p>{site.address.line3}</p>
            <p>
              {site.address.line4}, {site.address.country}
            </p>
          </address>
          <p className="mt-4 text-sm">
            <a
              href={`tel:${site.phone}`}
              className="text-cream underline-offset-4 hover:underline"
            >
              {site.phoneDisplay}
            </a>
          </p>
          <p className="mt-1 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="text-cream underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
          </p>
        </div>

        <div>
          <h3 className="font-serif text-lg text-cream">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            <li>
              <Link href="/shop" className="hover:text-cream">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-cream">
                About
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-cream">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/press" className="hover:text-cream">
                Press
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-cream">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-cream">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-cream">
                Privacy Policy
              </Link>
            </li>
          </ul>
          <div className="mt-6 flex gap-4 text-sm">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-cream"
            >
              Facebook
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-cream"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50">
        © 2026 Mimosa Organic Solution. Handmade in Bangladesh.
      </div>
    </footer>
  );
}
