/* eslint-disable @next/next/no-img-element */

type ImageProps = {
  alt: string;
  src: string;
};

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  return (
    <span className='inline-block rounded-xl p-2 md:p-4 border-solid border border-gray-200 dark:border-gray-800'>
      <img className='rounded-lg' src={src} alt={alt} />
    </span>
  );
};

export default Image;
