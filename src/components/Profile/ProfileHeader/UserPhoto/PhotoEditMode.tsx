import React, { useCallback, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area, Point } from 'react-easy-crop/types';
import styles from './UserPhoto.module.css';

interface Props {
  userId: number | null;
  imageSrc: string | undefined;
  setPhotoEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setImageSrc: React.Dispatch<React.SetStateAction<string | undefined>>;
  updatePhoto: (image: File, userId: number) => void;
}

const PhotoEditMode: React.FC<Props> = ({
  userId,
  imageSrc,
  setPhotoEditMode,
  setImageSrc,
  updatePhoto,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [croppedArea, setCroppedArea] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedArea(croppedAreaPixels);
    },
    []
  );

  function onSave() {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = 200;
      canvas.height = 200;

      if (ctx) {
        const img = new Image(200, 200);
        const { width = 200, height = 200, x = 0, y = 0 } = croppedArea;

        if (typeof imageSrc === 'string') img.src = imageSrc;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, width, height, 0, 0, 200, 200);

        canvas.toBlob(function (blob) {
          if (blob) {
            const image = new File([blob], 'image.png', { type: 'image/png' });
            
            if (userId) updatePhoto(image, userId);
          }
        }, 'image/png');

        setPhotoEditMode(false);
      }
    }
  }

  function onClose() {
    setImageSrc(undefined);
    setPhotoEditMode(false);
  }

  return (
    <>
      <div className={styles.cropContainer}>
        <Cropper
          cropShape='round'
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
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
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </>
  );
};

export default PhotoEditMode;
