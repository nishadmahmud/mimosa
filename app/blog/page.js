import BlogSection from "@/components/BlogSection";
import { getCatalogBlogs } from "@/lib/catalog";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "Mimosa Organic Solution journal — tips and stories.",
};

export default async function BlogIndexPage() {
  const blogs = await getCatalogBlogs();

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
        <p className="text-xs tracking-[0.2em] text-gold uppercase">Journal</p>
        <h1 className="font-serif mt-2 text-4xl text-forest-deep sm:text-5xl">
          Blog
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Organic beauty notes from Mimosa.
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <p className="text-muted">
            No blog posts yet. Check back soon — or explore the shop.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream hover:bg-forest-deep"
          >
            Shop products
          </Link>
        </div>
      ) : (
        <BlogSection blogs={blogs} heading={false} />
      )}
    </div>
  );
}
