import classNames from 'classnames/bind';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from 'usehooks-ts';
import { useDispatch } from '../../hooks/useDispatch';
import { useQuery } from '../../hooks/useQuery';
import { useSelector } from '../../hooks/useSelector';
import { getUsers, setInitialState } from '../../store/reducers/usersSlice';
import { IQueryParams } from '../../types/users';
import Preloader from '../Preloader/Preloader';
import { ScrollBtn } from '../ScrollBtn/ScrollBtn';
import { FilterUsers } from './FilterUsers/FilterUsers';
import { User } from './User/User';
import styles from './Users.module.css';

const Users: React.FC = () => {
  const cx = classNames.bind(styles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let query = useQuery();

  const { totalCount, users } = useSelector(s => s.users);
  const { isDarkMode } = useDarkMode();
  const [fetching, setFetching] = useState(false);
  const [queryParams, setQueryParams] = useState<IQueryParams>({
    count: 40,
    page: Number(query.get('page')) || 1,
    term: query.get('term') || undefined,
    friend: !!query.get('friend') || undefined,
  });
  const pageCount = Math.ceil((totalCount ?? 1) / queryParams.count);

  const setQueryParamsToUrl = useCallback(() => {
    const { page, friend, term } = queryParams;

    const search = Object.entries({ friend, term }).reduce(
      (acc, [key, val]) => {
        if (val !== undefined) acc += `&${key}=${val}`;
        return acc;
      },
      `?page=${page}`
    );

    navigate({ search });
  }, [queryParams, navigate]);

  const resetParams = () => {
    dispatch(setInitialState());
    setQueryParams(params => ({
      ...params,
      page: 1,
      term: undefined,
      friend: undefined,
    }));
  };

  useEffect(() => {
    const el = document.scrollingElement as Element;

    const listener = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;

      if (!fetching && totalCount) {
        if (scrollTop + clientHeight >= scrollHeight - 500) {
          if (queryParams.page < pageCount) {
            setFetching(true);
            setQueryParams(params => {
              return { ...params, page: params.page + 1 };
            });
          }
        }
      }
    };

    document.addEventListener('scroll', listener);
    return () => document.removeEventListener('scroll', listener);
  }, [totalCount, fetching, pageCount, queryParams.page]);

  useEffect(() => {
    setFetching(true);

    dispatch(getUsers(queryParams)).then(() => {
      setFetching(false);
      setQueryParamsToUrl();
    });
  }, [dispatch, queryParams, setQueryParamsToUrl]);

  useEffect(() => {
    return () => {
      dispatch(setInitialState());
    };
  }, [dispatch]);

  return (
    <div className={styles.users}>
      <div className={cx({ header: true, headerD: isDarkMode })}>
        <div className={styles.usersFound}>
          <span>Users found: {totalCount?.toLocaleString()}</span>
        </div>
        <FilterUsers
          queryParams={queryParams}
          setQueryParams={setQueryParams}
          fetching={fetching}
          pageCount={pageCount}
        />
      </div>
      {totalCount === null ? (
        <div className={styles.preloader}>
          <Preloader />
        </div>
      ) : !!totalCount && !!users.length ? (
        <ul className={styles.usersList}>
          {users.map(user => (
            <User {...user} key={user.id} />
          ))}
          {fetching && (
            <div className={styles.preloader}>
              <Preloader />
            </div>
          )}
        </ul>
      ) : (
        <div className={cx({ notFound: true, notFoundD: isDarkMode })}>
          <div className={styles.text}>
            {queryParams.friend ? (
              <span>
                Friend
                <span className={styles.term}>{` "${queryParams.term}" `}</span>
                not found
              </span>
            ) : (
              <span>
                No results for
                <span className={styles.term}>{` "${queryParams.term}" `}</span>
              </span>
            )}
          </div>
          <button type="reset" onClick={resetParams}>
            Reset params
          </button>
        </div>
      )}
      <div className={styles.scrollBtn}>
        <ScrollBtn />
      </div>
    </div>
  );
};

export default Users;
