/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CRONITORIO_CLIENT_KEY: process.env.NEXT_PUBLIC_CRONITORIO_CLIENT_KEY,
  },
  output: 'export',
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: './services/image-loader-service.ts',
  },
};

export default nextConfig;
