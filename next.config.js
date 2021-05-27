const isProd = process.env.NODE_ENV === 'production' ? true : false;

const ContentSecurityPolicy = `
base-uri 'none';
media-src 'none';
child-src 'none';
frame-src 'none';
object-src 'none';
form-action 'none';
frame-ancestors 'none';
img-src 'self';
font-src 'self';
manifest-src 'self';
style-src 'self' 'unsafe-inline';
connect-src 'self' ${
  isProd
    ? 'https://vitals.vercel-insights.com https://analytics.wbeuil.com'
    : ''
};
`;

const PermissionsPolicy = `
camera=(),
document-domain=(),
encrypted-media=(),
fullscreen=(),
geolocation=(),
microphone=(),
midi=(),
payment=(),
picture-in-picture=(),
publickey-credentials-get=(),
sync-xhr=(),
usb=(),
xr-spatial-tracking=()
`;

module.exports = {
  future: {
    webpack5: true,
    strictPostcssConfiguration: true,
  },
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
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
  async rewrites() {
    return [
      {
        source: '/js/script.js',
        destination:
          'https://analytics.wbeuil.com/js/plausible.outbound-links.js',
      },
      {
        source: '/api/event',
        destination: 'https://analytics.wbeuil.com/api/event',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/fonts/work-sans.woff2',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicons/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\n/g, ' '),
          },
          {
            key: 'Permissions-Policy',
            value: PermissionsPolicy.replace(/\n/g, ' '),
          },
        ],
      },
    ];
  },
};
