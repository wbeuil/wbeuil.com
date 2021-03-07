import { animated } from 'react-spring';

import useBoop from 'hooks/useBoop';

import type { UseBoopProps } from 'hooks/useBoop';

type BoopProps = React.PropsWithChildren<
  {
    style?: React.CSSProperties;
  } & UseBoopProps
>;

const Boop: React.FC<BoopProps> = ({
  children,
  style: customStyle,
  ...boopConfig
}) => {
  const [style, trigger] = useBoop(boopConfig);
  return (
    <animated.span
      className='focus:outline-none'
      onMouseEnter={() => trigger(true)}
      onMouseLeave={boopConfig.fix ? () => trigger(false) : undefined}
      style={{ ...style, ...customStyle }}>
      {children}
    </animated.span>
  );
};

export default Boop;
