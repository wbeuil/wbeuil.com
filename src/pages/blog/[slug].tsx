import BlogContainer from 'components/BlogContainer';
import { bundleMDX } from 'mdx-bundler';
import remarkPrism from 'remark-prism';
import readingTime from 'reading-time';
import matter from 'gray-matter';

import { getBlogs, getBlogBySlug } from 'utils/mdx';

import type {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPathsResult,
} from 'next';
import type { PluggableList } from 'unified';
import type { Blog as BlogType } from 'components/BlogContainer';

const Blog: React.FC<BlogType> = (props) => {
  return <BlogContainer {...props} />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params?.slug) {
    const source = getBlogBySlug(params.slug as string);
    const { content } = matter(source.trim());
    const remarkPlugins = [remarkPrism];
    const result = await bundleMDX(source.trim(), {
      xdmOptions(_, options) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          remarkPlugins,
        ] as PluggableList;
        return options;
      },
    });

    return {
      props: { ...result, readingTime: readingTime(content) },
    };
  }

  return {
    props: {
      notFound: true,
    },
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
