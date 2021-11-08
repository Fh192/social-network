import classNames from 'classnames/bind';
import { Field } from 'formik';
import React, { useRef, useState } from 'react';
import { useDarkMode } from 'usehooks-ts';
import { icons } from '../../../../common/contactIcons';
import { IContacts } from '../../../../types/profile';
import styles from './Contact.module.css';

interface Props {
  site: keyof IContacts;
}

export const Contact: React.FC<Props> = ({ site }) => {
  const cx = classNames.bind(styles);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputShown, setInputShow] = useState(false);
  const { isDarkMode } = useDarkMode();

  const clickHandler = () => {
    setInputShow(true);
    inputRef.current?.focus();
  };
  const blurHandler = () => {
    setInputShow(false);
  };

  return (
    <li
      className={cx({
        contact: true,
        [site]: true,
        inputShown,
        contactD: isDarkMode,
      })}
      onClick={clickHandler}
    >
      <span className={styles.icon}>{icons[site]}</span>
      <Field
        onBlur={blurHandler}
        type='url'
        inputMode='url'
        innerRef={inputRef}
        name={`contacts.${site}`}
      />
      <span className={styles.site}>{site === 'vk' ? 'vkontakte' : site}</span>
    </li>
  );
};
