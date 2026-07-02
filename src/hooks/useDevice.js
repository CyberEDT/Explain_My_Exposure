import { useState, useEffect } from 'react';

export default function useDevice() {
  const [device, setDevice] = useState({
    isIOS: false,
    isAndroid: false,
    isMobile: false,
    isDesktop: true
  });

  useEffect(() => {
    const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;

    // iOS detection (iPad, iPhone, iPod)
    // Need to also check for iPad on iOS 13+ which presents as MacIntel but has touch
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isIOS) {
      setDevice({
        isIOS: true,
        isAndroid: false,
        isMobile: true,
        isDesktop: false
      });
      return;
    }

    // Android detection
    if (/android/i.test(userAgent)) {
      setDevice({
        isIOS: false,
        isAndroid: true,
        isMobile: true,
        isDesktop: false
      });
      return;
    }

    // Fallback/Desktop
    // Note: We also consider small screen widths as 'mobile' functionally for CSS fallbacks
    // if the useragent doesn't explicitly match iOS or Android.
    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 768;
      setDevice({
        isIOS: false,
        isAndroid: false,
        isMobile: isSmallScreen,
        isDesktop: !isSmallScreen
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    
  }, []);

  return device;
}
