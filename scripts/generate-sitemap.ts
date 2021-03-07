import { createWriteStream } from 'fs';
import { SitemapStream } from 'sitemap';
import globby from 'globby';
import path from 'path';

const OUTPUT_FILE = path.resolve(__dirname, '..', 'public', 'sitemap.xml');

(async () => {
  const pages = await globby([
    'src/pages/**/*{.tsx,.mdx}',
    '!src/pages/_*.tsx',
    '!src/pages/api',
  ]);

  const sitemap = new SitemapStream({ hostname: 'https://wbeuil.com' });

  const writeStream = createWriteStream(OUTPUT_FILE);

  sitemap.pipe(writeStream);
  pages.forEach((page) => {
    const name = path.basename(page, path.extname(page));
    const url = name === 'index' ? '/' : `/${name}`;
    sitemap.write({ url, changefreq: 'weekly', priority: 1 });
  });
  sitemap.end();

  console.log(`Sitemap written at ${OUTPUT_FILE}`);
})();
