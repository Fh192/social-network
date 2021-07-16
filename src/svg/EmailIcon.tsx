import React from 'react';

const EmailIcon: React.FC<{ size: string; color: string }> = ({
  size,
  color,
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M1.5 5.25L2.25 4.5H21.75L22.5 5.25V18.75L21.75 19.5H2.25L1.5 18.75V5.25ZM3 6.8025V18H21V6.804L12.465 13.35H11.55L3 6.8025ZM19.545 6H4.455L12 11.8035L19.545 6Z'
        fill={color}
      />
    </svg>
  );
};

export default EmailIcon;
