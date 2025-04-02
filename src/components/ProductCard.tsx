
import { useState, useEffect } from 'react';
import ProductImage from './ProductImage';
import PriceTag from './PriceTag';
import Counter from './Counter';
import ProductChip from './ProductChip';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useOrientation } from '@/hooks/use-orientation';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductCardProps {
  id: string;
  name: string;
  imageSrc: string;
  originalPrice?: number;
  currentPrice: number;
  tags: {
    occasions: string[];
    seasons: string[];
    styles: string[];
  };
}

const ProductCard = ({
  id,
  name,
  imageSrc,
  originalPrice,
  currentPrice,
  tags
}: ProductCardProps) => {
  const [count, setCount] = useState(1);
  const [areTagsExpanded, setAreTagsExpanded] = useState(false);
  const [isLongPressed, setIsLongPressed] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const orientation = useOrientation();
  const isMobile = useIsMobile();
  
  // Use horizontal layout on desktop or in landscape mode on mobile
  const useHorizontalLayout = !isMobile || orientation === 'landscape';
  
  // Unit price calculation
  const unitPrice = currentPrice / count;
  const formattedUnitPrice = new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(unitPrice);

  // Long press handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartTime(Date.now());
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (Date.now() - touchStartTime > 500) {
      // This is a long press, check for horizontal swipe
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - touchStartX;
      
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0 && !isFavorite) {
          // Right swipe
          setIsFavorite(true);
        } else if (deltaX < 0 && isFavorite) {
          // Left swipe
          setIsFavorite(false);
        }
        
        // Reset to prevent multiple triggers
        setTouchStartTime(0);
      }
    }
  };

  const handleTouchEnd = () => {
    if (Date.now() - touchStartTime > 500) {
      setIsLongPressed(true);
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        setIsLongPressed(false);
      }, 3000);
    }
    setTouchStartTime(0);
  };

  // Check if there are any tags to display
  const hasTags = tags.occasions.length > 0 || tags.seasons.length > 0 || tags.styles.length > 0;

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative ${useHorizontalLayout ? 'flex' : 'flex flex-col'}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Image container with hover scale effect */}
      <div className={`group cursor-pointer ${useHorizontalLayout ? 'w-1/3' : 'w-full'}`}>
        <div className="transform transition-transform duration-300 group-hover:scale-[1.02]">
          <ProductImage src={imageSrc} alt={name} />
        </div>
      </div>

      {/* Price tag - repositioned for horizontal layout */}
      <div className={`${useHorizontalLayout ? 'absolute bottom-2 left-2 z-10' : ''}`}>
        <PriceTag originalPrice={originalPrice} currentPrice={currentPrice} />
      </div>
      
      {/* Product details and operation area */}
      <div className={`flex flex-col ${useHorizontalLayout ? 'w-2/3 p-3' : 'w-full'}`}>
        {/* Product name */}
        <div className={`${useHorizontalLayout ? 'mb-2' : 'p-3 pb-2'}`}>
          <h3 className="font-medium text-gray-800 leading-tight">{name}</h3>
        </div>
        
        {/* Operations area */}
        <div className={`flex items-center justify-between ${useHorizontalLayout ? 'mb-2' : 'px-3 py-2'}`}>
          <Counter value={count} onChange={setCount} />
          <div className="text-sm text-gray-600">
            <span className="font-medium">单次均价: </span>
            <span className="text-price">{formattedUnitPrice}</span>
          </div>
        </div>
        
        {/* Tags section */}
        {hasTags && (
          <div className={useHorizontalLayout ? 'mt-auto' : 'px-3 pb-3'}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500 font-medium">标签</span>
              <button
                onClick={() => setAreTagsExpanded(!areTagsExpanded)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {areTagsExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>
            
            {areTagsExpanded && (
              <div className="flex flex-wrap gap-1 animate-slide-up mt-1">
                {tags.occasions.map((tag, index) => (
                  <ProductChip key={`occasion-${index}`} label={tag} variant="occasion" />
                ))}
                {tags.seasons.map((tag, index) => (
                  <ProductChip key={`season-${index}`} label={tag} variant="season" />
                ))}
                {tags.styles.map((tag, index) => (
                  <ProductChip key={`style-${index}`} label={tag} variant="style" />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Long-press quick menu */}
      {isLongPressed && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-lg z-20 animate-fade-in">
          <div className="bg-white rounded-lg p-4 w-4/5 flex flex-col gap-2">
            <button 
              className="text-left p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              {isFavorite ? '❤️ 取消收藏' : '🤍 收藏商品'}
            </button>
            <button className="text-left p-2 hover:bg-gray-100 rounded">🛒 加入购物车</button>
            <button className="text-left p-2 hover:bg-gray-100 rounded">📱 分享商品</button>
            <button 
              className="text-left p-2 hover:bg-gray-100 rounded text-gray-500"
              onClick={() => setIsLongPressed(false)}
            >
              取消
            </button>
          </div>
        </div>
      )}
      
      {/* Favorite indicator */}
      {isFavorite && (
        <div className="absolute top-2 right-2 bg-white/80 p-1 rounded-full shadow-md z-10">
          ❤️
        </div>
      )}
    </div>
  );
};

export default ProductCard;
