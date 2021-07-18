import React, { useState } from 'react';
import CheckMark from '../../../../svg/CheckMark';
import LinkIcon from '../../../../svg/LinkIcon';
import { IPost } from '../../../../types/posts';
import styles from './CreatePost.module.css';
import classNames from 'classnames/bind';

interface Props {
  posts: Array<IPost>;
  username: string;
  userAvatar: string;
  setCreatePostMode: React.Dispatch<React.SetStateAction<boolean>>;
  addPost: (post: IPost) => void;
}

const CreatePost: React.FC<Props> = ({
  posts,
  username,
  userAvatar,
  setCreatePostMode,
  addPost,
}) => {
  const cx = classNames.bind(styles);

  const [newPostText, setNewPostText] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  const onImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const fr = new FileReader();

      console.log(file.size);

      fr.onload = () => {
        if (typeof fr.result === 'string') setImageSrc(fr.result);
      };

      fr.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.createPostModal}>
      <div className={styles.createPost}>
        <div
          className={styles.close}
          onClick={() => setCreatePostMode(false)}
          title='close'
        >
          <CheckMark size='25px' type='reject' />
        </div>
        <div className={styles.inner}>
          <div className={styles.userAvatar}>
            <img src={userAvatar} alt='' />
          </div>
          <div className={styles.textarea}>
            <textarea
              value={newPostText}
              onChange={e => setNewPostText(e.target.value)}
              placeholder='Post text...'
            ></textarea>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.addImage}>
            <LinkIcon size='20px' />
            {imageSrc ? (
              <div className={styles.imagePreview}>
                <img src={imageSrc} alt='' />
              </div>
            ) : (
              <button>Add image</button>
            )}
            <input type='file' accept='image/*' onChange={onImageSelect} />
          </div>
          <div
            className={cx({
              createButton: true,
              createButtonDisabled: !newPostText && !imageSrc,
            })}
            title={
              !newPostText && !imageSrc
                ? 'Write something or add image to create post'
                : ''
            }
          >
            <button
              onClick={() => {
                addPost({
                  postId: posts.length,
                  addDate: new Date().toISOString(),
                  author: { username, avatar: userAvatar },
                  text: newPostText,
                  imageSrc: imageSrc,
                  comments: [],
                  likes: 0,
                  whoLiked: [],
                });
                setCreatePostMode(false);
              }}
              disabled={!newPostText && !imageSrc}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
