import NextLink from 'next/link';

import Anchor from 'components/Anchor';

type FooterLinkProps = {
  href: string;
  external?: boolean;
};

const FooterLink: React.FC<FooterLinkProps> = ({
  children,
  href,
  external,
}) => {
  if (external) {
    return (
      <a
        className='text-gray-400 p-1 rounded focus:outline-none focus:ring-2'
        target='_blank'
        rel='noopener noreferrer'
        href={href}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} passHref>
      <Anchor className='text-gray-400 p-1 rounded focus:outline-none focus:ring-2'>
        {children}
      </Anchor>
    </NextLink>
  );
};

export default FooterLink;
