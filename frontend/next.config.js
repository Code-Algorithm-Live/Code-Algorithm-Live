module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: ['k.kakaocdn.net'],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: 'https://solved.ac/:path*',
  //     },
  //   ];
  // },
};
