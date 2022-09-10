import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useDarkMode } from 'usehooks-ts';
import photoPlaceholder from '../assets/userPhoto.png';
import photoPlaceholderD from '../assets/userPhotoDark.png';

export const useUserPhoto = (userPhoto: string) => {
  const [photo, setPhoto] = useState(userPhoto);
  const [photoLoadErr, setPhotoLoadErr] = useState(false);
  const { isDarkMode } = useDarkMode();

  const photoErrorHandler = (e: BaseSyntheticEvent) => {
    e.target.onerror = null;
    setPhotoLoadErr(true);
  };

  useEffect(() => {
    if (!photoLoadErr) return undefined;
    setPhoto(isDarkMode ? photoPlaceholderD : photoPlaceholder);
  }, [photoLoadErr, isDarkMode]);

  return { photo, photoErrorHandler };
};
