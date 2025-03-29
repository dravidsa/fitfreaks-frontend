/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1637',
        pathname: '/uploads/**',
      },
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'randomuser.me',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias['dompurify'] = path.resolve(__dirname, 'node_modules/dompurify/dist/purify.es.js');
    return config;
  },
};

module.exports = nextConfig;
