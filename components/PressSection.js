import Image from "next/image";
import Link from "next/link";
import {
  getDailyStarArticles,
  getHomepagePratidinStrip,
  getPratidinColumns,
} from "@/lib/press";

export default function PressSection() {
  const dailyStar = getDailyStarArticles()[0];
  const pratidinStrip = getHomepagePratidinStrip(6);
  const pratidinTotal = getPratidinColumns().length;

  return (
    <section className="border-y border-forest/10 bg-sage/60">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden bg-cream">
            <Image
              src="/Images/lifestyle/press-bangladesh-pratidin.jpg"
              alt="Mimosa featured in Bangladesh Pratidin Friday column"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] text-gold uppercase">
              In the press
            </p>
            <h2 className="font-serif mt-2 text-3xl text-forest-deep sm:text-4xl">
              Trusted beauty advice
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Mimosa Organic Solution has been featured in Bangladesh Pratidin
              with expert guidance from beauty specialist Monira Rahman, and
              named in The Daily Star&apos;s Go Deshi — natural ingredients,
              real routines, local trust.
            </p>

            {dailyStar && (
              <a
                href={dailyStar.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block border-t border-forest/15 pt-6 transition hover:border-forest/30"
              >
                <p className="text-[11px] tracking-[0.18em] text-maroon uppercase">
                  The Daily Star
                </p>
                <h3 className="font-serif mt-2 text-2xl text-forest-deep">
                  {dailyStar.title}
                </h3>
                <p className="mt-1 text-xs text-muted">{dailyStar.dateLabel}</p>
                {dailyStar.quote && (
                  <p className="font-serif mt-4 text-base leading-snug text-forest italic">
                    &ldquo;{dailyStar.quote}&rdquo;
                  </p>
                )}
                <span className="mt-4 inline-block text-sm font-medium text-forest underline-offset-4 hover:underline">
                  Read article
                </span>
              </a>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-forest/10 pt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs tracking-[0.2em] text-maroon uppercase">
                Bangladesh Pratidin
              </p>
              <h3 className="font-serif mt-1 text-xl text-forest-deep sm:text-2xl">
                Friday columns
              </h3>
            </div>
            <Link
              href="/press"
              className="text-sm font-medium text-forest underline-offset-4 hover:underline"
            >
              View all {pratidinTotal} columns
            </Link>
          </div>

          <div className="-mx-4 mt-6 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-6">
            {pratidinStrip.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[9.5rem] shrink-0 border-b border-forest/20 pb-3 transition hover:border-gold sm:min-w-0"
              >
                <p className="text-xs font-medium text-forest-deep">
                  {article.dateLabel}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-muted">
                  Bangladesh Pratidin Friday
                </p>
                <span className="mt-2 inline-block text-[11px] font-medium text-forest">
                  Read →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
