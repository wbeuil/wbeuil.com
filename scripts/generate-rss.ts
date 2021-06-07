import RSS from 'rss';
import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';

const OUTPUT_FILE_EN = path.resolve(__dirname, '..', 'public', 'en.feed.xml');
const OUTPUT_FILE_FR = path.resolve(__dirname, '..', 'public', 'fr.feed.xml');

(async () => {
  const feedEN = new RSS({
    title: "William Beuil's Blog",
    description: 'Everything about my adventure as a developer.',
    site_url: 'https://wbeuil.com',
    feed_url: 'https://wbeuil.com/en.feed.xml',
    language: 'en',
  });

  const feedFR = new RSS({
    title: 'Blog de William Beuil',
    description: 'Toute mon aventure en tant que développeur.',
    site_url: 'https://wbeuil.com/fr',
    feed_url: 'https://wbeuil.com/fr.feed.xml',
    language: 'fr',
  });

  const blogs = fs.readdirSync(path.join(__dirname, '..', 'blogs'));

  blogs
    .map(
      (
        blog,
      ): {
        [key: string]: string | boolean;
      } => {
        const slug = blog.replace(/\.mdx/, '');
        const source = fs.readFileSync(
          path.join(__dirname, '..', 'blogs', blog),
          'utf8',
        );
        const { data } = matter(source);
        return { ...data, slug };
      },
    )
    .filter((blog) => blog.isPublished)
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt as string)) -
        Number(new Date(a.publishedAt as string)),
    )
    .forEach((blog) => {
      if (blog.locale === 'en') {
        feedEN.item({
          title: blog.title,
          url: `https://wbeuil.com/blog/${blog.slug}`,
          description: blog.description,
          categories: blog.tags,
          author: 'William Beuil',
          date: blog.publishedAt,
        });
      } else {
        feedFR.item({
          title: blog.title,
          url: `https://wbeuil.com/fr/blog/${blog.slug}`,
          description: blog.description,
          categories: blog.tags,
          author: 'William Beuil',
          date: blog.publishedAt,
        });
      }
    });

  fs.writeFileSync(OUTPUT_FILE_EN, feedEN.xml({ indent: true }));
  console.log(`RSS feed written at ${OUTPUT_FILE_EN}`);

  fs.writeFileSync(OUTPUT_FILE_FR, feedFR.xml({ indent: true }));
  console.log(`RSS feed written at ${OUTPUT_FILE_FR}`);
})();
