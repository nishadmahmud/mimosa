import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BlogSection from "@/components/BlogSection";
import SafeImage from "@/components/SafeImage";
import { getCatalogBlog, getCatalogBlogs } from "@/lib/catalog";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await getCatalogBlog(id);
  if (!blog) return { title: "Blog" };
  return {
    title: blog.title,
    description: blog.excerpt,
  };
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function BlogDetail({ params }) {
  const { id } = await params;
  const blog = await getCatalogBlog(id);
  if (!blog) notFound();

  const all = await getCatalogBlogs();
  const related = all.filter((b) => String(b.id) !== String(id)).slice(0, 3);

  return (
    <article>
      {blog.image && (
        <div className="relative h-56 w-full bg-sage sm:h-80 md:h-96">
          <SafeImage
            src={blog.image}
            alt={blog.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-forest-deep/25" />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <nav className="mb-6 text-xs text-muted">
          <Link href="/blog" className="hover:text-forest">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink line-clamp-1">{blog.title}</span>
        </nav>

        <p className="text-xs tracking-[0.2em] text-gold uppercase">
          {formatDate(blog.createdAt) || "Mimosa Journal"}
        </p>
        <h1 className="font-serif mt-2 text-3xl text-forest-deep sm:text-5xl">
          {blog.title}
        </h1>

        <div
          className="prose-legal mt-10 text-ink/90 [&_img]:my-6 [&_img]:max-w-full [&_a]:text-forest [&_p]:mb-4 [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-forest-deep"
          dangerouslySetInnerHTML={{ __html: blog.bodyHtml || "" }}
        />

        <Link
          href="/blog"
          className="mt-12 inline-block text-sm font-medium text-forest underline-offset-4 hover:underline"
        >
          ← Back to blog
        </Link>
      </div>

      {related.length > 0 && <BlogSection blogs={related} />}
    </article>
  );
}

export default function BlogDetailPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-20 text-center text-muted">
          Loading…
        </div>
      }
    >
      <BlogDetail params={params} />
    </Suspense>
  );
}
