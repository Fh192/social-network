import { useState, useEffect } from 'react';

export default function useFetchOnScroll(defaultValue: boolean) {
  const [fetching, setFetching] = useState(defaultValue);

  const scrollListener: EventListener = (e: Event) => {
    const target = e.target as HTMLDocument;
    const scrollHeight = target.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;
    const scrollTop = target.documentElement.scrollTop;

    if (scrollHeight - (scrollTop + innerHeight) < 100) {
      setFetching(true);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollListener);

    return () => document.removeEventListener('scroll', scrollListener);
  }, []);

  return { fetching, setFetching };
}
