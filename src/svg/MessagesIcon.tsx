import React from 'react';

const MessagesIcon: React.FC<{ size: string }> = ({ size }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 29 28'
      fill='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3.03688 13.4989C3.03688 7.83902 8.32589 3.5 14.5185 3.5C20.711 3.5 26 7.83902 26 13.4989C26 19.1589 20.711 23.4979 14.5185 23.4979C13.1453 23.4979 11.8254 23.288 10.6005 22.9013C9.15562 24.2498 7.05631 24.898 4.48829 24.9989C3.44219 25.04 2.68713 23.9519 3.12516 22.978C3.74656 21.5866 4.54946 19.9915 4.64467 18.6002C3.62784 17.1195 3.03688 15.3721 3.03688 13.4989ZM14.5185 5.5C9.13339 5.5 5.03688 9.21891 5.03688 13.4989C5.03688 15.0359 5.55151 16.4778 6.45874 17.6996C6.58676 17.872 6.65588 18.081 6.65588 18.2957C6.65588 19.9295 6.00461 21.471 5.34145 22.9339C7.39752 22.7155 8.74636 22.0571 9.55971 21.1C9.83288 20.7786 10.2784 20.6631 10.6733 20.8114C11.8455 21.2516 13.1458 21.4979 14.5185 21.4979C19.9035 21.4979 24 17.779 24 13.4989C24 9.21891 19.9035 5.5 14.5185 5.5Z'
        fill='#99A2AD'
      />
    </svg>
  );
};

export default MessagesIcon;
