/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net'
      }
    ]
  },
  allowedDevOrigins: ['192.168.0.101']
}

export default nextConfig
//done 1
