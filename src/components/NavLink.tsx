import NextLink from 'next/link';

import Anchor from 'components/Anchor';

type NavLinkProps = {
  href: string;
};

const NavLink: React.FC<NavLinkProps> = ({ children, href }) => {
  return (
    <NextLink href={href} passHref>
      <Anchor className='mr-2 md:mr-4 p-2 font-medium rounded-md focus:outline-none focus:ring-2'>
        {children}
      </Anchor>
    </NextLink>
  );
};

export default NavLink;
