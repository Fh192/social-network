import React, { useEffect, useRef, useState } from 'react';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import MagnifierIcon from '../../../svg/MagnifierIcon';
import styles from './FilterUsers.module.css';

interface Props {
  searchValue: undefined | string;
  onlyFriends: boolean;
  hideFriends: boolean;
  setSearchValue: React.Dispatch<React.SetStateAction<undefined | string>>;
  setIsFriend: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setArrowType: React.Dispatch<React.SetStateAction<'down' | 'up'>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setOnlyFriends: React.Dispatch<React.SetStateAction<boolean>>;
  setHideFriends: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterUsers: React.FC<Props> = ({
  searchValue,
  onlyFriends,
  hideFriends,
  setSearchValue,
  setIsFriend,
  setArrowType,
  setCurrentPage,
  setOnlyFriends,
  setHideFriends,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [term, setTerm] = useState(searchValue || '');

  useOnClickOutside(ref, () => {
    setArrowType('down');
  });

  const onFriendsCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    const id = (e.target.id as 'hideFriends') || 'onlyFriends';

    if (hideFriends) {
      setHideFriends(false);
    } else if (onlyFriends) {
      setOnlyFriends(false);
    }

    if (id === 'hideFriends') {
      setHideFriends(checked);
    } else if (id === 'onlyFriends') {
      setOnlyFriends(checked);
    }
  };

  const onSearchInputSubmit = (e?: React.KeyboardEvent<HTMLDivElement>) => {
    if (e) {
      if (e.key === 'Enter') setSearchValue(term);
    } else setSearchValue(term);
  };

  useEffect(() => {
    if (onlyFriends) {
      setIsFriend(true);
    } else if (hideFriends) {
      setIsFriend(false);
    } else {
      setIsFriend(undefined);
    }

    setCurrentPage(1);
  }, [onlyFriends, hideFriends]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (term.length === 0) setSearchValue(undefined);
      clearTimeout(delay);
    }, 1000);

    return () => clearTimeout(delay);
  }, [term]);

  return (
    <div className={styles.searchFilter} ref={ref}>
      <div className={styles.inputWrap}>
        <input
          type='text'
          placeholder='Search...'
          autoComplete='off'
          value={term}
          onChange={e => setTerm(e.currentTarget.value)}
          onKeyDown={onSearchInputSubmit}
        />
        <div className={styles.magnifier} onClick={() => onSearchInputSubmit()}>
          <MagnifierIcon size='15px' />
        </div>
      </div>
      <ul className={styles.checkboxes}>
        <li className={styles.checkbox}>
          <input
            type='checkbox'
            id='onlyFriends'
            checked={onlyFriends}
            onChange={onFriendsCheckboxChange}
          />
          <label htmlFor='onlyFriends'>Only friends</label>
        </li>

        <li className={styles.checkbox}>
          <input
            type='checkbox'
            id='hideFriends'
            checked={hideFriends}
            onChange={onFriendsCheckboxChange}
          />
          <label htmlFor='hideFriends'>Hide friends</label>
        </li>
      </ul>
    </div>
  );
};

export default FilterUsers;
