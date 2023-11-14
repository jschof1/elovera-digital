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
      "i.ytimg.com",
      "imgproxy.ra.co",
    ],
  },
  env: {
    youtubeAPIKey: "AIzaSyB_PP0ZG3I4pz594txvWlLXUcUbB_-oiYw",
  },
};

module.exports = nextConfig
