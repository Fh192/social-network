import classNames from 'classnames/bind';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDarkMode, useOnClickOutside } from 'usehooks-ts';
import { setInitialState } from '../../../store/reducers/usersSlice';
import Arrow from '../../../svg/Arrow';
import { CrossIcon } from '../../../svg/CrossIcon';
import MagnifierIcon from '../../../svg/MagnifierIcon';
import { IQueryParams } from '../../../types/users';
import { Toggle } from '../../Toggle/Toggle';
import styles from './FilterUsers.module.css';

interface Props {
  fetching: boolean;
  queryParams: IQueryParams;
  pageCount: number;
  setQueryParams: React.Dispatch<React.SetStateAction<IQueryParams>>;
}

export const FilterUsers: React.FC<Props> = ({
  fetching,
  queryParams,
  pageCount,
  setQueryParams,
}) => {
  const dispatch = useDispatch();
  const cx = classNames.bind(styles);

  const ref = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useDarkMode();
  const [arrowType, setArrowType] = useState<'down' | 'up'>('down');
  const [onlyFriends, setOnlyFriends] = useState(queryParams.friend === true);
  const [hideFriends, setHideFriends] = useState(queryParams.friend === false);
  const [term, setTerm] = useState(queryParams.term || '');
  const [page, setPage] = useState(queryParams.page);

  const toggleArrowType = () => {
    setArrowType(type => (type === 'down' ? 'up' : 'down'));
  };

  const submitTerm = useCallback(() => {
    setQueryParams(params => {
      if (!!term.trim() && term.trim() !== params.term) {
        dispatch(setInitialState());
        return { ...params, term, page: 1 };
      }
      return params;
    });
  }, [term, setQueryParams, dispatch]);

  const termSubmitHandler = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e || e.key === 'Enter') {
      submitTerm();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      submitTerm();
      clearTimeout(timer);
    }, 1000);

    return () => clearTimeout(timer);
  }, [submitTerm]);

  const toggleHideFriends = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onlyFriends) setOnlyFriends(false);
    setHideFriends(e.currentTarget.checked);
  };

  const toggleOnlyFriends = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hideFriends) setHideFriends(false);
    setOnlyFriends(e.currentTarget.checked);
  };

  const pageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = +e.target.value;
    if (val <= pageCount) {
      setPage(val);
    }
  };

  useEffect(() => {
    const wheelListener = (e: WheelEvent) => {
      if (e.deltaY > 0) setArrowType('down');
    };

    document.addEventListener('wheel', wheelListener);
    return () => document.removeEventListener('wheel', wheelListener);
  }, []);

  useEffect(() => {
    const friend = onlyFriends ? true : hideFriends ? false : undefined;

    setQueryParams(params => {
      if (friend !== params.friend) {
        dispatch(setInitialState());
        return { ...params, friend, term: term || undefined, page: 1 };
      }
      return params;
    });
  }, [onlyFriends, hideFriends, term, dispatch, setQueryParams]);

  const clearTerm = () => {
    setTerm('');
    setQueryParams(p => {
      if (p.term !== undefined) {
        dispatch(setInitialState());
        return { ...p, term: undefined, page: 1 };
      }
      return p;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setQueryParams(params => {
        if (page !== params.page) {
          if (params.page === 1 && page < 1) {
            setPage(1);
          } else {
            dispatch(setInitialState());
            if (page <= 0) {
              setPage(1);
              return { ...params, page: 1 };
            } else {
              return { ...params, page };
            }
          }
        }
        return params;
      });
      clearTimeout(timer);
    }, 1000);

    return () => clearTimeout(timer);
  }, [page, setQueryParams, dispatch]);

  useEffect(() => {
    setPage(queryParams.page);
  }, [queryParams.page]);

  useOnClickOutside(ref, () => {
    setArrowType('down');
  });

  return (
    <div className={styles.filterUsers} ref={ref}>
      <div className={styles.title} onClick={toggleArrowType}>
        <span>Parameters</span>
        <div className={cx({ arrow: true, arrowD: isDarkMode })}>
          <Arrow size='10px' type={arrowType} color='#8ea6f4' />
        </div>
      </div>
      <div
        className={cx({
          popup: true,
          popupD: isDarkMode,
          showPopup: arrowType === 'up',
        })}
      >
        <div className={styles.term}>
          <div className={styles.magnifier} onClick={() => termSubmitHandler()}>
            <MagnifierIcon size='15px' />
          </div>
          <input
            type='text'
            id='term'
            placeholder='Search'
            autoComplete='off'
            value={term}
            disabled={fetching}
            onChange={e => setTerm(e.currentTarget.value)}
            onKeyDown={termSubmitHandler}
          />

          <div
            className={cx({ clearTerm: true, clearTermVisible: !!term.trim() })}
            onClick={clearTerm}
          >
            <CrossIcon size='15px' />
          </div>
        </div>
        <div className={styles.toggles}>
          <label>
            <Toggle
              onChange={toggleOnlyFriends}
              checked={onlyFriends}
              disabled={fetching}
            />
            <span>Only friends</span>
          </label>
          <label>
            <Toggle
              onChange={toggleHideFriends}
              checked={hideFriends}
              disabled={fetching}
            />
            <span>Hide friends</span>
          </label>
        </div>
        <div className={styles.page}>
          <input
            type='text'
            inputMode='numeric'
            id='page'
            value={page}
            autoComplete='off'
            onChange={pageChangeHandler}
          />
          <label htmlFor='page'>
            Page <sup className={styles.maxPage}>max: {pageCount}</sup>
          </label>
        </div>
      </div>
    </div>
  );
};
