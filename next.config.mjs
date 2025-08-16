/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://uqcbiumiwpkdvmdcpyjk.supabase.co/storage/v1/object/public/images/**"
      ),
      new URL("https://d2j6dbq0eux0bg.cloudfront.net/**"),
    ],
    unoptimized: true,
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1 semana de caché
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
