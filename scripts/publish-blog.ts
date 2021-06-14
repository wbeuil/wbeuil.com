import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '.env.publish.local') });

const MEDIUM_USER_ID =
  '1e5ddde134d614b22c6a704cc672a68a7b0e340df37520cb8368a300f88cbae4e';

const generateBlog = (slug: string): Record<string, unknown> => {
  const source = fs.readFileSync(
    path.join(__dirname, '..', 'blogs', `${slug}.mdx`),
    'utf8',
  );
  const { data, content } = matter(source.trim());
  const canonicalUrl =
    data.locale === 'en'
      ? `https://wbeuil.com/blog/${slug}`
      : `https://wbeuil.com/fr/blog/${slug}`;

  return {
    ...data,
    canonicalUrl,
    content: replaceRelativePath(content),
  };
};

const replaceRelativePath = (content: string): string => {
  const withoutRelativeImage = content.replace(
    /\]\(\/images(?!https?:\/\/)/gi,
    '](' + 'https://wbeuil.com/images',
  );
  return withoutRelativeImage.replace(
    /\]\((?!https?:\/\/)/gi,
    '](' + 'https://wbeuil.com',
  );
};

(async () => {
  if (process.argv.length !== 3) {
    console.log('Should only have 1 argument');
    process.exit(1);
  }

  const slug = process.argv[2];
  const exist = fs
    .readdirSync(path.join(__dirname, '..', 'blogs'))
    .find((b) => b === `${slug}.mdx`);

  if (!exist) {
    console.log(`${slug} article does not exist`);
    process.exit(1);
  }

  const blog = generateBlog(slug);

  // Medium API
  fetch(`https://api.medium.com/v1/users/${MEDIUM_USER_ID}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.MEDIUM_TOKEN}`,
    },
    body: JSON.stringify({
      title: blog.title,
      content: blog.content,
      tags: blog.tags,
      canonicalUrl: blog.canonicalUrl,
      contentFormat: 'markdown',
      publishStatus: 'draft',
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errors) {
        data.errors.forEach((error: Error) =>
          console.log('Medium:', error.message),
        );
      } else {
        console.log(
          'Medium: Success in publishing the draft article at https://medium.com/me/stories/drafts',
        );
      }
    })
    .catch((error) => console.log(error));

  // Dev.to API
  fetch('https://dev.to/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.DEV_TOKEN as string,
    },
    body: JSON.stringify({
      article: {
        title: blog.title,
        body_markdown: blog.content,
        description: blog.description,
        tags: blog.tags,
        canonical_url: blog.canonicalUrl,
      },
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        console.log('Dev.to:', data.error);
      } else {
        console.log(
          'Dev.to: Success in publishing the draft article at https://dev.to/dashboard',
        );
      }
    })
    .catch((error) => console.log(error));

  // Hashnode API
  fetch('https://api.hashnode.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.HASHNODE_TOKEN as string,
    },
    body: JSON.stringify({
      query:
        'mutation createStory($input: CreateStoryInput!){ createStory(input: $input){ code success message } }',
      variables: {
        input: {
          title: blog.title,
          contentMarkdown: blog.content,
          tags: [],
          isRepublished: {
            originalArticleURL: blog.canonicalUrl,
          },
        },
      },
    }),
  })
    .then((res) => res.json())
    .then(({ data }) => {
      if (!data.createStory.success) {
        console.log('Hashnode:', data.createStory.message);
      } else {
        console.log(
          'Hashnode: Success in publishing the article at https://hashnode.com/@wbeuil',
        );
      }
    })
    .catch((error) => console.log(error));
})();
