/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'hubfol.io',
        pathname: '**',
      },
      {
        hostname: 's3.amazonaws.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
