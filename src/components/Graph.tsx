import React, { useState } from 'react';

import Rects from 'components/Rects';
import Months from 'components/Months';
import Days from 'components/Days';
import LessMore from 'components/LessMore';
import useGraph from 'hooks/useGraph';

const Repos: React.FC = () => {
  const { data, isLoading } = useGraph();
  const [hidden, setHidden] = useState(true);
  const [count, setCount] = useState(0);
  const [date, setDate] = useState('');

  const handleOnMouseOver = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    if ((event.target as SVGSVGElement).matches('rect[data-count]')) {
      const d = (event.target as SVGSVGElement).getAttribute(
        'data-date',
      ) as string;
      setDate(d);

      const c = (event.target as SVGSVGElement).getAttribute(
        'data-count',
      ) as string;
      setCount(parseInt(c, 10));

      setHidden(false);
    } else {
      setHidden(true);
    }
  };

  const handleOnMouseLeave = () => {
    setHidden(true);
  };

  return (
    <div className='w-full md:w-min py-2 mt-16 rounded-md border-solid border border-gray-200 dark:border-gray-800'>
      <div className='relative overflow-hidden flex flex-col items-end md:items-center mx-3'>
        <svg
          width='722'
          height='112'
          onMouseOver={handleOnMouseOver}
          onMouseLeave={handleOnMouseLeave}>
          <g transform='translate(10, 20)'>
            <Rects data={data} isLoading={isLoading} />
            {!isLoading && (
              <>
                <Months data={data} />
                <Days />
              </>
            )}
          </g>
        </svg>
        <div className='w-full flex flex-row justify-between py-1 md:px-8'>
          <div
            className='text-xs'
            style={{
              color: '#9ca3af',
              visibility: hidden ? 'hidden' : 'visible',
            }}>
            <strong className='text-gray-600 dark:text-gray-200'>
              {count > 0 ? count : 'No'}{' '}
              {count === 1 ? 'contribution' : 'contributions'}
            </strong>{' '}
            on {date}
          </div>
          {!isLoading && <LessMore />}
        </div>
      </div>
    </div>
  );
};

export default Repos;
