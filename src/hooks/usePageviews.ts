import useSWR from 'swr';

import fetcher from 'utils/fetcher';

type UsePageviews = {
  data?: PageviewsData;
  isLoading: boolean;
  isError: Error;
};

const usePageviews = (siteId: string): UsePageviews => {
  const { data, error } = useSWR<PageviewsData>(
    `/api/metrics/pageviews?siteId=${siteId}`,
    fetcher,
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default usePageviews;
