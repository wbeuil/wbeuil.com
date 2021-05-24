import type { NextApiRequest, NextApiResponse } from 'next';

import screenshot from 'utils/screenshot';
import generateBlogImageHTML from 'utils/blog-image';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { slug } = req.query || {};

  if (slug) {
    const response = await fetch(
      `https://raw.githubusercontent.com/wbeuil/wbeuil.com/main/blogs/${slug}.mdx`,
    );

    if (!response.ok) {
      return res.status(response.status).send(response.statusText);
    }

    const blog = await response.text();
    const html = generateBlogImageHTML(blog);
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
