module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'fr'],
    defaultLocale: 'en-US',
    localeDetection: false,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false,
          },
        },
      ],
    });
    return config;
  },
};
