import React, { useState } from 'react';
import styles from './Dialogs.module.css';
import helmet from '../../assets/helmet.png';
import Preloader from '../Preloader/Preloader';
import { useDarkMode } from 'usehooks-ts';

const Dialogs: React.FC = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { isDarkMode } = useDarkMode();
  return (
    <div className={`${styles.dialogs} ${isDarkMode ? styles.dialogsD : ''}`}>
      <div className={styles.comingSoon}>
        {!imgLoaded && <Preloader size='50px' />}
        <img src={helmet} alt='helmet' onLoad={() => setImgLoaded(true)} />
        <span>In developing</span>
      </div>
    </div>
  );
};

export default Dialogs;
