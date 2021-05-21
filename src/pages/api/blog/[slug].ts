import type { NextApiRequest, NextApiResponse } from 'next';

import screenshot from 'utils/screenshot';
import { getBlogs } from 'utils/mdx';
import generateBlogImageHTML from 'utils/blog-image';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { slug } = req.query || {};

  if (slug) {
    const blogs = getBlogs();

    if (!blogs.find((blog) => blog.replace(/\.mdx/, '') === slug)) {
      return res.status(404).send('Not Found');
    }

    const html = generateBlogImageHTML(slug as string);
    const file = await screenshot(html);
    res.setHeader('Content-Type', `image/png`);
    res.setHeader(
      'Cache-Control',
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
    );
    return res.status(200).end(file);
  }

  return res.status(404).send('Not Found');
};
