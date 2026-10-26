export const categories = [
  {
    slug: "face-care",
    name: "Face Care",
    description: "Cleansers and butters for a soft, glowing complexion.",
  },
  {
    slug: "body-care",
    name: "Body Care",
    description: "Nourish skin from head to toe with handmade organics.",
  },
  {
    slug: "hair-care",
    name: "Hair Care",
    description: "Support smooth, strong hair with botanical oils.",
  },
  {
    slug: "lip-care",
    name: "Lip Care",
    description: "Soft, protected lips with natural balms.",
  },
];

export const products = [
  {
    id: "skin-cleanser",
    slug: "skin-cleanser",
    name: "Mimosa Skin Cleanser",
    shortName: "Skin Cleanser",
    category: ["face-care", "body-care"],
    price: 1100,
    weight: "140 GM",
    tagline: "Smooth, soft, glowing and shiny skin",
    inStock: true,
    images: [
      "/Images/products/skin-cleanser.jpg",
      "/Images/products/skin-cleanser-green.jpg",
      "/Images/lifestyle/skin-cleanser-flyer.jpg",
    ],
    descriptionEn:
      "Use Mimosa Skin Cleanser for softer skin and a brighter natural glow. Helps free the skin of blackheads and whiteheads while conditioning texture.",
    descriptionBn:
      "Mimosa Skin Cleanser ব্যবহার করে ত্বককে করুন আরও কোমল এবং বৃদ্ধি করুন ত্বকের প্রাকৃতিক উজ্জ্বলতা। আর সেই সাথে ব্ল্যাক হেডস ও হোয়াইট হেডস মুক্ত উজ্জ্বল ত্বক।",
    ingredients:
      "Oats, softening oil, sea salt, bath beads, lemon, orange, mint, basil, mimosa (লজ্জাবতী লতা), and other botanicals.",
    ingredientsBn:
      "Oats, Softening Oil, Sea salt, Bath beads, লেবু, কমলা, পুদিনা, তুলসী, লজ্জাবতী লতা ইত্যাদি।",
    application: [
      "Shower: Use 2/3 of a teaspoon. Massage directly onto wet skin and rinse thoroughly.",
      "Mask: Mix one slice banana (dry skin) or papaya (oily/mixed), 1/4 tsp lemon juice, 1 tsp honey, 1/2 tsp yogurt, and 2/3 tsp Mimosa Skin Cleanser. Apply a thick layer for 10–15 minutes; if dry, wet again, then rinse well. Use once or twice a week.",
    ],
    applicationBn: [
      "গোসলের সময় চা চামচ এর ২/৩ চামচ Mimosa Skin Cleanser ব্যবহার করে ভেজা শরীরে ম্যাসেজ করতে হবে।",
      "প্যাক: এক টুকরো কলা (শুষ্ক ত্বক) বা পেঁপে (Oily/Mixed), ১/৪ চা চামচ লেবুর রস, ১ চা চামচ মধু, ১/২ চা চামচ টক দই এবং ২/৩ চা চামচ cleanser মিশিয়ে পুরু লেয়ার করে ১০ মিনিট রাখুন। শুকিয়ে গেলে ভিজিয়ে ধুয়ে ফেলুন।",
    ],
    results:
      "Soft glossy texture, brighter complexion, helps remove blackheads and whiteheads. All skin types; best for dry skin.",
    warnings:
      "For external use only — not food. Avoid eye contact; rinse with water if contact occurs. If discomfort occurs, discontinue use and consult a skin specialist.",
  },
  {
    id: "face-body-butter",
    slug: "face-body-butter",
    name: "Mimosa Face and Body Butter",
    shortName: "Face & Body Butter",
    category: ["face-care", "body-care"],
    price: 550,
    weight: "30 GM",
    tagline: "Anti-aging, firming moisture with a natural glow",
    inStock: true,
    images: [
      "/Images/products/face-body-butter.jpg",
      "/Images/products/face-body-butter-yellow.jpg",
      "/Images/lifestyle/face-body-butter-flyer.jpg",
    ],
    descriptionEn:
      "Boost skin’s natural radiance with Mimosa Face and Body Butter — formulated for anti-aging, anti-wrinkle, firming, and moisturizing care.",
    descriptionBn:
      "ত্বকের প্রাকৃতিক উজ্জ্বলতা বৃদ্ধি করতে ব্যবহার করুন Mimosa Face and Body Butter, সাথে নিশ্চিত করুন ত্বকের anti-aging, anti-wrinkle, firming এবং moisturizing।",
    ingredients:
      "Cocoa, essential oils, various herb extracts, Vitamin E, A, B6, B12, and other skin-loving botanicals.",
    ingredientsBn:
      "ত্বকের জন্য উপকারী বিভিন্ন ধরনের তেল, ঔষধি গুণসম্পন্ন ভেষজের নির্যাস এবং বিভিন্ন ভিটামিন।",
    application: [
      "Apply onto skin twice a day.",
      "Massage onto damp skin for 3–5 minutes in circular motions. Drink plenty of water for best results.",
    ],
    applicationBn: [
      "উপযুক্ত ফলাফল পেতে প্রতিদিন অন্তত দুইবার Mimosa Face and Body Butter ভিজা ত্বকে ৩–৫ মিনিট ম্যাসাজ করুন এবং পর্যাপ্ত পানি পান করুন।",
    ],
    results:
      "Anti-aging, anti-wrinkle, firming moisturizer — smooth skin with a natural glow. Helps clear away dead skin cells.",
    warnings:
      "Avoid the eye contour. If discomfort occurs, discontinue use and consult a skin specialist.",
  },
  {
    id: "hand-feet-care",
    slug: "hand-feet-care",
    name: "Mimosa Hand and Feet Care",
    shortName: "Hand & Feet Care",
    category: ["body-care"],
    price: 450,
    weight: "30 GM",
    tagline: "Softens, soothes & repairs rough skins",
    inStock: true,
    images: [
      "/Images/products/hand-feet-care.jpg",
      "/Images/lifestyle/hand-feet-flyer.jpg",
    ],
    descriptionEn:
      "Use daily to ease dryness and roughness on hands and feet, and restore smooth skin with a natural glow.",
    descriptionBn:
      "ত্বকের খসখসে ভাব দূর করতে প্রতিদিন ব্যবহার করুন Hand and Feet Care সাথে নিশ্চিত করুন মসৃণ ত্বকের প্রাকৃতিক উজ্জ্বলতা।",
    ingredients:
      "Honey, essential oils, various herb extracts, vitamins, and other nourishing botanicals.",
    ingredientsBn:
      "ত্বকের জন্য উপকারী বিভিন্ন ধরনের তেল, ঔষধি গুণসম্পন্ন ভেষজ, বিভিন্ন ভিটামিন এবং মধু।",
    application: [
      "Wash hands and feet first.",
      "Apply onto skin and massage for 5–6 minutes. Use twice a day or as needed. Drink plenty of water.",
    ],
    applicationBn: [
      "হাত ও পা ধুয়ে নিন। ক্রিমটি ভেজা ত্বকে ৩–৫ মিনিট ম্যাসাজ করুন। প্রতিদিন দুইবার বা প্রয়োজনে ততোধিক ব্যবহার করুন এবং পর্যাপ্ত পানি পান করুন।",
    ],
    results:
      "Patch-less, moisturized, smooth skin with a natural glow.",
    warnings:
      "External use only — not food. Avoid the eye contour area. If discomfort occurs, discontinue use and seek specialist advice.",
  },
  {
    id: "hair-solution",
    slug: "hair-solution",
    name: "Mimosa Hair Solution",
    shortName: "Hair Solution",
    category: ["hair-care"],
    price: 2000,
    weight: "80 ML",
    tagline: "Supports maximised hair regrowth from inside out",
    inStock: true,
    images: [
      "/Images/products/hair-solution.jpg",
      "/Images/products/hair-solution-yellow.jpg",
      "/Images/lifestyle/hair-solution-flyer.jpg",
    ],
    descriptionEn:
      "Support shiny, smooth hair and help reduce hair fall with Mimosa Hair Solution — a protein- and nutrient-rich botanical oil blend.",
    descriptionBn:
      "Mimosa Hair Solution ব্যবহারে নিশ্চিত করুন ঝলমলে মসৃণ চুল এবং চুল পড়া রোধের নিশ্চয়তা।",
    ingredients:
      "Hair-loving oils, hibiscus (জবাফুল), aloe vera, rosemary, lentil sprouts, beta-carotene, protein, copper, zinc, iron, Vitamin E, B6, B12, and Vitamin A.",
    ingredientsBn:
      "চুলের জন্য উপকারী বিভিন্ন ধরনের তেল, জবাফুল, এ্যালোভেরা, রোজমেরী, lentils sprouts, বিটা ক্যারোটিন, প্রোটিন, কপার, জিঙ্ক, আয়রন, ভিটামিন ই, বি৬, বি১২ এবং ভিটামিন এ।",
    application: [
      "Shake well before use.",
      "Take 3–5 drops, massage into the scalp for 10–15 minutes, leave overnight, and wash with shampoo in the morning.",
      "For best results: rest well, exercise regularly, and maintain a balanced diet.",
    ],
    applicationBn: [
      "ব্যবহারের পূর্বে ভালকরে ঝাঁকিয়ে নিন। ৩–৫ ফোটা তেল হাতে নিয়ে স্ক্যাল্পে ১০–১৫ মিনিট ম্যাসেজ করুন এবং সারারাত রেখে দিন। সকালে শ্যাম্পু দিয়ে ধুয়ে ফেলুন।",
    ],
    results:
      "Supports smoother hair and helps address hair fall when used with healthy lifestyle habits.",
    warnings:
      "For hair/scalp use only — not food. Avoid eyes; rinse with water if contact occurs. If scalp discomfort occurs, discontinue and consult a specialist.",
  },
  {
    id: "lip-balm",
    slug: "lip-balm",
    name: "Mimosa Lip Balm",
    shortName: "Lip Balm",
    category: ["lip-care"],
    price: 350,
    weight: "10 GM",
    tagline: "Soft, protected lips — handmade organic care",
    inStock: true,
    images: ["/Images/products/lip-balm.jpg", "/Images/brand/logo-beyoutiful.jpg"],
    descriptionEn:
      "Mimosa Lip Balm cushions dry, chapped lips with a blend of beeswax, honey, and nourishing plant oils. Placeholder details — final formula copy coming soon.",
    descriptionBn:
      "Mimosa Lip Balm শুষ্ক ও ফাটা ঠোঁটকে কোমল ও সুরক্ষিত রাখতে সাহায্য করে। (বিস্তারিত কপি শীঘ্রই আপডেট করা হবে।)",
    ingredients:
      "Beeswax, honey, coconut oil, shea butter, Vitamin E, and light essential oil blend (placeholder formulation).",
    ingredientsBn:
      "মোম, মধু, নারকেল তেল, শিয়া বাটার, ভিটামিন ই এবং হালকা এসেনশিয়াল অয়েল (সাময়িক বিবরণ)।",
    application: [
      "Apply a thin layer to lips 2–3 times daily, or as needed.",
      "Reapply after eating or drinking for lasting softness.",
    ],
    applicationBn: [
      "দিনে ২–৩ বার বা প্রয়োজনমতো পাতলা লেয়ার লাগান। খাওয়া-দাওয়ার পর আবার লাগাতে পারেন।",
    ],
    results:
      "Softer, smoother lips with everyday moisture and a natural sheen.",
    warnings:
      "External use only — not food. Discontinue if irritation occurs. Keep away from eyes.",
  },
];

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug) {
  return products.filter((p) => p.category.includes(categorySlug));
}

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug);
}

export function getRelatedProducts(product, limit = 3) {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.category.some((c) => product.category.includes(c)),
    )
    .slice(0, limit);
}
