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
import { IPhotos, IProfile, IProfileFormData } from '../../types/profile';
import Profile from './Profile';

interface MapStateProps {
  profile: IProfile;
  userId: number | null;
  username: string;
  photos: IPhotos;
  isOwner: boolean;
  email: string;
}

interface MapDispatchProps {
  getUserProfile: (userId: number) => void;
  getUserStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
  updatePhoto: (image: File, userId: number) => void;
  updateProfile: (
    profileFormData: IProfileFormData,
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
    getUserProfile(+props.match.params.userId);
  }, [props.match.params.userId]);

  useEffect(() => {
    getUserStatus(+props.match.params.userId);
  }, [props.match.params.userId]);

  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Profile
      {...props}
      getUserProfile={getUserProfile}
      getUserStatus={getUserStatus}
    />
  );
};

const mapStateToProps = (state: RootState): MapStateProps => ({
  profile: state.profile,
  userId: state.profile.userId,
  username: state.profile.fullName,
  photos: state.profile.photos,
  isOwner: state.profile.userId === state.auth.id,
  email: state.auth.email,
});

export default withRouter(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateStatus,
    updatePhoto,
    updateProfile,
    //@ts-ignore
  })(ProfileContainer)
);
