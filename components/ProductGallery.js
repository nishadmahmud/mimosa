"use client";

import { useState } from "react";
import { FALLBACK_IMAGE } from "@/lib/media";
import SafeImage from "./SafeImage";

export default function ProductGallery({ images, name }) {
  const list =
    Array.isArray(images) && images.length > 0 ? images : [FALLBACK_IMAGE];
  const [active, setActive] = useState(0);
  const current = list[Math.min(active, list.length - 1)];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden bg-sage">
        <SafeImage
          src={current}
          alt={name}
          fill
          priority
          className="object-cover animate-fade-in"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {list.length > 1 && (
        <div className="mt-3 flex gap-2">
          {list.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-16 w-16 overflow-hidden border-2 transition ${
                i === active ? "border-forest" : "border-transparent opacity-70"
              }`}
            >
              <SafeImage src={src} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
