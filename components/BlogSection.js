import Link from "next/link";
import SafeImage from "./SafeImage";

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogSection({ blogs, heading = true }) {
  if (!blogs?.length) return null;

  return (
    <section className="border-t border-forest/10 bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        {heading && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs tracking-[0.2em] text-gold uppercase">
                Journal
              </p>
              <h2 className="font-serif mt-2 text-3xl text-forest-deep sm:text-4xl">
                From the Mimosa blog
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted">
                Tips, stories, and organic beauty notes.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-sm font-medium text-forest underline-offset-4 transition hover:underline"
            >
              View all posts
            </Link>
          </div>
        )}

        <div
          className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-4 ${heading ? "mt-10" : ""}`}
        >
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-sage">
                {blog.image ? (
                  <SafeImage
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-script text-3xl text-forest/40">
                    Mimosa
                  </div>
                )}
              </div>
              <p className="mt-3 text-[10px] tracking-[0.18em] text-gold uppercase">
                {formatDate(blog.createdAt) || "Mimosa"}
              </p>
              <h3 className="font-serif mt-1 text-xl text-forest-deep transition group-hover:text-forest">
                {blog.title}
              </h3>
              {blog.excerpt && (
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {blog.excerpt}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
