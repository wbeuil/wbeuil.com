import { useI18n } from 'next-localization';

import Metric from 'components/Metric';

const Vitals: React.FC = () => {
  const i18n = useI18n();

  return (
    <Metric className='vitals' href={`https://vitals.wbeuil.com`}>
      <div>
        {i18n.t('metrics.vitals')}{' '}
        <span className='text-gray-500'>wbeuil.com</span>
      </div>
    </Metric>
  );
};

export default Vitals;
