/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: true,
  },
  reactStrictMode: false,
  // headers: () => [
  //   {
  //     source: '/(.*)',
  //     headers: [
  //       {
  //         key: 'X-Frame-Options',
  //         value: 'DENY',
  //       },
  //       {
  //         key: 'X-Content-Type-Options',
  //         value: 'nosniff',
  //       },
  //       {
  //         key: 'X-XSS-Protection',
  //         value: '1; mode=block',
  //       },
  //       {
  //         key: 'Referrer-Policy',
  //         value: 'no-referrer',
  //       },
  //     ],
  //   },
  // ],
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
      {
        hostname: 'cdn.simpleicons.org',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
