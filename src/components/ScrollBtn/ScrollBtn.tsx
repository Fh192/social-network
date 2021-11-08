import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useDarkMode } from 'usehooks-ts';
import Arrow from '../../svg/Arrow';
import styles from './ScrollBtn.module.css';

export const ScrollBtn: React.FC = () => {
  const cx = classNames.bind(styles);

  const { isDarkMode } = useDarkMode();
  const [arrowType, setArrowType] = useState<'up' | 'down'>('up');
  const [lastPosition, setLastPosition] = useState(0);
  const [visible, setVisible] = useState(false);

  const scroll = () => {
    const el = document.scrollingElement;
    if (el) {
      const top = arrowType === 'up' ? 0 : lastPosition;
      el.scroll({ behavior: 'smooth', top });
      setLastPosition(el.scrollTop);
      setArrowType(t => (t === 'down' ? 'up' : 'down'));
    }
  };

  useEffect(() => {
    const el = document.scrollingElement as Element;

    const scrollListener = (e: WheelEvent) => {
      if (el.scrollTop <= 500) {
        setVisible(false);
        setLastPosition(0);
      } else {
        if (e.deltaY < 0) {
          setArrowType('up');
          setVisible(true);
        } else setVisible(false);
      }
    };

    document.addEventListener('wheel', scrollListener);
    return () => document.removeEventListener('wheel', scrollListener);
  }, []);

  useEffect(() => {
    const el = document.scrollingElement as Element;
    let touchstartY = 0;
    let touchendY = 0;

    const handleScroll = () => {
      if (el.scrollTop <= 500 && touchendY !== touchstartY) {
        setVisible(false);
        setLastPosition(0);
      } else {
        if (touchendY < touchstartY) {
          setVisible(false);
        }
        if (touchendY > touchstartY) {
          setArrowType('up');
          setVisible(true);
        }
      }
    };
    const touchStartListener = (e: TouchEvent) => {
      touchstartY = e.changedTouches[0].screenY;
    };
    const touchEndListener = (e: TouchEvent) => {
      touchendY = e.changedTouches[0].screenY;
      handleScroll();
    };

    document.addEventListener('touchstart', touchStartListener);
    document.addEventListener('touchend', touchEndListener);
    return () => {
      document.removeEventListener('touchstart', touchStartListener);
      document.removeEventListener('touchend', touchEndListener);
    };
  }, []);

  return (
    <div
      className={cx({ scrollBtn: true, visible, scrollBtnD: isDarkMode })}
      onClick={scroll}
    >
      <button>
        <Arrow
          size='20px'
          type={arrowType}
          color={isDarkMode ? '#8ea6f4' : '#1c3177'}
        />
      </button>
    </div>
  );
};
