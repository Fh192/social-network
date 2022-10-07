import classNames from 'classnames/bind';
import React, { useRef, useState } from 'react';
import { useDarkMode, useOnClickOutside } from 'usehooks-ts';
import { getUserPhoto } from '../../../../common/getUserPhoto';
import { useDispatch } from '../../../../hooks/useDispatch';
import { useSelector } from '../../../../hooks/useSelector';
import { useUserPhoto } from '../../../../hooks/useUserPhoto';
import { createPost } from '../../../../store/reducers/postsReducer';
import { CrossIcon } from '../../../../svg/CrossIcon';
import LinkIcon from '../../../../svg/LinkIcon';
import styles from './CreatePost.module.css';

interface Props {
  setCreatePostMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePost: React.FC<Props> = ({ setCreatePostMode }) => {
  const dispatch = useDispatch();
  const cx = classNames.bind(styles);

  const ref = useRef<HTMLDivElement>(null);
  const [newPostText, setNewPostText] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const createBtnDisabled = !newPostText.trim() && !imageSrc;
  const { id: userId } = useSelector(s => s.auth);
  const { isDarkMode } = useDarkMode();
  const { photo, photoErrorHandler } = useUserPhoto(
    getUserPhoto(userId as number)
  );

  const onImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const fr = new FileReader();

      fr.onload = () => {
        if (typeof fr.result === 'string') {
          setImageSrc(fr.result);
        }
      };

      fr.readAsDataURL(file);
    }
  };

  const onAddPost = () => {
    dispatch(createPost(newPostText, imageSrc));
    setCreatePostMode(false);
  };

  useOnClickOutside(ref, () => setCreatePostMode(false));

  return (
    <div className={styles.createPostModal}>
      <div
        className={cx({ createPost: true, createPostD: isDarkMode })}
        ref={ref}
      >
        <div className={styles.header}>
          <div
            className={styles.close}
            onClick={() => setCreatePostMode(false)}
          >
            <CrossIcon size="20px" />
          </div>
        </div>

        <div className={styles.inner}>
          <div className={styles.userAvatar}>
            <img src={photo} alt="avatar" onError={photoErrorHandler} />
          </div>
          <div className={styles.textarea}>
            <textarea
              value={newPostText}
              onChange={e => setNewPostText(e.target.value)}
              placeholder="Post text..."
            ></textarea>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.addImage}>
            <LinkIcon size="20px" color={isDarkMode ? '#99a2ad' : ''} />
            {imageSrc ? (
              <div className={styles.imagePreview}>
                <img src={imageSrc} alt="" />
              </div>
            ) : (
              <button>Add image</button>
            )}
            <input type="file" accept="image/*" onChange={onImageSelect} />
          </div>
          <div
            className={cx({
              createButton: true,
              createButtonDisabled: createBtnDisabled,
            })}
            title={
              createBtnDisabled
                ? 'Write something or add image to create post'
                : ''
            }
          >
            <button onClick={onAddPost} disabled={createBtnDisabled}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
