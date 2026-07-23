import { useState, useEffect } from 'react';

export default function useDevice() {
  const [device, setDevice] = useState(() => {
    if (typeof window === 'undefined') {
      return { isIOS: false, isAndroid: false, isMobile: false, isDesktop: true };
    }
    const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isIOS) {
      return { isIOS: true, isAndroid: false, isMobile: true, isDesktop: false };
    }
    if (/android/i.test(userAgent)) {
      return { isIOS: false, isAndroid: true, isMobile: true, isDesktop: false };
    }
    const isSmallScreen = window.innerWidth <= 768;
    return { isIOS: false, isAndroid: false, isMobile: isSmallScreen, isDesktop: !isSmallScreen };
  });

  useEffect(() => {
    if (device.isIOS || device.isAndroid) return;
    
    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 768;
      setDevice(prev => {
        if (prev.isMobile === isSmallScreen) return prev;
        return {
          isIOS: false,
          isAndroid: false,
          isMobile: isSmallScreen,
          isDesktop: !isSmallScreen
        };
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [device.isIOS, device.isAndroid]);

  return device;
}
