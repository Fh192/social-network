import React from 'react';

export type ArrowType = 'up' | 'down';

const Arrow: React.FC<{ size: string; type: ArrowType; color?: string }> = ({
  size,
  type,
  color = '#0d1117',
}) => {
  let styles = { transition: 'all 0.2s ease', transform: 'rotateX(0deg)' };

  if (type === 'up') {
    styles = { ...styles, transform: 'rotateX(180deg)' };
  }

  return (
    <svg
      style={styles}
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      version='1.1'
      width={size}
      height={size}
      viewBox='0 0 451.847 451.847'
      xmlSpace='preserve'
    >
      <g>
        <path
          fill={color}
          d='M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751   c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0   c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z'
        />
      </g>
    </svg>
  );
};

export default Arrow;
