import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About",
  description:
    "Mimosa Organic Solution — organic formulations preserved correctly for skin and hair.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative min-h-[50vh] overflow-hidden bg-forest-deep">
        <Image
          src="/Images/brand/logo-beyoutiful.jpg"
          alt="Mimosa BEYOUTIFUL brand mark"
          fill
          className="object-cover opacity-80"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-forest-deep/50" />
        <div className="relative mx-auto flex min-h-[50vh] max-w-6xl flex-col justify-end px-4 pb-12 sm:px-6">
          <p className="text-xs tracking-[0.25em] text-gold uppercase">About us</p>
          <h1 className="font-script mt-2 text-6xl text-cream sm:text-7xl">
            Mimosa
          </h1>
          <p className="mt-2 max-w-lg font-serif text-xl text-cream/90">
            Organic care that keeps actives alive
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-lg leading-relaxed text-ink/90">
          Mimosa is an organic product line different from many cosmetics and
          pharmaceuticals on the market. Our formulations are produced with an
          exact process so active ingredients are preserved correctly — which is
          essential for your skin.
        </p>
        <p className="mt-6 leading-relaxed text-muted">
          When active ingredients are wasted or damaged in processing, products
          become less effective. Mimosa protects what matters so your skin and
          hair can benefit from every botanical drop.
        </p>
      </section>

      <section className="bg-sage">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-serif text-3xl text-forest-deep">
            Magical ingredients
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-serif text-xl text-forest">Antioxidants</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Antioxidants such as vitamins A, C, and E fight free radicals and
                slow oxidation — helping prevent early ageing.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-forest">Hydroxyl acid</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                X Hydro Acid, B Hydroxyl Acid, and Poly Bionic Acid support
                accurate exfoliation, remove dead cells, and help protect new
                cells from ageing too soon.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-forest">Astringents</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Astringent components support natural constriction and
                relaxation, helping blood circulate through vessels on the face
                and scalp.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-serif text-3xl text-forest-deep">
              Results of Mimosa products
            </h2>
            <ul className="mt-6 space-y-2 text-sm text-ink/85">
              {[
                "Prevents early ageing",
                "Helps in exfoliation",
                "Enhances better blood circulation",
                "Removes dead cells",
                "Protects new cells from UV rays",
                "Removes extra oil from skin",
                "Removes dryness of the skin",
                "Helps remove tanning",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-gold">—</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-muted">
              Mimosa products are created with earth-grown ingredients, not in
              the laboratory. They are fully organic and therefore cause no
              harm.
            </p>
            <p className="font-script mt-6 text-4xl text-forest">
              Reveal Your True Beauty
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="inline-block rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream hover:bg-forest-deep"
              >
                Shop products
              </Link>
              <Link
                href="/press"
                className="text-sm font-medium text-forest underline-offset-4 hover:underline"
              >
                See press coverage
              </Link>
            </div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden bg-sage">
            <Image
              src="/Images/lifestyle/press-bangladesh-pratidin.jpg"
              alt="Mimosa featured in Bangladesh Pratidin"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
