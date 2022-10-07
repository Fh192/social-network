import classNames from 'classnames/bind';
import React, { useCallback, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area, Point } from 'react-easy-crop/types';
import { useDarkMode, useOnClickOutside } from 'usehooks-ts';
import { useDispatch } from '../../../../hooks/useDispatch';
import { createPost } from '../../../../store/reducers/postsReducer';
import { updatePhoto } from '../../../../store/reducers/profileReducer';
import { CrossIcon } from '../../../../svg/CrossIcon';
import styles from './UserPhoto.module.css';

interface Props {
  imageSrc: string;
  setPhotoEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setImageSrc: React.Dispatch<React.SetStateAction<string>>;
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CropPhoto: React.FC<Props> = ({
  imageSrc,
  setPhotoEditMode,
  setImageSrc,
  setUpdating,
}) => {
  const dispatch = useDispatch();
  const cx = classNames.bind(styles);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cropContainerRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useDarkMode();

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const onSave = () => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const { width, height, x, y } = croppedArea;

    canvas.width = width;
    canvas.height = height;

    const img = new Image();

    img.src = imageSrc;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

    canvas.toBlob(blob => {
      if (blob) {
        const image = new File([blob], 'image.png', { type: 'image/png' });
        const fr = new FileReader();

        fr.onload = () => {
          if (typeof fr.result === 'string') {
            setUpdating(true);
            dispatch(updatePhoto(image)).then(() => setUpdating(false));
            dispatch(createPost('Update photo', fr.result));
          }
        };

        fr.readAsDataURL(blob);
      }
    }, 'image/png');

    setPhotoEditMode(false);
  };

  const onClose = () => {
    setImageSrc('');
    setPhotoEditMode(false);
  };

  useOnClickOutside(cropContainerRef, onClose);

  return (
    <div className={styles.cropPhotoWrap}>
      <div
        className={cx({ cropPhoto: true, cropPhotoD: isDarkMode })}
        ref={cropContainerRef}
      >
        <div className={styles.header}>
          <div className={styles.title}>
            <span>Your profile photo</span>
          </div>
          <div className={styles.close} onClick={onClose}>
            <CrossIcon size="20px" />
          </div>
        </div>
        <div className={styles.cropContainer}>
          <Cropper
            cropShape="round"
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            objectFit="contain"
          />
        </div>

        <div className={styles.cropperControls}>
          <button className={styles.saveButton} onClick={onSave}>
            Save
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
    </div>
  );
};
