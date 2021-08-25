type MetricProps = {
  href: string;
  metric?: string;
  className?: string;
};

const Metric: React.FC<MetricProps> = ({
  href,
  metric,
  className = '',
  children,
}) => {
  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href={href}
      className={`${className} flex flex-col w-full p-4 rounded-md border-solid border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2`}>
      {children}
      {metric && <span className='text-4xl font-bold mt-4'>{metric}</span>}
    </a>
  );
};

export default Metric;
