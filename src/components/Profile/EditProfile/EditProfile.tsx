import React, { useEffect, useState } from 'react';
import { useDispatch } from '../../../hooks/useDispatch';
import { useSelector } from '../../../hooks/useSelector';
import {
  getUserProfile,
  updateProfile,
} from '../../../store/reducers/profileReducer';
import { IContacts } from '../../../types/profile';
import { Contact } from './Contact/Contact';
import styles from './EditProfile.module.css';
import { Formik, Field, Form } from 'formik';
import Preloader from '../../Preloader/Preloader';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDarkMode } from 'usehooks-ts';

const EditProfile: React.FC = () => {
  const cx = classNames.bind(styles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const { isDarkMode } = useDarkMode();
  const userId = useSelector(s => s.auth.id);
  const {
    fullName,
    lookingForAJob,
    lookingForAJobDescription,
    aboutMe,
    contacts,
    userId: profileId,
  } = useSelector(s => s.profile);

  const contactsAsArr = Object.entries(contacts).map(c => {
    return [c[0], c[1] || ''];
  }) as Array<[keyof IContacts, string]>;

  const initialFormValues = {
    lookingForAJob,
    lookingForAJobDescription: lookingForAJobDescription || '',
    fullName,
    aboutMe: aboutMe || '',
    contacts: Object.fromEntries(contactsAsArr) as {
      [k in keyof IContacts]: string;
    },
  };

  type IFormValues = typeof initialFormValues;

  const submitHandler = async (values: IFormValues) => {
    const hasChanges =
      JSON.stringify(initialFormValues) !== JSON.stringify(values);

    if (hasChanges) {
      setSubmitting(true);
      await dispatch(updateProfile(values));
      await dispatch(getUserProfile(userId as number));
      setSubmitting(false);
    }
    navigate(`/profile/${userId}`);
  };

  useEffect(() => {
    if (userId && userId !== profileId) {
      dispatch(getUserProfile(userId));
    }
  }, [dispatch, userId, profileId]);

  if (profileId !== userId) {
    return <Preloader color={isDarkMode ? '#8ea6f4' : undefined} />;
  }

  return (
    <div className={cx({ editProfile: true, editProfileD: isDarkMode })}>
      <h2 className={styles.title}>Basic Information</h2>
      <Formik onSubmit={submitHandler} initialValues={initialFormValues}>
        {({ values, errors, setFieldValue, initialValues }) => (
          <Form>
            <div className={styles.basicInformation}>
              <div className={styles.row}>
                <fieldset className={styles.username}>
                  <legend>
                    Username<sup>*</sup>
                  </legend>
                  <Field type='text' name='fullName' required={true} />
                </fieldset>
                <fieldset className={styles.about}>
                  <legend>About</legend>
                  <Field type='text' name='aboutMe' />
                </fieldset>
              </div>
              <div className={`${styles.row} ${styles.job}`}>
                <div
                  className={styles.lookingForAJob}
                  onClick={() =>
                    setFieldValue('lookingForAJob', !values.lookingForAJob)
                  }
                >
                  <span
                    style={{
                      color: values.lookingForAJob ? '#446f31' : '#9a0000',
                    }}
                  >
                    {values.lookingForAJob
                      ? 'Looking for a job'
                      : 'Not looking for a job'}
                  </span>
                </div>
                <div className={styles.lookingForAJobDescription}>
                  <Field
                    as='textarea'
                    wrap='hard'
                    name='lookingForAJobDescription'
                    placeholder='Describe your skills, work experience...'
                  />
                </div>
              </div>
            </div>

            <div className={styles.contacts}>
              <h2 className={styles.title}>Contacts</h2>
              <ul className={styles.contactsList}>
                {contactsAsArr.map(contact => (
                  <Contact site={contact[0]} key={contact[0]} />
                ))}
              </ul>
            </div>
            <div className={styles.buttons}>
              <button type='submit' disabled={submitting}>
                {submitting ? <Preloader size='20px' /> : 'Save'}
              </button>
              <button
                type='reset'
                onClick={() => {
                  if (values === initialValues) {
                    navigate(`/profile/${userId}`);
                  }
                }}
                disabled={submitting}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfile;
