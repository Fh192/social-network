import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from '../../hooks/useDispatch';
import { useSelector } from '../../hooks/useSelector';
import { getUsers, setInitialState } from '../../store/reducers/usersSlice';
import { IQueryParams } from '../../types/users';
import Preloader from '../Preloader/Preloader';
import { FilterUsers } from './FilterUsers/FilterUsers';
import { User } from './User/User';
import { useNavigate } from 'react-router-dom';
import styles from './Users.module.css';
import { useQuery } from '../../hooks/useQuery';
import { useDarkMode } from 'usehooks-ts';
import { ScrollBtn } from '../ScrollBtn/ScrollBtn';
import classNames from 'classnames/bind';

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
  const pageCount = Math.ceil(totalCount || 1 / queryParams.count);

  const setQueryParamsToUrl = useCallback(() => {
    const { page, friend, term } = queryParams;

    const search = Object.entries({ friend, term }).reduce(
      (acc, [key, val]) => {
        if (val !== undefined) {
          return `${acc}&${key}=${val}`;
        }
        return acc;
      },
      `?page=${page}`
    );
    navigate({ search });
  }, [queryParams, navigate]);

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
        />
      </div>
      {totalCount ? (
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
      ) : (!totalCount || !users.length) && !fetching ? (
        <div className={cx({ notFound: true, notFoundD: isDarkMode })}>
          <div className={styles.notFoundText}>
            {queryParams.friend ? (
              <>
                <span>Friend</span>
                <span className={styles.term}>"{queryParams.term}"</span>
                <span>on page {queryParams.page}</span>
                <span>not found.</span>
              </>
            ) : (
              <>
                <span>No results for</span>
                <span className={styles.term}>"{queryParams.term}"</span>
                <span>on page {queryParams.page}.</span>
              </>
            )}
          </div>
        </div>
      ) : (
        <Preloader />
      )}
      <ScrollBtn />
    </div>
  );
};

export default Users;
