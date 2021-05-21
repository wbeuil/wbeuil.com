import NextLink from 'next/link';

import Anchor from 'components/Anchor';

type BlogLinkProps = {
  href: string;
};

const BlogLink: React.FC<BlogLinkProps> = ({ children, href }) => {
  return (
    <NextLink href={href} passHref>
      <Anchor className='w-full max-w-xl p-4 rounded-md border-solid border border-gray-200 dark:border-gray-800 mb-8 focus:outline-none focus:ring-2'>
        {children}
      </Anchor>
    </NextLink>
  );
};

export default BlogLink;
