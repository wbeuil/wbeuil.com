import BlogLink from 'components/BlogLink';
import BlogRow from 'components/BlogRow';

import type { Information } from 'components/BlogContainer';

const BlogInfo: React.FC<Information> = ({
  title,
  description,
  tags,
  slug,
  readingTime,
  publishedAt,
}) => {
  return (
    <BlogLink href={`/blog/${slug}`}>
      <div className='w-full'>
        <h2 className='text-2xl font-bold mb-2 px-1'>{title}</h2>
        <p className='text-gray-400 mb-6 px-1'>{description}</p>
        <BlogRow
          tags={tags}
          publishedAt={publishedAt}
          readingTime={readingTime}
        />
      </div>
    </BlogLink>
  );
};

export default BlogInfo;
