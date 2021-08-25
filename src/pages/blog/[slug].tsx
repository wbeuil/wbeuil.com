import { bundleMDXFile } from 'mdx-bundler';
import remarkPrism from 'remark-prism';
import readingTime from 'reading-time';
import matter from 'gray-matter';
import path from 'path';

import BlogContainer from 'components/BlogContainer';
import { getBlogs, getBlogBySlug } from 'utils/mdx';

import type {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPathsResult,
} from 'next';
import type { Blog as BlogType } from 'components/BlogContainer';

const Blog: React.FC<BlogType> = (props) => {
  return <BlogContainer {...props} />;
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (params?.slug) {
    const language = await import(`../../locales/${locale}.json`);
    const remarkPlugins = [remarkPrism];
    const { code, frontmatter, matter } = await bundleMDXFile(
      path.join(process.cwd(), 'blogs', `${params.slug}.mdx`),
      {
        xdmOptions(options) {
          options.remarkPlugins = [
            ...(options.remarkPlugins ?? []),
            remarkPlugins,
          ] as never;
          return options;
        },
      },
    );

    return {
      props: {
        code,
        frontmatter,
        readingTime: readingTime(matter.content),
        lngDict: language.default,
      },
    };
  }

  return {
    notFound: true,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = getBlogs();

  const paths: GetStaticPathsResult['paths'] = [];
  blogs.forEach((blog) => {
    const slug = blog.replace(/\.mdx/, '');
    const source = getBlogBySlug(slug);
    const { data } = matter(source.trim());

    if (data.isPublished) {
      paths.push({
        params: {
          slug,
        },
        locale: data.locale,
      });
    }
  });

  return {
    paths,
    fallback: false,
  };
};

export default Blog;
