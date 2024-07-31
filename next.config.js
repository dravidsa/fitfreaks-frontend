/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve.alias['dompurify'] = path.resolve(__dirname, 'node_modules/dompurify/dist/purify.es.js');
    return config;
  },
};

module.exports = nextConfig;

