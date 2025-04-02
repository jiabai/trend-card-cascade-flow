
import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface ProductImageProps {
  src: string;
  alt: string;
}

const ProductImage = ({ src, alt }: ProductImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  });

  useEffect(() => {
    if (isIntersecting && !imageSrc) {
      setImageSrc(src);
    }
  }, [isIntersecting, src, imageSrc]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className="product-image-container group"
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`product-image ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleImageLoad}
        />
      )}
      {(!isLoaded || !imageSrc) && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse-light" />
      )}
    </div>
  );
};

export default ProductImage;
