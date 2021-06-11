type EventOptions = {
  callback?: () => void;
  props?: { [propName: string]: string };
};

type PlausibleArgs = [string, EventOptions] | [string];

interface Window {
  plausible: {
    (...args: PlausibleArgs): void;
    q?: PlausibleArgs[];
  };
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

type ReposData = {
  repos: {
    viewer: {
      pinnedItems: {
        nodes: Array<{
          id: string;
          url: string;
          name: string;
          description: string;
          stargazerCount: number;
          forkCount: number;
          primaryLanguage: {
            name: string;
            color: string;
          };
          owner: {
            login: string;
          };
        }>;
      };
    };
  };
};

type GraphData = {
  graph: {
    viewer: {
      contributionsCollection: {
        contributionCalendar: {
          months: Array<{
            name: string;
            totalWeeks: number;
          }>;
          weeks: Array<{
            contributionDays: Array<{
              contributionLevel: string;
              contributionCount: number;
              date: string;
              weekday: number;
            }>;
          }>;
        };
      };
    };
  };
};

type PageviewsData = {
  pageviews: number;
};
