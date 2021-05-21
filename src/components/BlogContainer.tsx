import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { getMDXComponent } from 'mdx-bundler/client';

import Container from 'components/Container';
import BlogComponents from 'components/BlogComponents';
import BlogRow from 'components/BlogRow';

export type ReadTime = {
  text: string;
  time: number;
  words: number;
  minutes: number;
};

export type Information = {
  slug: string;
  readingTime: ReadTime;
} & Frontmatter;

export type Frontmatter = {
  title: string;
  description: string;
  locale: string;
  alternate: string;
  isPublished: boolean;
  publishedAt: string;
  tags: string[];
};

export type Blog = {
  code: string;
  frontmatter: Frontmatter;
  readingTime: ReadTime;
};

const BlogContainer: React.FC<Blog> = ({ code, frontmatter, readingTime }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const router = useRouter();

  const seo = {
    type: 'article',
    image: `https://wbeuil.com/api${router.asPath}`,
    imageAlt: frontmatter.title,
    ...frontmatter,
  };

  return (
    <Container seo={seo as unknown as { [key: string]: string }}>
      <article className='w-full max-w-3xl'>
        <h1 className='text-5xl font-bold mb-6'>{frontmatter.title}</h1>
        <BlogRow
          tags={frontmatter.tags}
          publishedAt={frontmatter.publishedAt}
          readingTime={readingTime}
        />
        <Component components={BlogComponents} />
      </article>
    </Container>
  );
};

export default BlogContainer;
