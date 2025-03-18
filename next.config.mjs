/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "assets.grok.com"],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
