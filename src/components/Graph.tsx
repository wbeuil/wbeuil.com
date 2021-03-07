import { useState } from 'react';
import useSWR from 'swr';

import fetcher from 'utils/fetcher';

const Days: React.FC = () => (
  <>
    <text dx='-10' dy='22' style={{ fontSize: '9px', fill: '#9ca3af' }}>
      Mon
    </text>
    <text dx='-10' dy='48' style={{ fontSize: '9px', fill: '#9ca3af' }}>
      Wed
    </text>
    <text dx='-10' dy='73' style={{ fontSize: '9px', fill: '#9ca3af' }}>
      Fri
    </text>
  </>
);

const LessMore: React.FC = () => (
  <div
    className='flex flex-row items-center text-xs'
    style={{ color: '#9ca3af' }}>
    <span className='mr-1'>Less</span>
    <svg width='62' height='10'>
      <rect width='10' height='10' x='0' y='0' rx='2' ry='2' data-level='0' />
      <rect width='10' height='10' x='13' y='0' rx='2' ry='2' data-level='1' />
      <rect width='10' height='10' x='26' y='0' rx='2' ry='2' data-level='2' />
      <rect width='10' height='10' x='39' y='0' rx='2' ry='2' data-level='3' />
      <rect width='10' height='10' x='52' y='0' rx='2' ry='2' data-level='4' />
    </svg>
    <span className='ml-1'>More</span>
  </div>
);

const getLevel = (level: string): string => {
  switch (level) {
    case 'FIRST_QUARTILE':
      return '1';
    case 'SECOND_QUARTILE':
      return '2';
    case 'THIRD_QUARTILE':
      return '3';
    case 'FOURTH_QUARTILE':
      return '4';
    default:
      return '0';
  }
};

const G: React.FC<{ i: number }> = ({ children, i }) => (
  <g transform={`translate(${i * 14}, 0)`}>{children}</g>
);

const Rect: React.FC<{
  i: number;
  j: number;
  count: number;
  level: string;
  date: string;
}> = ({ i, j, count, level, date }) => (
  <rect
    width='10'
    height='10'
    x={`${14 - i}`}
    y={`${j * 13}`}
    rx='2'
    ry='2'
    data-count={count}
    data-level={getLevel(level)}
    data-date={date}
  />
);

const Month: React.FC<{ i: number }> = ({ children, i }) => (
  <text x={`${14 + i}`} y='-7' style={{ fontSize: '9px', fill: '#9ca3af' }}>
    {children}
  </text>
);

const Repos: React.FC = () => {
  const { data } = useSWR<GraphData>('/api/github/graph', fetcher);
  const [hidden, setHidden] = useState(true);
  const [count, setCount] = useState(0);
  const [date, setDate] = useState('');

  let sum = 0;
  const months: Array<JSX.Element> = [];
  data?.graph?.viewer?.contributionsCollection?.contributionCalendar?.months?.forEach(
    (month, i: number) => {
      months.push(
        <Month key={i} i={sum}>
          {month.name}
        </Month>,
      );
      sum += 13 * month.totalWeeks;
    },
  );

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
            {data?.graph?.viewer?.contributionsCollection?.contributionCalendar?.weeks?.map(
              (week, i: number) => (
                <G key={i} i={i}>
                  {week?.contributionDays?.map((day, j: number) => (
                    <Rect
                      key={j}
                      i={i}
                      j={day.weekday}
                      count={day.contributionCount}
                      level={day.contributionLevel}
                      date={day.date}
                    />
                  ))}
                </G>
              ),
            )}
            {months}
            <Days />
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
          <LessMore />
        </div>
      </div>
    </div>
  );
};

export default Repos;
