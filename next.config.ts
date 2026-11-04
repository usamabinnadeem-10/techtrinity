import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [40, 75],
  },
  experimental: {
    // Inline the (small, atomic) Tailwind CSS into a <style> tag instead of a
    // render-blocking <link>, removing the stylesheet request from the critical
    // path. Recommended for atomic CSS; only applies to production builds.
    inlineCss: true,
  },
  async redirects() {
    return [
      // EasyAccounts was renamed to TappyIO; keep the old case study URL working.
      {
        source: "/work/easyaccounts",
        destination: "/work/tappyio",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
