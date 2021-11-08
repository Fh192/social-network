import classNames from 'classnames/bind';
import React from 'react';
import { useDarkMode } from 'usehooks-ts';
import styles from './Toggle.module.css';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  disabled?: boolean;
}

export const Toggle: React.FC<Props> = ({ checked, disabled, onChange }) => {
  const cx = classNames.bind(styles);
  const { isDarkMode } = useDarkMode();

  return (
    <input
      className={cx({ toggle: true, toggleD: isDarkMode })}
      type='checkbox'
      checked={checked}
      disabled={disabled}
      onChange={onChange}
    />
  );
};
