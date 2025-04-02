
import { useState, useEffect, useMemo } from 'react';
import { useOrientation } from '@/hooks/use-orientation';
import { useScroll } from '@/hooks/use-scroll';

interface WaterfallProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  loadMore: () => void;
  loading: boolean;
  hasMore: boolean;
  columnCount?: number;
}

function Waterfall<T>({
  items,
  renderItem,
  loadMore,
  loading,
  hasMore,
  columnCount
}: WaterfallProps<T>) {
  const orientation = useOrientation();
  const { isAtBottom } = useScroll(200);
  const [columns, setColumns] = useState(columnCount || (orientation === 'portrait' ? 2 : 3));
  
  // Update columns based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (columnCount) return;
      
      const width = window.innerWidth;
      
      if (width < 640) setColumns(1);
      else if (width < 768) setColumns(2);
      else if (width < 1024) setColumns(3);
      else setColumns(4);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [columnCount]);
  
  // Trigger loadMore when bottom is reached
  useEffect(() => {
    if (isAtBottom && !loading && hasMore) {
      loadMore();
    }
  }, [isAtBottom, loading, hasMore, loadMore]);
  
  // Distribute items into columns
  const columnedItems = useMemo(() => {
    const result: T[][] = Array.from({ length: columns }, () => []);
    
    items.forEach((item, i) => {
      result[i % columns].push(item);
    });
    
    return result;
  }, [items, columns]);
  
  // Calculate gap based on orientation
  const gap = orientation === 'portrait' ? 'gap-6' : 'gap-4';
  
  return (
    <div className="relative px-3 sm:px-4 py-2">
      <div className={`grid grid-cols-${columns} ${gap}`}>
        {columnedItems.map((column, columnIndex) => (
          <div key={`column-${columnIndex}`} className="flex flex-col gap-6 sm:gap-4">
            {column.map((item, itemIndex) => (
              <div key={`item-${columnIndex}-${itemIndex}`} className="w-full">
                {renderItem(item, columnIndex * items.length / columns + itemIndex)}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {loading && (
        <div className="mt-6 flex justify-center items-center p-4">
          <div className="animate-pulse-light text-gray-500">
            正在获取最新潮流单品...
          </div>
        </div>
      )}
      
      {!hasMore && items.length > 0 && (
        <div className="mt-6 text-center text-gray-500 p-4">
          已经到底啦，没有更多商品了～
        </div>
      )}
    </div>
  );
}

export default Waterfall;
