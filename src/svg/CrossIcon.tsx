import React from 'react';

export const CrossIcon: React.FC<{ size: string }> = ({ size }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 12 12'
      fill='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.70711 2.29289C10.0976 2.68342 10.0976 3.31658 9.70711 3.70711L3.70711 9.70711C3.31658 10.0976 2.68342 10.0976 2.29289 9.70711C1.90237 9.31658 1.90237 8.68342 2.29289 8.29289L8.29289 2.29289C8.68342 1.90237 9.31658 1.90237 9.70711 2.29289Z'
        fill='#99A2AD'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2.29289 2.29289C2.68342 1.90237 3.31658 1.90237 3.70711 2.29289L9.70711 8.29289C10.0976 8.68342 10.0976 9.31658 9.70711 9.70711C9.31658 10.0976 8.68342 10.0976 8.29289 9.70711L2.29289 3.70711C1.90237 3.31658 1.90237 2.68342 2.29289 2.29289Z'
        fill='#99A2AD'
      />
    </svg>
  );
};
