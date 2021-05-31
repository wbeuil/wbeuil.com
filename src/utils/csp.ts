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

const createCSPHeader = (nonce: string): string => {
  let header = ContentSecurityPolicy.replace(/\n/g, ' ');
  header += `script-src 'strict-dynamic' 'nonce-${nonce}' 'unsafe-inline' 'unsafe-eval' http: https:;`;
  return header;
};

export default createCSPHeader;
