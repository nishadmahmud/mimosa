import { privacySections } from "@/lib/legal";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Mimosa Organic Solution.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs tracking-[0.2em] text-gold uppercase">Legal</p>
      <h1 className="font-serif mt-2 text-4xl text-forest-deep">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-muted">
        How Mimosa Organic Solution collects, uses, and protects your
        information.
      </p>
      <div className="prose-legal mt-10">
        {privacySections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
