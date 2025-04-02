
import { useState, useEffect } from 'react';

type Orientation = 'portrait' | 'landscape';

export function useOrientation() {
  const [orientation, setOrientation] = useState<Orientation>(
    window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
  );

  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(
        window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
      );
    };

    window.addEventListener('resize', updateOrientation);
    
    return () => {
      window.removeEventListener('resize', updateOrientation);
    };
  }, []);

  return orientation;
}
