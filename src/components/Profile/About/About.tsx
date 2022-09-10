import classNames from 'classnames/bind';
import React from 'react';
import { useDarkMode } from 'usehooks-ts';
import { icons } from '../../../common/contactIcons';
import { useSelector } from '../../../hooks/useSelector';
import InfoIcon from '../../../svg/InfoIcon';
import NoDataIcon from '../../../svg/NoDataIcon';
import { IContacts } from '../../../types/profile';
import styles from './About.module.css';

export const About: React.FC = () => {
  const cx = classNames.bind(styles);
  const { isDarkMode } = useDarkMode();
  const { aboutMe, contacts, lookingForAJobDescription } = useSelector(
    s => s.profile
  );

  const contactsAsArr = Object.entries(contacts) as [keyof IContacts, string][];

  const isEmpty = !(
    aboutMe ||
    contactsAsArr.some(contact => contact[1]) ||
    lookingForAJobDescription
  );

  const validateLink = (link: string): boolean => {
    return link.includes('https://');
  };

  return (
    <div
      className={cx({
        about: true,
        aboutD: isDarkMode,
      })}
    >
      <div className={styles.title}>
        <span>About</span>
      </div>

      {isEmpty ? (
        <div className={styles.noData}>
          <NoDataIcon size="100px" />
          <span>Nothing about user</span>
        </div>
      ) : (
        <div className={styles.content}>
          <ul className={styles.column}>
            <li className={styles.item}>
              <div
                className={cx({
                  icon: true,
                  infoIcon: true,
                })}
              >
                <InfoIcon size="21px" />
              </div>
              <span>{aboutMe}</span>
            </li>
            <li className={`${styles.item} ${styles.job}`}>
              <div className={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22px "
                  height="22px"
                  viewBox="0 0 27 22"
                  fill="none"
                >
                  <path
                    d="M25.65 5.17647H20.25V3.88235C20.25 2.85269 19.8233 1.8652 19.0638 1.13712C18.3043 0.409033 17.2741 0 16.2 0H10.8C9.72587 0 8.69574 0.409033 7.93622 1.13712C7.1767 1.8652 6.75 2.85269 6.75 3.88235V5.17647H1.35C0.991958 5.17647 0.64858 5.31282 0.395406 5.55551C0.142232 5.7982 0 6.12737 0 6.47059V20.7059C0 21.0491 0.142232 21.3783 0.395406 21.621C0.64858 21.8637 0.991958 22 1.35 22H25.65C26.008 22 26.3514 21.8637 26.6046 21.621C26.8578 21.3783 27 21.0491 27 20.7059V6.47059C27 6.12737 26.8578 5.7982 26.6046 5.55551C26.3514 5.31282 26.008 5.17647 25.65 5.17647ZM9.45 3.88235C9.45 3.53913 9.59223 3.20997 9.84541 2.96727C10.0986 2.72458 10.442 2.58824 10.8 2.58824H16.2C16.558 2.58824 16.9014 2.72458 17.1546 2.96727C17.4078 3.20997 17.55 3.53913 17.55 3.88235V5.17647H9.45V3.88235ZM24.3 19.4118H2.7V12.9412H24.3V19.4118ZM24.3 11.6471H2.7V7.76471H24.3V11.6471Z"
                    fill="#3A3A3A"
                  />
                </svg>
              </div>
              <p>{lookingForAJobDescription}</p>
            </li>
          </ul>

          <ul
            className={cx({
              contacts: contactsAsArr.some(contact => contact[1]),
            })}
          >
            {contactsAsArr.map(([name, link]) => {
              if (!validateLink(link)) return null;
              return (
                <li className={`${styles.contact} ${styles[name]}`} key={name}>
                  <a
                    className={styles.icon}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {icons[name]}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
