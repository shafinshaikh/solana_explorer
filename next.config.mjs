/** @type {import('next').NextConfig} */
const nextConfig = {reactStrictMode: true,
    images: {
      domains: ['raw.githubusercontent.com', 'arweave.net'], // Add domains for NFT and token images
    },};

export default nextConfig;
