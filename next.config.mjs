/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable image optimization with remotePatterns
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'leetcard.jacoblin.cool',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placeholder.svg',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
