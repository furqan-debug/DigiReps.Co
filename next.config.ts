import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["contentful"],
  turbopack: {},
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.ctfassets.net" },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Patch Node.js v25's broken localStorage stub so contentful's debug module won't crash
      config.plugins = config.plugins || [];
      config.plugins.push({
        apply(compiler: { hooks: { beforeRun: { tap: (name: string, cb: (compiler: unknown) => void) => void } } }) {
          compiler.hooks.beforeRun.tap("PatchLocalStorage", () => {
            if (typeof globalThis.localStorage !== "undefined" && typeof (globalThis.localStorage as Storage).getItem !== "function") {
              (globalThis as unknown as Record<string, unknown>).localStorage = {
                getItem: () => null,
                setItem: () => { },
                removeItem: () => { },
                clear: () => { },
                key: () => null,
                length: 0,
              };
            }
          });
        },
      });
    }
    return config;
  },
};

export default nextConfig;
