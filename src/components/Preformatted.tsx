type PreformattedProps = {
  className: string;
};

const Preformatted: React.FC<PreformattedProps> = ({ className, ...props }) => {
  const [, lang] = className.match(/language-(.+)/) as RegExpMatchArray;

  return (
    <pre
      data-language={lang === 'unknown' ? undefined : lang}
      className={`${className} relative rounded bg-secondary border border-primary my-5 overflow-hidden`}
      {...props}
    />
  );
};

export default Preformatted;
