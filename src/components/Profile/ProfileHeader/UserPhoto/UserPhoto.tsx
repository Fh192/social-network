import React, { useRef, useState } from 'react';
import styles from './UserPhoto.module.css';
import userPhoto from '../../../../assets/userPhoto.png';
import { CropPhoto } from './CropPhoto';
import { useSelector } from '../../../../hooks/useSelector';
import { selectIsOwner } from '../../../../selectors/profileSelectors';
import openToWorkImg from '../../../../assets/openToWork.png';
import { CameraIcon } from '../../../../svg/CameraIcon';
import Preloader from '../../../Preloader/Preloader';
import { ViewPhoto } from '../../ViewPhoto/ViewPhoto';
import { useDarkMode, useHover, useOnClickOutside } from 'usehooks-ts';
import classNames from 'classnames/bind';

export const UserPhoto: React.FC = () => {
  const cx = classNames.bind(styles);

  const tooltipRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(hoverRef);

  const [imageSrc, setImageSrc] = useState('');
  const [photoEditMode, setPhotoEditMode] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [photoViewMode, setPhotoViewMode] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [updating, setUpdating] = useState(false);

  const { isDarkMode } = useDarkMode();
  const {
    photos: { large: photo },
    lookingForAJob,
  } = useSelector(s => s.profile);
  const isOwner = useSelector(selectIsOwner);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFormat = new RegExp('.png|.jpg|.jpeg');

    if (fileFormat.test(e.target.value) && e.target.files) {
      const fr = new FileReader();

      fr.onload = () => {
        if (typeof fr.result === 'string') setImageSrc(fr.result);
      };

      fr.readAsDataURL(e.target.files[0]);

      setPhotoEditMode(true);
    }
  };

  const handleClickOnAvatar = () => {
    if (photo) {
      if (!isOwner) {
        setPhotoViewMode(true);
      } else {
        setTooltipVisible(v => !v);
      }
    }
  };

  const handleViewPhotoSelected = () => {
    setPhotoViewMode(true);
    setTooltipVisible(false);
  };

  useOnClickOutside(tooltipRef, () => {
    setTooltipVisible(false);
  });

  return (
    <>
      <div
        className={styles.avatar}
        style={{ cursor: photo ? 'pointer' : 'default' }}
        ref={hoverRef}
      >
        {isHover && isOwner && (
          <div className={styles.hoverPhoto} onClick={handleClickOnAvatar}>
            <CameraIcon size='50px' />
          </div>
        )}

        {(!photoLoaded || updating) && (
          <div className={styles.preloader}>
            <Preloader />
          </div>
        )}
        <div className={styles.inner} onClick={handleClickOnAvatar}>
          <img
            className={styles.photo}
            src={photo || userPhoto}
            alt='user avatar'
            onLoad={() => setPhotoLoaded(true)}
          />

          {lookingForAJob && (
            <div className={styles.lookingForAJob}>
              <img src={openToWorkImg} alt='looking for a job' />
            </div>
          )}
        </div>
        {tooltipVisible && (
          <div
            className={cx({ tooltip: true, tooltipD: isDarkMode })}
            ref={tooltipRef}
          >
            <span className={styles.uploadPhoto}>
              <label htmlFor='uploadPhoto'>Upload photo</label>
              <input
                type='file'
                accept='.jpg, .jpeg, .png'
                onChange={handleFileInput}
                id='uploadPhoto'
                hidden
              />
            </span>
            <span onClick={handleViewPhotoSelected}>View photo</span>
          </div>
        )}
      </div>

      {photoViewMode && <ViewPhoto setPhotoViewMode={setPhotoViewMode} />}
      {photoEditMode && (
        <CropPhoto
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          setPhotoEditMode={setPhotoEditMode}
          setUpdating={setUpdating}
        />
      )}
    </>
  );
};
