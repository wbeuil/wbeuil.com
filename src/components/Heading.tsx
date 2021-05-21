import { useI18n } from 'next-localization';

import Link from 'icons/link.svg';

type HeadingProps = {
  level: string;
};

const createId = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '');
};

const Heading: React.FC<HeadingProps> = ({ level, children, ...props }) => {
  const i18n = useI18n();
  const id = createId(children as string);

  let size;
  let translate;
  const Component = level as React.ElementType;

  switch (level) {
    case 'h1':
      size = 'text-5xl';
      translate = 'translate-y-h1';
      break;
    case 'h2':
      size = 'text-4xl';
      translate = 'translate-y-h2';
      break;
    case 'h3':
      size = 'text-3xl';
      translate = 'translate-y-h3';
      break;
    case 'h4':
      size = 'text-2xl';
      translate = 'translate-y-h4';
      break;
    case 'h5':
      size = 'text-xl';
      translate = 'translate-y-h5';
      break;
    case 'h6':
      size = 'text-lg';
      translate = 'translate-y-h6';
      break;
    default:
      break;
  }

  return (
    <Component className={`group ${size} font-bold mt-8 mb-6`} {...props}>
      <a
        id={id}
        href={`#${id}`}
        style={{ scrollMarginTop: '142px' }}
        className={`hidden md:block absolute transform -translate-x-8 ${translate} rounded opacity-0 group-hover:opacity-70 group-focus:opacity-70 hover:opacity-70 focus:opacity-70 focus:outline-none focus:ring-2`}>
        <Link width={24} />
        <span className='sr-only'>{i18n.t('blog.anchor')}</span>
      </a>
      {children}
    </Component>
  );
};

export default Heading;
