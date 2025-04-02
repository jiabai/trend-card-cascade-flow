
import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductChipProps {
  label: string;
  variant?: 'occasion' | 'season' | 'style';
  onRemove?: () => void;
  onClick?: () => void;
}

const variantStyles = {
  occasion: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  season: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  style: 'bg-amber-100 text-amber-800 hover:bg-amber-200'
};

const ProductChip = ({ 
  label, 
  variant = 'style', 
  onRemove,
  onClick 
}: ProductChipProps) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  let rippleId = 0;
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick();
    }
    
    // Add ripple effect
    const chipRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - chipRect.left;
    const y = e.clientY - chipRect.top;
    
    const newRipple = { x, y, id: rippleId++ };
    setRipples([...ripples, newRipple]);
    
    setTimeout(() => {
      setRipples(ripples => ripples.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <div 
      className={cn(
        "chip relative overflow-hidden cursor-pointer",
        variantStyles[variant]
      )}
      onClick={handleClick}
    >
      <span>{label}</span>
      {onRemove && (
        <button 
          className="ml-1 text-opacity-70 hover:text-opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <X className="h-3 w-3" />
        </button>
      )}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="ripple"
          style={{ 
            left: ripple.x, 
            top: ripple.y,
            width: '100px', 
            height: '100px', 
            marginLeft: '-50px', 
            marginTop: '-50px' 
          }}
        />
      ))}
    </div>
  );
};

export default ProductChip;
