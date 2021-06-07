import type { NextApiRequest, NextApiResponse } from 'next';

const query = `{
  viewer {
    contributionsCollection {
      contributionCalendar {
        months {
          name
          totalWeeks
        }
        weeks {
          contributionDays {
            contributionLevel
            contributionCount
            date
            weekday
          }
        }
      }
    }
  }
}`;

export default async (
  _: NextApiRequest,
  res: NextApiResponse<GraphData>,
): Promise<void> => {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  }).then((r) => r.json());

  return res.status(200).json({ graph: response.data });
};
