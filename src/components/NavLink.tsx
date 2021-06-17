import NextLink from 'next/link';
import { useRouter } from 'next/router';

import Anchor from 'components/Anchor';

type NavLinkProps = {
  href: string;
};

const NavLink: React.FC<NavLinkProps> = ({ children, href }) => {
  const router = useRouter();
  const isActive =
    router.pathname.replace(/\/$/, '') === href.replace(/\/$/, '');

  return (
    <NextLink href={href} passHref>
      <Anchor
        className={`${
          isActive ? 'text-primary' : 'text-secondary'
        } mr-2 md:mr-4 py-2 px-2 md:px-4 font-semibold text-lg rounded-lg hover:text-primary hover:bg-secondary active:bg-tertiary focus:outline-none focus-visible:ring-2 focus-visible:bg-secondary focus-visible:text-primary`}>
        {children}
      </Anchor>
    </NextLink>
  );
};

export default NavLink;
