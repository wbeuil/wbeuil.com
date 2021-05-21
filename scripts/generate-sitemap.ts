import { SitemapStream } from 'sitemap';
import matter from 'gray-matter';
import globby from 'globby';
import path from 'path';
import fs from 'fs';

const OUTPUT_FILE = path.resolve(__dirname, '..', 'public', 'sitemap.xml');

(async () => {
  const sitemap = new SitemapStream({
    hostname: 'https://wbeuil.com',
    xmlns: {
      xhtml: true,
      news: false,
      image: false,
      video: false,
    },
  });

  const locales = ['en', 'fr'];

  const pages = await globby([
    'src/pages/*.tsx',
    '!src/pages/404.tsx',
    '!src/pages/_*.tsx',
    '!src/pages/api',
  ]);

  const blogs = fs.readdirSync(path.join(__dirname, '..', 'blogs'));

  const writeStream = fs.createWriteStream(OUTPUT_FILE);

  sitemap.pipe(writeStream);

  pages.forEach((page) => {
    const name = path.basename(page, path.extname(page));
    const url = name === 'index' ? '/' : `/${name}`;
    for (const locale of locales) {
      sitemap.write({
        url: locale === 'en' ? url : `/fr${url}`,
        links: [
          { lang: 'en', url: `https://wbeuil.com${url}` },
          { lang: 'fr', url: `https://wbeuil.com/fr${url}` },
        ],
      });
    }
  });

  blogs.forEach((blog) => {
    const name = blog.replace(/\.mdx/, '');
    const url = `/blog/${name}`;
    const content = fs.readFileSync(
      path.join(__dirname, '..', 'blogs', blog),
      'utf8',
    );
    const { data } = matter(content);

    if (data.isPublished) {
      sitemap.write({
        url: data.locale === 'en' ? url : `/fr${url}`,
        links: [
          {
            lang: 'en',
            url:
              data.locale === 'en'
                ? `https://wbeuil.com${url}`
                : `https://wbeuil.com${data.alternate}`,
          },
          {
            lang: 'fr',
            url:
              data.locale === 'en'
                ? `https://wbeuil.com/fr${data.alternate}`
                : `https://wbeuil.com/fr${url}`,
          },
        ],
      });
    }
  });

  sitemap.end();

  console.log(`Sitemap written at ${OUTPUT_FILE}`);
})();
