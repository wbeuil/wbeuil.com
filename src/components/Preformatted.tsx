import { cloneElement, useEffect, useRef, useState } from 'react';
import { useI18n } from 'next-localization';

import CopyIcon from 'icons/copy.svg';
import CopySuccessIcon from 'icons/copy-success.svg';
import CopyErrorIcon from 'icons/copy-error.svg';

type PreformattedProps = {
  className: string;
};

const Preformatted: React.FC<PreformattedProps> = ({
  className,
  children,
  ...props
}) => {
  const [, lang] = className.match(/language-(.+)/) as RegExpMatchArray;
  const [copy, setCopy] = useState<string>('copy');
  const childrenRef = useRef<HTMLElement>();
  const i18n = useI18n();

  const copyToClipboard = async () => {
    if (navigator.clipboard && childrenRef?.current?.textContent) {
      return navigator.clipboard
        .writeText(childrenRef.current.textContent)
        .then(
          () => setCopy('copy-success'),
          () => setCopy('copy-error'),
        );
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (copy !== 'copy') {
      timer = setTimeout(() => {
        setCopy('copy');
      }, 2000);
    }
    return () => timer && clearTimeout(timer);
  }, [copy]);

  let color;

  switch (copy) {
    case 'copy-success':
      color = 'text-green-500';
      break;
    case 'copy-error':
      color = 'text-red-500';
      break;
    default:
      color = 'text-gray-500';
      break;
  }

  return (
    <pre
      data-language={lang === 'unknown' ? undefined : lang}
      className={`${className} relative rounded bg-secondary border border-primary my-5 overflow-hidden group`}
      {...props}>
      <button
        onClick={copyToClipboard}
        className={`inline-flex absolute bottom-1 md:bottom-2 right-3 md:right-4 text-xs ${color} font-medium uppercase rounded p-0.5 opacity-0 group-hover:opacity-100 group-focus:opacity-100 hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2`}
        type='button'
        aria-label={i18n.t(`blog.${copy}`)}
        title={i18n.t(`blog.${copy}`)}>
        <span className='mr-1'>{i18n.t(`blog.${copy}`)}</span>
        {copy === 'copy' && <CopyIcon width={16} height={16} aria-hidden />}
        {copy === 'copy-success' && (
          <CopySuccessIcon width={16} height={16} aria-hidden />
        )}
        {copy === 'copy-error' && (
          <CopyErrorIcon width={16} height={16} aria-hidden />
        )}
      </button>
      {cloneElement(children as React.ReactElement, { ref: childrenRef })}
    </pre>
  );
};

export default Preformatted;
