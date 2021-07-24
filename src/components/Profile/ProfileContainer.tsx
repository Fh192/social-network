import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { RootState } from '../../store/store';
import {
  getUserProfile,
  getUserStatus,
  updateStatus,
  updatePhoto,
  updateProfile,
} from '../../store/reducers/profileReducer';
import { getIsOwner, getProfile } from '../../selectors/profileSelectors';
import { IPhotos, IProfile, IProfileForUpdate } from '../../types/profile';
import Profile from './Profile';
import { IPost } from '../../types/posts';

interface MapStateProps {
  profile: IProfile;
  isOwner: boolean;
  ownerId: number | null;
  email: string;
  posts: Array<IPost>;
}

interface MapDispatchProps {
  getUserProfile: (userId: number) => void;
  getUserStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
  updatePhoto: (image: File, userId: number) => void;
  updateProfile: (
    profileFormData: IProfileForUpdate,
    userId: number | null
  ) => void;
}

export type ProfileProps = MapStateProps &
  MapDispatchProps &
  RouteComponentProps<{ userId: string }>;

const ProfileContainer: React.FC<ProfileProps> = ({
  getUserProfile,
  getUserStatus,
  ...props
}) => {
  useEffect(() => {
    if (props.match.url === '/profile/edit' && props.ownerId) {
      getUserProfile(props.ownerId);
    } else getUserProfile(+props.match.params.userId);
  }, [props.match.params.userId]);

  useEffect(() => {
    if (props.match.url === '/profile/edit' && props.ownerId) {
      getUserStatus(props.ownerId);
    } else getUserStatus(+props.match.params.userId);
  }, [props.match.params.userId]);

  return (
    <Profile
      {...props}
      getUserProfile={getUserProfile}
      getUserStatus={getUserStatus}
    />
  );
};

const mapStateToProps = (state: RootState): MapStateProps => ({
  profile: getProfile(state),
  isOwner: getIsOwner(state),
  ownerId: state.auth.id,
  email: state.auth.email,
  posts: state.posts,
});

export default withRouter(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateStatus,
    updatePhoto,
    updateProfile,
  })(ProfileContainer)
);
