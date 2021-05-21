type TextLinkProps = {
  href: string;
};

const TextLink: React.FC<TextLinkProps> = ({ href, children, ...props }) => {
  return (
    <a
      className='text-blue-400 rounded hover:underline focus:outline-none focus:ring-2'
      href={href}
      {...props}>
      {children}
    </a>
  );
};

export default TextLink;
