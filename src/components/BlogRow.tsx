import { useI18n } from 'next-localization';
import { useRouter } from 'next/router';

import formatDate from 'utils/date';

import type { IReadTimeResults } from 'reading-time';

type BlogRowProps = {
  tags: string[];
  publishedAt: string;
  readingTime: IReadTimeResults;
};

const BlogRow: React.FC<BlogRowProps> = ({
  tags,
  publishedAt,
  readingTime,
}) => {
  const router = useRouter();
  const i18n = useI18n();

  const isEN = router?.locale === 'en';

  return (
    <div className='flex flex-col md:flex-row justify-between md:items-center'>
      <div className='flex flex-row'>
        {tags.map((tag) => (
          <p key={tag} className='text-sm text-gray-500 dark:text-gray-400 p-1'>
            <span className='text-gray-300 dark:text-gray-600'>#</span>
            {tag}
          </p>
        ))}
      </div>
      <div className='flex flex-row'>
        <p className='text-xs text-gray-500 p-1'>
          {i18n.t('blog.published')}{' '}
          {formatDate(isEN ? 'en-US' : 'fr-FR', new Date(publishedAt))}
        </p>
        <span className='text-gray-500'>·</span>
        <p className='text-xs text-gray-500 p-1'>
          {Math.ceil(readingTime.minutes).toFixed(0)}
          {i18n.t('blog.read')}
        </p>
      </div>
    </div>
  );
};

export default BlogRow;
