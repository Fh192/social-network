import { useState, useEffect } from 'react';

export default function useFetchOnScroll(defaultValue: boolean) {
  useEffect(() => {
    document.addEventListener('scroll', scrollListener);
    return () => {
      document.removeEventListener('scroll', scrollListener);
      console.log(123);
    };
  }, []);

  const [fetching, setFetching] = useState(defaultValue);

  const scrollListener: EventListener = (e: Event) => {
    const target = e.target as HTMLDocument;
    const scrollHeight = target.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;
    const scrollTop = target.documentElement.scrollTop;

    if (scrollHeight - (scrollTop + innerHeight) < 100) {
      setFetching(fetching => !fetching);
    }
  };

  return { fetching, setFetching };
}
