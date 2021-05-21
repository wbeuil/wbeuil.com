type DivisionProps = {
  className: string;
};

const Division: React.FC<DivisionProps> | React.ReactNode = (props) => {
  const isRemarkHighlight = props.className === 'remark-highlight';

  if (isRemarkHighlight) {
    return props.children;
  }

  return <div {...props} />;
};

export default Division;
