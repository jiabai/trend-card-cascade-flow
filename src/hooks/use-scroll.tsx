
import { useEffect, useState } from 'react';

interface ScrollInfo {
  scrollY: number;
  scrollPercentage: number;
  isScrollingDown: boolean;
  isAtBottom: boolean;
}

export function useScroll(bottomThreshold = 200): ScrollInfo {
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({
    scrollY: 0,
    scrollPercentage: 0,
    isScrollingDown: false,
    isAtBottom: false
  });
  
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isScrollingDown = scrollY > lastScrollY;
      lastScrollY = scrollY;
      
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPercentage = Math.min(
        Math.round((scrollY / (scrollHeight - clientHeight)) * 100),
        100
      );
      
      const isAtBottom = 
        scrollY + clientHeight >= scrollHeight - bottomThreshold;
      
      setScrollInfo({
        scrollY,
        scrollPercentage,
        isScrollingDown,
        isAtBottom
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [bottomThreshold]);
  
  return scrollInfo;
}
