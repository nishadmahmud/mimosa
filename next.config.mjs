/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Avoid intermittent production failures from the image optimizer
    // (remote CDN timeouts / missing domains). Serve src URLs directly.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.outletexpense.xyz",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "outletexpense.xyz",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.outletexpense.xyz",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "www.outletexpense.xyz",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "outletexpense.xyz",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
