import type { NextApiRequest, NextApiResponse } from 'next';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<PageviewsData | string>,
): Promise<void> => {
  const { siteId } = req.query || {};

  if (siteId) {
    const response = await fetch(
      `https://analytics.wbeuil.com/api/v1/stats/aggregate?site_id=${siteId}&period=12mo&metrics=pageviews`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PLAUSIBLE_TOKEN}`,
        },
      },
    ).then((r) => r.json());

    if (response.error) {
      return res.status(404).send('Not Found');
    }

    return res
      .status(200)
      .json({ pageviews: response.results.pageviews.value });
  }

  return res.status(404).send('Not Found');
};
