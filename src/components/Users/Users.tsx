import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsersState } from '../../selectors/usersSelector';
import { getUsers } from '../../store/reducers/usersReducer';
import Arrow from '../../svg/Arrow';
import User from './User/User';
import styles from './Users.module.css';

const Users: React.FC = () => {
  const dispatch = useDispatch();
  const pageSize = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [arrowType, setArrowType] = useState<'down' | 'up'>('down');
  const { users, totalCount } = useSelector(selectUsersState);

  const onArrowTypeChange = () => {
    setArrowType(t => {
      if (t === 'down') return 'up';
      return 'down';
    });
  };

  useEffect(() => {
    dispatch(getUsers(pageSize, currentPage));
  }, []);

  useEffect(() => {
    setFetching(false);
  }, [users.length]);

  useEffect(() => {
    const el = document.scrollingElement as Element;

    const listener = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;

      if (!fetching) {
        if (scrollTop + clientHeight >= scrollHeight - 200) {
          if (totalCount && users.length <= totalCount) {
            dispatch(getUsers(pageSize, currentPage + 1));
            setCurrentPage(p => p + 1);
            setFetching(true);
          }
        }
      }
    };

    document.addEventListener('scroll', listener);
    return () => document.removeEventListener('scroll', listener);
  }, [fetching, currentPage, totalCount, users]);

  if (totalCount === null || users.length === 0) return null;

  return (
    <div className={styles.users}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span>
            Users found:{' '}
            <span className={styles.usersCount}>
              {totalCount.toLocaleString()}
            </span>
          </span>
        </div>
        <div className={styles.filterUsers}>
          <div className={styles.filterUsersInner} onClick={onArrowTypeChange}>
            <span>Parameters</span>
            <div className={styles.arrow}>
              <Arrow size='10px' type={arrowType} />
            </div>
          </div>
        </div>
      </div>
      <ul className={styles.usersList}>
        {users.map(user => (
          <User {...user} key={user.id} />
        ))}
      </ul>
    </div>
  );
};

export default Users;
