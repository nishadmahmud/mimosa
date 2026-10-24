"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { buildWhatsAppOrderUrl, formatPrice } from "@/lib/site";

export default function CheckoutPage() {
  const { items, subtotal, clearCart, ready } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Dhaka",
    notes: "",
  });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("Please fill in name, phone, and address.");
      return;
    }
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const url = buildWhatsAppOrderUrl({
      ...form,
      items,
      total: subtotal,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    clearCart();
    setDone(true);
  }

  if (!ready) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center text-muted">
        Loading…
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-serif text-3xl text-forest-deep">
          Order sent via WhatsApp
        </h1>
        <p className="mt-4 text-muted">
          We opened WhatsApp with your order details. If it didn&apos;t open,
          message us at{" "}
          <a href="https://wa.me/8801323886655" className="text-forest underline">
            01323886655
          </a>
          . We&apos;ll confirm Cash on Delivery shortly.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-serif text-3xl text-forest-deep">Nothing to checkout</h1>
        <button
          type="button"
          onClick={() => router.push("/shop")}
          className="mt-6 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream"
        >
          Browse products
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-4xl text-forest-deep">Checkout</h1>
      <p className="mt-2 text-sm text-muted">
        Cash on Delivery — we confirm your order on WhatsApp.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { id: "name", label: "Full name", type: "text", required: true },
            { id: "phone", label: "Phone", type: "tel", required: true },
            { id: "address", label: "Delivery address", type: "text", required: true },
            { id: "city", label: "City", type: "text", required: true },
          ].map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-ink"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                required={field.required}
                value={form[field.id]}
                onChange={(e) => update(field.id, e.target.value)}
                className="mt-1.5 w-full border border-forest/20 bg-cream px-3 py-2.5 text-sm outline-none focus:border-forest"
              />
            </div>
          ))}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-ink">
              Order notes (optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              className="mt-1.5 w-full border border-forest/20 bg-cream px-3 py-2.5 text-sm outline-none focus:border-forest"
            />
          </div>
          {error && <p className="text-sm text-maroon">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-forest py-3.5 text-sm font-semibold text-cream transition hover:bg-forest-deep sm:w-auto sm:px-10"
          >
            Place order on WhatsApp
          </button>
        </form>

        <aside className="bg-sage p-6 sm:p-8">
          <h2 className="font-serif text-xl text-forest-deep">Order summary</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between gap-4">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex justify-between border-t border-forest/15 pt-4 text-base font-semibold">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </p>
          <p className="mt-3 text-xs text-muted">
            Delivery charges are confirmed when we reply on WhatsApp.
          </p>
        </aside>
      </div>
    </div>
  );
}
