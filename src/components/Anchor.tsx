import { forwardRef } from 'react';

type AnchorProps = React.HTMLProps<HTMLAnchorElement>;

const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ children, onClick, href, ...props }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref} {...props}>
        {children}
      </a>
    );
  },
);

Anchor.displayName = 'Anchor';

export default Anchor;
