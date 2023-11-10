/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "shop.doverstreetmarket.com",
      "elovera.my.canva.site",
      "goodhoodstore.com",
      "i.postimg.cc",
    ],
  },
};

module.exports = nextConfig
