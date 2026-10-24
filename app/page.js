import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

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

export default function Home() {
  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden bg-forest-deep">
        <Image
          src="/images/brand/lineup-green.jpg"
          alt="Mimosa organic product lineup"
          fill
          priority
          className="object-cover object-center opacity-90"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/90 via-forest-deep/55 to-transparent" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
          <p className="animate-fade-up text-xs font-medium tracking-[0.35em] text-gold uppercase">
            Handmade · Made in Bangladesh
          </p>
          <h1 className="animate-fade-up animate-delay-1 font-script mt-3 text-7xl text-cream sm:text-8xl md:text-9xl">
            Mimosa
          </h1>
          <p className="animate-fade-up animate-delay-2 mt-3 max-w-md font-serif text-xl text-cream/90 sm:text-2xl">
            Reveal Your True Beauty
          </p>
          <p className="animate-fade-up animate-delay-2 mt-3 max-w-sm text-sm leading-relaxed text-cream/70">
            Organic formulations preserved the right way — for skin and hair
            that glow with earth-grown care.
          </p>
          <div className="animate-fade-up animate-delay-2 mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-cream px-7 py-3 text-sm font-semibold tracking-wide text-forest-deep transition hover:bg-sage"
            >
              Shop the collection
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-cream/40 px-7 py-3 text-sm font-medium tracking-wide text-cream transition hover:border-cream hover:bg-cream/10"
            >
              Our story
            </Link>
          </div>
        </div>
      </section>

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
            className="text-sm font-medium text-forest underline-offset-4 hover:underline"
          >
            View all products
          </Link>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-sage">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
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
              <div key={item.title}>
                <h3 className="font-serif text-xl text-forest">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
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
          <div className="relative aspect-[4/5] overflow-hidden bg-sage-deep">
            <Image
              src="/images/brand/lineup-orange.jpg"
              alt="Mimosa products on warm backdrop"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-deep text-cream">
        <div className="absolute inset-0 opacity-30">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/brand/lineup-green.jpg"
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
            href="/about"
            className="mt-8 inline-block rounded-full border border-cream/40 px-7 py-3 text-sm font-medium transition hover:bg-cream/10"
          >
            Learn about Mimosa
          </Link>
        </div>
      </section>
    </>
  );
}
