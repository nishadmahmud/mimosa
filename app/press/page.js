import Image from "next/image";
import Link from "next/link";
import {
  getDailyStarArticles,
  getPratidinColumns,
  pressArticles,
} from "@/lib/press";

export const metadata = {
  title: "Press",
  description:
    "Mimosa Organic Solution in the press — Bangladesh Pratidin Friday columns and The Daily Star Go Deshi.",
};

function PressRow({ article }) {
  return (
    <li className="flex flex-col gap-2 border-b border-forest/10 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
      <div className="min-w-0">
        <p className="text-xs tracking-[0.15em] text-muted uppercase">
          {article.dateLabel}
          {article.series ? ` · ${article.series}` : ""}
        </p>
        <h3 className="font-serif mt-1 text-lg text-forest-deep sm:text-xl">
          {article.title}
        </h3>
        {article.note && (
          <p className="mt-1 text-sm text-muted">{article.note}</p>
        )}
        {article.quote && (
          <p className="font-serif mt-3 max-w-2xl text-sm leading-relaxed text-forest italic">
            &ldquo;{article.quote}&rdquo;
          </p>
        )}
      </div>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 text-sm font-medium text-forest underline-offset-4 hover:underline"
      >
        Read article
      </a>
    </li>
  );
}

export default function PressPage() {
  const pratidin = getPratidinColumns();
  const dailyStar = getDailyStarArticles();
  const scan = pressArticles.find((a) => a.image);

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
        <p className="text-xs tracking-[0.2em] text-gold uppercase">Archive</p>
        <h1 className="font-serif mt-2 text-4xl text-forest-deep sm:text-5xl">
          Press
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Coverage of Mimosa Organic Solution — weekly beauty columns and
          national lifestyle features. Articles open on the publisher&apos;s
          site.
        </p>
      </div>

      {scan?.image && (
        <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden bg-sage">
              <Image
                src={scan.image}
                alt="Bangladesh Pratidin Friday scan featuring Mimosa"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] text-maroon uppercase">
                Featured scan
              </p>
              <h2 className="font-serif mt-2 text-2xl text-forest-deep sm:text-3xl">
                {scan.dateLabel}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Bangladesh Pratidin Friday beauty column with Monira Rahman,
                Mimosa Organic Solution.
              </p>
              <a
                href={scan.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-sm font-medium text-forest underline-offset-4 hover:underline"
              >
                Open original article
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <section>
          <h2 className="font-serif text-2xl text-forest-deep sm:text-3xl">
            The Daily Star
          </h2>
          <ul className="mt-2">
            {dailyStar.map((article) => (
              <PressRow key={article.id} article={article} />
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="font-serif text-2xl text-forest-deep sm:text-3xl">
            Bangladesh Pratidin
          </h2>
          <p className="mt-2 text-sm text-muted">
            Friday columns, June–November 2018
          </p>
          <ul className="mt-2">
            {pratidin.map((article) => (
              <PressRow key={article.id} article={article} />
            ))}
          </ul>
        </section>

        <div className="mt-16 border-t border-forest/10 pt-10 text-center">
          <p className="text-sm text-muted">
            Looking for products mentioned in these features?
          </p>
          <Link
            href="/shop"
            className="mt-4 inline-block rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream hover:bg-forest-deep"
          >
            Shop Mimosa
          </Link>
        </div>
      </div>
    </div>
  );
}
