import { useI18n } from 'next-localization';

import Metric from 'components/Metric';
import usePageviews from 'hooks/usePageviews';

type AnalyticsProps = {
  siteId: string;
};

const Analytics: React.FC<AnalyticsProps> = ({ siteId }) => {
  const i18n = useI18n();
  const { data } = usePageviews(siteId);

  return (
    <Metric
      href={`https://analytics.wbeuil.com/${siteId}`}
      metric={data?.pageviews.toString()}>
      <div>
        {i18n.t('metrics.pageviews')}{' '}
        <span className='text-gray-500'>{siteId}</span>
      </div>
    </Metric>
  );
};

export default Analytics;
