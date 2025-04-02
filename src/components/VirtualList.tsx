
import { useState, useEffect, useRef, useCallback } from 'react';

interface VirtualListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  overscan?: number;
  className?: string;
  onEndReached?: () => void;
  endReachedThreshold?: number;
}

function VirtualList<T>({
  items,
  renderItem,
  itemHeight,
  overscan = 3,
  className = '',
  onEndReached,
  endReachedThreshold = 200
}: VirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });
  
  const calculateVisibleRange = useCallback(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const { scrollTop, clientHeight } = container;
    
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const end = Math.min(
      items.length,
      Math.ceil((scrollTop + clientHeight) / itemHeight) + overscan
    );
    
    setVisibleRange({ start, end });
    
    // Check if we need to load more
    if (
      onEndReached &&
      scrollTop + clientHeight >= container.scrollHeight - endReachedThreshold
    ) {
      onEndReached();
    }
  }, [items.length, itemHeight, overscan, onEndReached, endReachedThreshold]);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    calculateVisibleRange();
    
    const handleScroll = () => {
      calculateVisibleRange();
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [calculateVisibleRange]);
  
  // Recalculate on items change
  useEffect(() => {
    calculateVisibleRange();
  }, [items.length, calculateVisibleRange]);
  
  const totalHeight = items.length * itemHeight;
  const visibleItems = items.slice(visibleRange.start, visibleRange.end);
  
  return (
    <div 
      ref={containerRef}
      className={`overflow-auto h-full ${className}`}
    >
      <div 
        style={{ height: totalHeight, position: 'relative' }}
      >
        {visibleItems.map((item, index) => {
          const actualIndex = visibleRange.start + index;
          return (
            <div
              key={actualIndex}
              style={{
                position: 'absolute',
                top: actualIndex * itemHeight,
                height: itemHeight,
                width: '100%'
              }}
            >
              {renderItem(item, actualIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VirtualList;
