
import { useScroll } from '@/hooks/use-scroll';

const ScrollProgressIndicator = () => {
  const { scrollPercentage, isScrollingDown } = useScroll();
  
  if (scrollPercentage === 0) {
    return null;
  }
  
  return (
    <div className={`fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50 transition-opacity duration-300 ${!isScrollingDown && scrollPercentage > 0 ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        className="h-full bg-price transition-all duration-300" 
        style={{ width: `${scrollPercentage}%` }}
      />
      <div className="absolute right-2 top-2 bg-price text-white text-xs px-1 rounded-sm">
        {scrollPercentage}%
      </div>
    </div>
  );
};

export default ScrollProgressIndicator;
