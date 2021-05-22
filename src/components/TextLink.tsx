import NextLink from 'next/link';

import Anchor from 'components/Anchor';

type TextLinkProps = {
  href: string;
};

const TextLink: React.FC<TextLinkProps> = ({ href, children, ...props }) => {
  const classes =
    'text-blue-400 rounded hover:underline focus:outline-none focus:ring-2';

  if (href?.match(/^#/)) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    );
  } else if (href?.match(/(^http)/i)) {
    return (
      <a
        className={classes}
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        {...props}>
        {children}
      </a>
    );
  } else {
    return (
      <NextLink href={href} passHref>
        <Anchor className={classes} {...props}>
          {children}
        </Anchor>
      </NextLink>
    );
  }
};

export default TextLink;
