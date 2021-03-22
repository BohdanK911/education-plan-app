import { useEffect, useState } from 'react';

const useWindowWidth = () => {
  const isClient = typeof window === 'object';

  const getWindowWidth = () => (isClient ? window.innerWidth : '');

  const [windowWidth, setWindowWidth] = useState(getWindowWidth);

  const handleResize = () => setWindowWidth(getWindowWidth());

  useEffect(() => {
    if (isClient) window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
};

export default useWindowWidth;
