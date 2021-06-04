import { useI18n } from 'next-localization';

import Container from 'components/Container';
import BlogInfo from 'components/BlogInfo';
import { getBlogsInformation } from 'utils/mdx';

import type { GetStaticProps } from 'next';
import type { Information } from 'components/BlogContainer';

const Blog: React.FC<{ blogs: Information[] }> = ({ blogs }) => {
  const i18n = useI18n();

  return (
    <Container seo={i18n.t('blog.seo') as unknown as { [key: string]: string }}>
      <h1 className='text-3xl sm:text-5xl font-bold my-8'>
        {i18n.t('blog.title')}
      </h1>
      {!blogs.length && (
        <p className='text-2xl text-gray-400 mb-4'>{i18n.t('blog.none')}</p>
      )}
      {blogs.map((info) => (
        <BlogInfo key={info.slug} {...info} />
      ))}
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const language = await import(`../locales/${locale}.json`);
  const blogs = getBlogsInformation(locale);

  return {
    props: {
      lngDict: language.default,
      blogs,
    },
  };
};

export default Blog;
