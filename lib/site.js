export const site = {
  name: "Mimosa Organic Solution",
  slogan: "BEYOUTIFUL",
  tagline: "Reveal Your True Beauty",
  phone: "01323886655",
  phoneDisplay: "+880 1323-886655",
  whatsapp: "8801323886655",
  email: "mimosabd1@gmail.com",
  tradeLicence: "TRAD/DNCC/084565/2022",
  address: {
    line1: "Flat 10-20 (10th Floor)",
    line2: "Priyo Prangan Tower",
    line3: "19 Kemal Atatürk Avenue",
    line4: "Banani C/A, Dhaka 1213",
    country: "Bangladesh",
  },
  social: {
    facebook: "https://www.facebook.com/share/1878R931XK/",
    linkedin:
      "https://www.linkedin.com/in/mimosa-organic-solution-717941178",
  },
};

export function formatPrice(amount) {
  return `৳${amount.toLocaleString("en-BD")}`;
}

export function buildWhatsAppOrderUrl({ name, phone, address, city, notes, items, total }) {
  const lines = [
    "New Mimosa Order (Cash on Delivery)",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Address: ${address}`,
    `City: ${city}`,
    notes ? `Notes: ${notes}` : null,
    "",
    "Items:",
    ...items.map(
      (item) =>
        `• ${item.name} × ${item.quantity} — ৳${item.price * item.quantity}`,
    ),
    "",
    `Total: ৳${total}`,
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}
