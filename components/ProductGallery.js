"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden bg-sage">
        <Image
          src={images[active]}
          alt={name}
          fill
          priority
          className="object-cover animate-fade-in"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-16 w-16 overflow-hidden border-2 transition ${
                i === active ? "border-forest" : "border-transparent opacity-70"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
