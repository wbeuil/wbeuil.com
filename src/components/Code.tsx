type CodeProps = {
  className: string;
};

const Code: React.FC<CodeProps> = ({ className, ...props }) => {
  return (
    <code
      className={
        className
          ? `${className} block overflow-auto max-h-3/4 px-2 py-6 md:px-4 md:py-8`
          : 'rounded bg-gray-200 dark:bg-gray-700 px-1.5 py-1'
      }
      {...props}
    />
  );
};

export default Code;
