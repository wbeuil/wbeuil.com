/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react';

import ListArrow from 'icons/list-arrow.svg';

const ListItem: React.FC = ({ children, ...props }) => {
  const listRef = useRef<any>();
  const [type, setType] = useState<string>('');

  useEffect(() => {
    setType(listRef?.current?.parentElement.nodeName.toLowerCase());
  }, [listRef]);

  return (
    <li ref={listRef} className='flex flex-row items-baseline' {...props}>
      {type === 'ul' && (
        <span
          className='text-orange min-w-40 pr-3 transform translate-y-1'
          aria-hidden>
          <ListArrow width={18} height={18} />
        </span>
      )}
      <span>{children}</span>
    </li>
  );
};

export default ListItem;
