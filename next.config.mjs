/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cloud.appwrite.io"], // Add Domain permissions for images
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/products",
  //       destination: "/",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
