"use client";

import Image from "next/image";
import { useState } from "react";
import { FALLBACK_IMAGE, resolveMediaUrl } from "@/lib/media";

/**
 * next/image wrapper that resolves API URLs and falls back if load fails.
 */
export default function SafeImage({
  src,
  alt = "",
  fallback = FALLBACK_IMAGE,
  className,
  ...props
}) {
  const initial = resolveMediaUrl(src) || fallback;
  const [current, setCurrent] = useState(initial);

  return (
    <Image
      {...props}
      src={current}
      alt={alt}
      className={className}
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
      unoptimized
    />
  );
}
