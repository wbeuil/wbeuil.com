const Month: React.FC<{ i: number }> = ({ children, i }) => (
  <text x={`${14 + i}`} y='-7' style={{ fontSize: '9px', fill: '#9ca3af' }}>
    {children}
  </text>
);

const Months: React.FC<{ data?: GraphData }> = ({ data }) => {
  let sum = 0;

  return (
    <>
      {data?.graph?.viewer?.contributionsCollection?.contributionCalendar?.months?.map(
        (month, i) => {
          const el = (
            <Month key={i} i={sum}>
              {month.name}
            </Month>
          );
          sum += 13 * month.totalWeeks;
          return el;
        },
      )}
    </>
  );
};

export default Months;
