/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: 'hubfol.io',
        pathname: '**',
      },
      {
        hostname: 's3.amazonaws.com',
        pathname: '**',
      },
      {
        hostname: 'cdn.simpleicons.org',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
