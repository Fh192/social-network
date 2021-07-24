import React, { useState } from 'react';
import styles from './EditProfile.module.css';
import { Formik, Form, Field } from 'formik';
import classNames from 'classnames/bind';
import FacebookIcon from '../../../svg/FacebookIcon';
import VkIcon from '../../../svg/VkIcon';
import InstagramIcon from '../../../svg/InstagramIcon';
import WebsiteIcon from '../../../svg/WebsiteIcon';
import TwitterIcon from '../../../svg/TwitterIcon';
import YoutubeIcon from '../../../svg/YoutubeIcon';
import GitHubIcon from '../../../svg/GitHubIcon';
import { IProfile, IProfileForUpdate } from '../../../types/profile';

interface Values {
  facebook: string | null;
  github: string | null;
  instagram: string | null;
  mainLink: string | null;
  twitter: string | null;
  vk: string | null;
  website: string | null;
  youtube: string | null;
}
interface Props {
  profile: IProfile;
  updateProfile: (
    profileFormData: IProfileForUpdate,
    userId: number | null
  ) => void;
}
type Icons = { [key: string]: JSX.Element };
type IContact = [string, string | null];
type BtnText = 'Save changes' | 'Saved!' | 'No changes yet';

const EditProfileForm: React.FC<Props> = ({
  updateProfile,
  profile,
  ...props
}) => {
  const cx = classNames.bind(styles);

  const [btnText, setBtnText] = useState<BtnText>('Save changes');
  const [btnDisabled, setBtnDisabled] = useState(false);

  const contacts = profile.contacts;

  const icons: Icons = {
    vk: <VkIcon size='20' />,
    facebook: <FacebookIcon size='20' />,
    website: <WebsiteIcon size='20' />,
    twitter: <TwitterIcon size='20' />,
    instagram: <InstagramIcon size='20' />,
    youtube: <YoutubeIcon size='20' />,
    github: <GitHubIcon size='20' />,
  };

  const formValues = {
    vk: contacts.vk || '',
    facebook: contacts.facebook || '',
    website: contacts.website || '',
    twitter: contacts.twitter || '',
    instagram: contacts.instagram || '',
    youtube: contacts.youtube || '',
    github: contacts.github || '',
    mainLink: '',
  };

  const buildContactLink = (contact: IContact) => {
    let link = contact[1] || null;

    if (link) {
      if (!link.includes(contact[0])) return null;

      link = link.trim();

      if (!link.includes('.com') && contact[0] !== 'website') {
        link = link.replaceAll('.', '');
        const index = link.indexOf(contact[0]) + contact[0].length - 1;
        link = link.replace(link[index], `${link[index]}.com`);
      }

      if (!link.includes('https://') && !link.includes('http://')) {
        if (link.includes('://')) {
          for (let i = link.indexOf('://') + 2; i >= 0; i--) {
            link = link.replace(link[i], '');
          }
        }

        link = `https://${link}`;
      }
    }

    return link;
  };

  const onFormSubmit = (values: Values) => {
    const requestObj: IProfileForUpdate = {
      aboutMe: profile.aboutMe,
      contacts: {
        ...contacts,
        ...Object.fromEntries(
          Object.entries(values).map(contact => {
            return [contact[0], buildContactLink(contact)];
          })
        ),
      },
      fullName: profile.fullName,
      lookingForAJob: profile.lookingForAJob,
      lookingForAJobDescription: profile.lookingForAJobDescription,
    };

    if (
      JSON.stringify(requestObj.contacts) !== JSON.stringify(profile.contacts)
    ) {
      updateProfile(requestObj, profile.userId);
      setBtnText('Saved!');
      setBtnDisabled(true);
      const timer = setTimeout(() => {
        setBtnDisabled(false);
        setBtnText('Save changes');
        clearTimeout(timer);
      }, 1000);
    } else {
      setBtnText('No changes yet');
      const timer = setTimeout(() => {
        setBtnText('Save changes');
        clearTimeout(timer);
      }, 1000);
    }
  };

  return (
    <div className={styles.form}>
      <Formik initialValues={formValues} onSubmit={onFormSubmit}>
        {({ errors }) => (
          <Form>
            <div className={styles.title}>Contacts</div>
            <ul className={styles.contacts}>
              {Object.entries(contacts).map(contact => {
                if (contact[0] !== 'mainLink') {
                  return (
                    <li className={styles.contact} key={contact[0]}>
                      <a
                        href={contact[1]}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <div className={styles.icon}>{icons[contact[0]]} </div>
                      </a>
                      <Field
                        className={styles.field}
                        name={contact[0]}
                        placeholder={contact[0]}
                      />
                    </li>
                  );
                } else return null;
              })}
            </ul>
            <div className={styles.submitBtn}>
              <button
                className={cx({
                  save: !Object.entries(errors).length,
                  error: Object.entries(errors).length,
                })}
                disabled={btnDisabled}
                type='submit'
              >
                {btnText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfileForm;
