import React from 'react';
import { useDarkMode } from 'usehooks-ts';
import styles from './ToggleTheme.module.css';

export const ToggleTheme: React.FC = () => {
  const { isDarkMode, toggle } = useDarkMode();

  return (
    <div
      className={`${isDarkMode ? styles.toggleThemeD : styles.toggleTheme}`}
      onClick={toggle}
    >
      {isDarkMode ? (
        <svg width='30px' fill='#fff' viewBox='0 0 24 24'>
          <path d='M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z'></path>
        </svg>
      ) : (
        <svg width='30px' fill='#0D1117' viewBox='0 0 24 24'>
          <path d='M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z'></path>
        </svg>
      )}
    </div>
  );
};
