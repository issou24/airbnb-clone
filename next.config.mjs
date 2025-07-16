/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ← pour les images Cloudinary
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "airbnb-clone-2-957822787686.europe-west9.run.app", // ← sans "https://"
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
