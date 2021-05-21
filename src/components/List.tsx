type ListProps = {
  type: string;
};

const List: React.FC<ListProps> = ({ type, ...props }) => {
  let classes;
  const Component = type as React.ElementType;

  switch (type) {
    case 'ol':
      classes = 'ordered';
      break;
    case 'ul':
      classes = 'unordered';
      break;
    default:
      break;
  }

  return <Component className={`${classes} my-5`} {...props} />;
};

export default List;
