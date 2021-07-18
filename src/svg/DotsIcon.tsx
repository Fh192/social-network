import React from 'react';

const DotsIcon: React.FC<{ size: string }> = ({ size }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      version='1.1'
      viewBox='0 0 426.667 426.667'
      xmlSpace='preserve'
      width={size}
      height={size}
    >
      <circle cx='42.667' cy='213.333' r='42.667' />
      <circle cx='213.333' cy='213.333' r='42.667' />
      <circle cx='384' cy='213.333' r='42.667' />
    </svg>
  );
};

export default DotsIcon;
