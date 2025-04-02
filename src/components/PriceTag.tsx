
import { Star } from 'lucide-react';

interface PriceTagProps {
  originalPrice?: number;
  currentPrice: number;
}

const PriceTag = ({ originalPrice, currentPrice }: PriceTagProps) => {
  const isLuxury = currentPrice > 10000;
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="product-price-tag">
      {originalPrice && originalPrice > currentPrice && (
        <span className="line-through text-white/70 mr-2 text-sm">
          {formatPrice(originalPrice)}
        </span>
      )}
      <span className="text-lg font-bold">
        {formatPrice(currentPrice)}
      </span>
      {isLuxury && (
        <span className="luxury-badge">
          <Star className="w-3 h-3 mr-0.5" />
          奢侈品
        </span>
      )}
    </div>
  );
};

export default PriceTag;
