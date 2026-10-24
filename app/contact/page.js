import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description: "Contact Mimosa Organic Solution in Banani, Dhaka.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs tracking-[0.2em] text-gold uppercase">Contact</p>
      <h1 className="font-serif mt-2 text-4xl text-forest-deep sm:text-5xl">
        We&apos;re here to help
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Reach Mimosa Organic Solution for orders, product questions, or a visit
        to our Banani studio address.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-xl text-forest">Phone</h2>
            <a
              href={`tel:${site.phone}`}
              className="mt-2 block text-lg text-ink hover:text-forest"
            >
              {site.phoneDisplay}
            </a>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-medium text-forest underline-offset-4 hover:underline"
            >
              Message on WhatsApp
            </a>
          </div>
          <div>
            <h2 className="font-serif text-xl text-forest">Email</h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 block text-lg text-ink hover:text-forest"
            >
              {site.email}
            </a>
          </div>
          <div>
            <h2 className="font-serif text-xl text-forest">Address</h2>
            <address className="mt-2 space-y-1 text-ink/85 not-italic">
              <p>{site.address.line1}</p>
              <p>{site.address.line2}</p>
              <p>{site.address.line3}</p>
              <p>
                {site.address.line4}, {site.address.country}
              </p>
            </address>
          </div>
          <div>
            <h2 className="font-serif text-xl text-forest">Social</h2>
            <div className="mt-2 flex gap-4 text-sm">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest underline-offset-4 hover:underline"
              >
                Facebook
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest underline-offset-4 hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="bg-sage p-8 sm:p-10">
          <h2 className="font-serif text-2xl text-forest-deep">
            Prefer to order now?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Browse the shop, add products to your cart, and complete checkout
            with Cash on Delivery. We&apos;ll confirm your order over WhatsApp.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream hover:bg-forest-deep"
          >
            Go to shop
          </Link>
          <p className="mt-8 text-xs text-muted">
            Trade licence: {site.tradeLicence}
          </p>
        </div>
      </div>
    </div>
  );
}
