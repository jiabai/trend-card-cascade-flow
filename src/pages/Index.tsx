
import { useState, useEffect, useCallback } from 'react';
import ProductCard from '@/components/ProductCard';
import Waterfall from '@/components/Waterfall';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { Heart } from 'lucide-react';

// Sample product data generator
const generateMockProducts = (start: number, count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const id = `product-${start + i}`;
    const index = start + i;
    
    // Generate a price between 80 and 20000
    const currentPrice = Math.floor(Math.random() * 19920) + 80;
    
    // 30% chance of having an original price
    const hasOriginalPrice = Math.random() < 0.3;
    const originalPrice = hasOriginalPrice 
      ? Math.floor(currentPrice * (1 + Math.random() * 0.5)) 
      : undefined;
    
    // Generate random tags
    const occasions = ['晚宴', '婚礼', '约会', '派对', '职场'];
    const seasons = ['春夏', '秋冬', '四季'];
    const styles = ['经典', '街头', '复古', '优雅', '简约', '前卫'];
    
    const randomTags = {
      occasions: Math.random() < 0.7 ? [occasions[Math.floor(Math.random() * occasions.length)]] : [],
      seasons: Math.random() < 0.8 ? [seasons[Math.floor(Math.random() * seasons.length)]] : [],
      styles: Math.random() < 0.9 
        ? [styles[Math.floor(Math.random() * styles.length)]] 
        : []
    };
    
    // Add a second tag occasionally
    if (Math.random() < 0.3 && randomTags.styles.length > 0) {
      let secondStyle;
      do {
        secondStyle = styles[Math.floor(Math.random() * styles.length)];
      } while (randomTags.styles.includes(secondStyle));
      randomTags.styles.push(secondStyle);
    }
    
    return {
      id,
      name: `时尚潮流单品 ${index + 1}`,
      imageSrc: `https://source.unsplash.com/random/300x400?fashion&sig=${index}`,
      originalPrice,
      currentPrice,
      tags: randomTags,
    };
  });
};

const Index = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const loadProducts = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newProducts = generateMockProducts(page * 10, 10);
    setProducts(prev => [...prev, ...newProducts]);
    setPage(prev => prev + 1);
    
    // Stop loading after 5 pages
    if (page >= 4) {
      setHasMore(false);
    }
    
    setLoading(false);
  }, [loading, hasMore, page]);
  
  // Initial load
  useEffect(() => {
    loadProducts();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollProgressIndicator />
      
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">潮流单品</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-price transition-colors">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto pb-20">
        <Waterfall
          items={products}
          renderItem={(product, index) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageSrc={product.imageSrc}
              originalPrice={product.originalPrice}
              currentPrice={product.currentPrice}
              tags={product.tags}
            />
          )}
          loadMore={loadProducts}
          loading={loading}
          hasMore={hasMore}
        />
        
        {loading && products.length === 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
