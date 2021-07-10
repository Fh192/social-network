import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { RootState } from '../../store/store';
import styles from './Profile.module.css';

interface MapStateProps {}
interface MapDispatchProps {}

type Props = MapStateProps &
  MapDispatchProps &
  RouteComponentProps<{ userId: string }>;

const Profile: React.FC<Props> = props => {
  console.log(props.match.params);
  return <div className={styles.profile}></div>;
};

const mapStateToProps = (state: RootState): MapStateProps => ({});

export default withRouter(connect(mapStateToProps, {})(Profile));
