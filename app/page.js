import Image from "next/image";
import Link from "next/link";
import BlogSection from "@/components/BlogSection";
import ProductCard from "@/components/ProductCard";
import VideoPanel from "@/components/VideoPanel";
import {
  getCatalogBlogs,
  getCatalogCategories,
  getCatalogProducts,
} from "@/lib/catalog";
import { formatPrice, site } from "@/lib/site";

const results = [
  "Prevents early ageing",
  "Helps in exfoliation",
  "Enhances blood circulation",
  "Removes dead cells",
  "Protects new cells from UV rays",
  "Balances excess oil",
  "Eases dryness",
  "Helps reduce tanning",
];

const rituals = [
  {
    step: "01",
    title: "Cleanse",
    text: "Massage Mimosa Skin Cleanser onto wet skin in the shower, or use as a weekly mask.",
    href: "/products/skin-cleanser",
  },
  {
    step: "02",
    title: "Nourish",
    text: "Apply Face & Body Butter or Hand & Feet Care twice daily on damp skin.",
    href: "/products/face-body-butter",
  },
  {
    step: "03",
    title: "Restore",
    text: "Massage Hair Solution into the scalp overnight; seal lips with Lip Balm as needed.",
    href: "/products/hair-solution",
  },
];

const categoryVisuals = {
  "face-care": "/images/lifestyle/skin-cleanser-flyer.jpg",
  "body-care": "/images/lifestyle/hand-feet-flyer.jpg",
  "hair-care": "/images/lifestyle/hair-solution-flyer.jpg",
  "lip-care": "/images/products/lip-balm.jpg",
};

const fallbackCategoryImages = [
  "/images/lifestyle/skin-cleanser-flyer.jpg",
  "/images/lifestyle/hand-feet-flyer.jpg",
  "/images/lifestyle/hair-solution-flyer.jpg",
  "/images/products/lip-balm.jpg",
  "/images/brand/lineup-green.jpg",
];

export default async function Home() {
  const [products, categories, blogs] = await Promise.all([
    getCatalogProducts(),
    getCatalogCategories(),
    getCatalogBlogs(),
  ]);

  const featured =
    products.find((p) => /hair/i.test(p.slug) || /hair/i.test(p.name)) ||
    products[0];

  const homeBlogs = blogs.slice(0, 4);

  return (
    <>
      {/* Hero — brand first, one composition */}
      <section className="relative min-h-[88vh] overflow-hidden bg-forest-deep">
        <div className="absolute inset-0">
          <video
            className="animate-soft-zoom h-full w-full object-cover opacity-80"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/brand/lineup-green.jpg"
            preload="metadata"
          >
            <source src="/videos/product-1.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/92 via-forest-deep/60 to-forest-deep/25" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
          <p className="animate-fade-up text-[10px] font-medium tracking-[0.28em] text-gold uppercase sm:text-xs sm:tracking-[0.35em]">
            Handmade · Made in Bangladesh
          </p>
          <h1 className="animate-fade-up animate-delay-1 font-script mt-2 text-6xl leading-none text-cream sm:mt-3 sm:text-8xl md:text-9xl">
            Mimosa
          </h1>
          <p className="animate-fade-up animate-delay-2 mt-3 max-w-md font-serif text-xl text-cream/90 sm:text-2xl">
            Reveal Your True Beauty
          </p>
          <p className="animate-fade-up animate-delay-2 mt-3 max-w-sm text-sm leading-relaxed text-cream/70">
            Organic formulations preserved the right way — for skin and hair
            that glow with earth-grown care.
          </p>
          <div className="animate-fade-up animate-delay-3 mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap">
            <Link
              href="/shop"
              className="rounded-full bg-cream px-7 py-3.5 text-center text-sm font-semibold tracking-wide text-forest-deep transition duration-300 hover:scale-[1.02] hover:bg-sage active:scale-[0.98] sm:py-3"
            >
              Shop the collection
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-cream/40 px-7 py-3.5 text-center text-sm font-medium tracking-wide text-cream transition duration-300 hover:scale-[1.02] hover:border-cream hover:bg-cream/10 active:scale-[0.98] sm:py-3"
            >
              Our story
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by category */}
      <section className="border-b border-forest/10 bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs tracking-[0.2em] text-gold uppercase">Explore</p>
          <h2 className="font-serif mt-2 text-3xl text-forest-deep sm:text-4xl">
            Shop by ritual
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 4).map((cat, index) => (
              <Link
                key={cat.slug}
                href={`/shop/${cat.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-sage"
              >
                <Image
                  src={
                    cat.image ||
                    categoryVisuals[cat.slug] ||
                    fallbackCategoryImages[index % fallbackCategoryImages.length]
                  }
                  alt={cat.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.05]"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-serif text-xl text-cream">{cat.name}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-cream/70">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collection */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs tracking-[0.2em] text-gold uppercase">
              The collection
            </p>
            <h2 className="font-serif mt-2 text-3xl text-forest-deep sm:text-4xl">
              Organic essentials
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-medium text-forest underline-offset-4 transition hover:underline"
          >
            View all products
          </Link>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Video gallery */}
      <section className="bg-forest-deep text-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.2em] text-gold uppercase">
              In motion
            </p>
            <h2 className="font-serif mt-2 text-3xl sm:text-4xl">
              See Mimosa up close
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cream/70">
              Texture, colour, and craft — watch how our handmade organics look
              in real light.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <VideoPanel
              src="/videos/product-2.mp4"
              poster="/images/products/skin-cleanser-green.jpg"
              label="Skin cleanser"
              className="aspect-[3/4] md:col-span-1"
            />
            <VideoPanel
              src="/videos/product-3.mp4"
              poster="/images/brand/lineup-orange.jpg"
              label="The lineup"
              className="aspect-[3/4] md:col-span-1"
            />
            <VideoPanel
              src="/videos/product-4.mp4"
              poster="/images/products/hair-solution-yellow.jpg"
              label="Hair solution"
              className="aspect-[3/4] md:col-span-1"
            />
          </div>
        </div>
      </section>

      {/* Daily ritual */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs tracking-[0.2em] text-gold uppercase">Routine</p>
        <h2 className="font-serif mt-2 max-w-lg text-3xl text-forest-deep sm:text-4xl">
          A simple daily ritual
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Three gentle steps — cleanse, nourish, restore — with products made
          for Bangladesh skin and climate.
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {rituals.map((item) => (
            <Link
              key={item.step}
              href={item.href}
              className="group border-t border-forest/15 pt-6 transition duration-300 hover:border-forest"
            >
              <span className="text-xs tracking-[0.2em] text-gold">
                {item.step}
              </span>
              <h3 className="font-serif mt-3 text-2xl text-forest-deep transition group-hover:text-forest">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.text}
              </p>
              <span className="mt-4 inline-block text-xs font-medium tracking-wide text-forest underline-offset-4 group-hover:underline">
                View product
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured product + video */}
      <section className="bg-sage">
        <div className="mx-auto grid max-w-6xl items-stretch gap-0 lg:grid-cols-2">
          <VideoPanel
            src="/videos/product-2.mp4"
            poster="/images/products/hair-solution-yellow.jpg"
            label="Featured"
            className="min-h-[420px] lg:min-h-full"
          />
          {featured && (
            <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-14">
              <p className="text-xs tracking-[0.2em] text-maroon uppercase">
                Spotlight
              </p>
              <h2 className="font-serif mt-2 text-3xl text-forest-deep sm:text-4xl">
                {featured.name}
              </h2>
              <p className="mt-2 text-sm text-muted">{featured.tagline}</p>
              <p className="mt-6 text-sm leading-relaxed text-ink/85">
                {featured.descriptionEn}
              </p>
              <p className="mt-4 text-xl font-semibold text-ink">
                {formatPrice(featured.price)}
                {featured.weight ? (
                  <span className="ml-2 text-sm font-normal text-muted">
                    · {featured.weight}
                  </span>
                ) : null}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/products/${featured.slug}`}
                  className="rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition duration-300 hover:scale-[1.02] hover:bg-forest-deep active:scale-[0.98]"
                >
                  View details
                </Link>
                <Link
                  href="/shop"
                  className="rounded-full border border-forest/25 px-6 py-3 text-sm font-medium text-forest transition duration-300 hover:bg-cream"
                >
                  Shop all
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Magical ingredients */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs tracking-[0.2em] text-maroon uppercase">
          Magical ingredients
        </p>
        <h2 className="font-serif mt-2 max-w-lg text-3xl text-forest-deep sm:text-4xl">
          Active care, preserved correctly
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Mimosa formulations keep active ingredients intact — unlike many
          cosmetics where processing wastes what your skin needs most.
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {[
            {
              title: "Antioxidants",
              text: "Vitamins A, C, and E help fight free radicals and slow oxidation — supporting skin against early ageing.",
            },
            {
              title: "Hydroxyl acids",
              text: "X Hydro Acid, B Hydroxyl Acid, and Poly Bionic Acid support accurate exfoliation and help protect new cells.",
            },
            {
              title: "Astringents",
              text: "Essential for natural constriction and relaxation — helping blood circulate through facial and scalp vessels.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="border-l border-gold/40 pl-5 transition duration-300 hover:border-forest"
            >
              <h3 className="font-serif text-xl text-forest">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs tracking-[0.2em] text-gold uppercase">
                Results
              </p>
              <h2 className="font-serif mt-2 text-3xl text-forest-deep sm:text-4xl">
                What Mimosa is crafted for
              </h2>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {results.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-ink/85"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="group relative aspect-[4/5] overflow-hidden bg-sage-deep">
              <Image
                src="/images/brand/lineup-orange.jpg"
                alt="Mimosa products on warm backdrop"
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="border-y border-forest/10 bg-sage/60">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden bg-cream">
            <Image
              src="/images/lifestyle/press-bangladesh-pratidin.jpg"
              alt="Mimosa featured in Bangladesh Pratidin"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] text-maroon uppercase">
              In the press
            </p>
            <h2 className="font-serif mt-2 text-3xl text-forest-deep sm:text-4xl">
              Trusted beauty advice
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Mimosa Organic Solution has been featured in Bangladesh Pratidin
              with expert guidance from beauty specialist Monira Rahman —
              natural ingredients, real routines, local trust.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block text-sm font-medium text-forest underline-offset-4 hover:underline"
            >
              Read our story
            </Link>
          </div>
        </div>
      </section>

      {/* Promise / handmade */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Handmade",
              text: "Small-batch organic care, prepared with attention — not mass-lab shortcuts.",
            },
            {
              title: "Earth-grown",
              text: "Botanicals, oils, and vitamins chosen for skin and hair that need real nourishment.",
            },
            {
              title: "Made in Bangladesh",
              text: "From Banani, Dhaka — crafted for our climate, our routines, our glow.",
            },
          ].map((item) => (
            <div key={item.title} className="text-center md:text-left">
              <h3 className="font-script text-4xl text-forest">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Journal / blogs — hidden when API returns none */}
      <BlogSection blogs={homeBlogs} />

      {/* Contact CTA */}
      <section className="bg-maroon text-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-14 sm:px-6 md:flex-row md:items-center">
          <div>
            <p className="font-script text-4xl sm:text-5xl">Order with us</p>
            <p className="mt-2 max-w-md text-sm text-cream/80">
              Cash on Delivery across Bangladesh. Message{" "}
              {site.phoneDisplay} on WhatsApp or shop online.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-cream px-6 py-3 text-sm font-semibold text-maroon transition duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              WhatsApp us
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-cream/40 px-6 py-3 text-sm font-medium transition duration-300 hover:bg-cream/10"
            >
              Contact details
            </Link>
          </div>
        </div>
      </section>

      {/* Closing BEYOUTIFUL + video */}
      <section className="relative overflow-hidden bg-forest-deep text-cream">
        <div className="absolute inset-0 opacity-35">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/brand/lineup-green.jpg"
            preload="metadata"
          >
            <source src="/videos/product-1.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <p className="font-script text-5xl sm:text-6xl">BEYOUTIFUL</p>
          <p className="mt-4 text-sm leading-relaxed text-cream/80 sm:text-base">
            Created with earth-grown ingredients — not in a laboratory. Fully
            organic, handmade in Bangladesh.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block rounded-full border border-cream/40 px-7 py-3 text-sm font-medium transition duration-300 hover:scale-[1.02] hover:bg-cream/10 active:scale-[0.98]"
          >
            Shop Mimosa
          </Link>
        </div>
      </section>
    </>
  );
}
