type LoadingWeeks = {
  days: Array<LoadingDays>;
};

type LoadingDays = {
  count: number;
  level: string;
  date: string;
};

const getLevel = (level: string): string => {
  switch (level) {
    case 'NONE':
      return '0';
    case 'FIRST_QUARTILE':
      return '1';
    case 'SECOND_QUARTILE':
      return '2';
    case 'THIRD_QUARTILE':
      return '3';
    case 'FOURTH_QUARTILE':
      return '4';
    default:
      return '-1';
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
    className={level === 'loading' ? 'animate-pulse' : undefined}
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

const Rects: React.FC<{ data?: GraphData; isLoading: boolean }> = ({
  data,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <>
        {Array<LoadingWeeks>(53)
          .fill({
            days: Array<LoadingDays>(7).fill({
              count: -1,
              level: 'loading',
              date: 'loading',
            }),
          })
          .map((week, i: number) => (
            <G key={i} i={i}>
              {week.days.map((day, j: number) => (
                <Rect
                  key={j}
                  i={i}
                  j={j}
                  count={day.count}
                  level={day.level}
                  date={day.date}
                />
              ))}
            </G>
          ))}
      </>
    );
  }

  return (
    <>
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
    </>
  );
};

export default Rects;
