import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './Users.module.css';
import { getUsers, toggleFollow } from '../../store/reducers/usersReducer';
import { setCurrentPage } from '../../store/actions/users';
import { IUser } from '../../types/users';
import User from './User/User';
import useFetchOnScroll from '../../hooks/useFetchOnScroll';

interface MapStateProps {
  users: Array<IUser>;
  totalCount: number | null;
  currentPage: number;
}
interface MapDispatchProps {
  getUsers: (
    count?: number,
    page?: number,
    term?: string,
    friend?: boolean
  ) => Promise<void>;
  toggleFollow: (userId: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
}

type Props = MapStateProps & MapDispatchProps;

const Users: React.FC<Props> = ({
  users,
  totalCount,
  currentPage,
  getUsers,
  setCurrentPage,
  ...props
}) => {
  const { fetching, setFetching } = useFetchOnScroll(false);

  useEffect(() => {
    if (fetching || users.length === 0) {
      getUsers(30, currentPage).then(() => {
        setCurrentPage(currentPage + 1);
        setFetching(false);
      });
    }
  }, [fetching]);

  return (
    <div className={styles.users}>
      <ul className={styles.usersList}>
        {users.map(user => (
          <User {...user} toggleFollow={props.toggleFollow} key={user.id} />
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state: RootState): MapStateProps => ({
  users: state.users.users,
  totalCount: state.users.totalCount,
  currentPage: state.users.currentPage,
});

export default connect(mapStateToProps, {
  getUsers,
  toggleFollow,
  setCurrentPage,
})(Users);
