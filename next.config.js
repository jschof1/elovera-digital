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
      "lh3.googleusercontent.com",
      "i.ytimg.com",
      "imgproxy.ra.co",
    ],
  }
};

module.exports = nextConfig
