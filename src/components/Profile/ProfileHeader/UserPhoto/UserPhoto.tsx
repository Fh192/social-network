import React, { useState } from 'react';
import styles from './UserPhoto.module.css';
import userPhoto from '../../../../images/userPhoto.png';
import { IPhotos } from '../../../../types/profile';
import PhotoEditMode from './PhotoEditMode';

interface Props {
  userId: number | null;
  photos: IPhotos;
  isOwner: boolean;
  updatePhoto: (image: File, userId: number) => void;
}

const UserPhoto: React.FC<Props> = ({
  userId,
  photos,
  isOwner,
  updatePhoto,
}) => {
  const [hoverPhoto, setHoverPhoto] = useState(false);

  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [photoEditMode, setPhotoEditMode] = useState(false);

  const fileFormat = new RegExp('.png|.jpg|.jpeg');

  return (
    <>
      <div
        className={styles.avatar}
        onMouseEnter={() => isOwner && setHoverPhoto(true)}
        onMouseLeave={() => isOwner && setHoverPhoto(false)}
      >
        <>
          {hoverPhoto && (
            <div className={styles.hoverPhoto}>
              <input
                type='file'
                accept='.jpg, .jpeg, .png'
                onChange={e => {
                  if (fileFormat.test(e.target.value) && e.target.files) {
                    const fr = new FileReader();

                    fr.onload = () => {
                      if (typeof fr.result === 'string') setImageSrc(fr.result);
                    };

                    fr.readAsDataURL(e.target.files[0]);

                    setPhotoEditMode(true);
                    setHoverPhoto(false);
                  }
                }}
              />
              Upload photo
            </div>
          )}

          <img
            src={photos.small !== null ? photos.large : userPhoto}
            alt='user avatar'
          />
        </>
      </div>
      {photoEditMode && (
        <PhotoEditMode
          userId={userId}
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          setPhotoEditMode={setPhotoEditMode}
          updatePhoto={updatePhoto}
        />
      )}
    </>
  );
};

export default UserPhoto;
