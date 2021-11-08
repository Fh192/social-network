import classNames from 'classnames/bind';
import React, { useRef, useState } from 'react';
import { useDarkMode, useOnClickOutside } from 'usehooks-ts';
import { useSelector } from '../../../hooks/useSelector';
import { CrossIcon } from '../../../svg/CrossIcon';
import Preloader from '../../Preloader/Preloader';
import styles from './ViewPhoto.module.css';

interface Props {
  setPhotoViewMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ViewPhoto: React.FC<Props> = ({ setPhotoViewMode }) => {
  const cx = classNames.bind(styles);

  const ref = useRef<HTMLDivElement>(null);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const { isDarkMode } = useDarkMode();

  const {
    fullName: username,
    photos: { large: photo },
  } = useSelector(s => s.profile);

  const close = () => {
    setPhotoViewMode(false);
  };

  useOnClickOutside(ref, close);

  return (
    <div className={cx(['viewPhotoWrap'])}>
      <div
        className={cx({ viewPhoto: true, viewPhotoD: isDarkMode })}
        ref={ref}
      >
        <div className={styles.header}>
          <div className={styles.info}>
            <span className={styles.username} title={username}>
              {`${username}'s`}&nbsp;&nbsp;
            </span>
            <span>profile photo</span>
          </div>
          <div className={styles.close} onClick={close}>
            <CrossIcon size='20px' />
          </div>
        </div>
        <div className={styles.photo}>
          <img
            src={photo}
            style={{ display: !photoLoaded ? 'none' : 'unset' }}
            alt='profile'
            onLoad={() => setPhotoLoaded(true)}
          />
          {!photoLoaded && (
            <div className={styles.preloader}>
              <Preloader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
