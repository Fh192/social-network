import React from 'react';
import Arrow from '../../../svg/Arrow';
import EmailIcon from '../../../svg/EmailIcon';
import FacebookIcon from '../../../svg/FacebookIcon';
import GitHubIcon from '../../../svg/GitHubIcon';
import InfoIcon from '../../../svg/InfoIcon';
import InstagramIcon from '../../../svg/InstagramIcon';
import LinkIcon from '../../../svg/LinkIcon';
import TwitterIcon from '../../../svg/TwitterIcon';
import VkIcon from '../../../svg/VkIcon';
import WebsiteIcon from '../../../svg/WebsiteIcon';
import YoutubeIcon from '../../../svg/YoutubeIcon';
import { IContacts } from '../../../types/profile';
import styles from './About.module.css';
import classNames from 'classnames/bind';
import NoDataIcon from '../../../svg/NoDataIcon';
import { IPost } from '../../../types/posts';

interface Props {
  aboutMe: string | null;
  contacts: IContacts;
  posts: Array<IPost>;
  isOwner: boolean;
}

type Icons = { [key: string]: JSX.Element };

const About: React.FC<Props> = ({ aboutMe, isOwner, contacts, posts }) => {
  const cx = classNames.bind(styles);
  const contactsArr = Object.entries(contacts);

  const isEmpty = !(aboutMe || contactsArr.some(contact => contact[1]));

  const icons: Icons = {
    vk: <VkIcon size='20' />,
    facebook: <FacebookIcon size='20' />,
    website: <WebsiteIcon size='20' />,
    twitter: <TwitterIcon size='20' />,
    instagram: <InstagramIcon size='20' />,
    youtube: <YoutubeIcon size='20' />,
    github: <GitHubIcon size='20' />,
  };

  return (
    <div
      className={cx({ about: true, boxSizing: posts.length > 0 && isOwner })}
    >
      <div className={styles.title}>
        <span>About</span>
      </div>
      {isEmpty && (
        <div className={styles.noData}>
          <NoDataIcon size='50px' />
          <span>Nothing about user</span>
        </div>
      )}

      {!isEmpty && (
        <>
          <ul className={styles.column}>
            <li className={styles.item}>
              <div
                className={cx({
                  icon: true,
                  infoIcon: true,
                })}
              >
                <InfoIcon size='20px' />
              </div>
              <span>{aboutMe}</span>
            </li>
          </ul>
          <ul
            className={cx({
              contacts: contactsArr.some(contact => contact[1]),
            })}
          >
            {contactsArr.map(contact => {
              if (contact[0] === 'mainLink') return null;

              if (contact[1]) {
                const icon: string = String(contact[0]);
                let link: string = contact[1].replaceAll(' ', '');

                if (!link.includes('https://') && !link.includes('http://')) {
                  link = `https://${link}`;
                }

                return (
                  <li className={styles.item} key={contact[0]}>
                    <a
                      href={link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={styles.icon}
                    >
                      {icons[icon]}
                    </a>
                  </li>
                );
              }
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default About;
