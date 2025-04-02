
import { useState } from 'react';
import { Shirt, CircleDollarSign, Plus } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { id: 'all', name: '全部', active: true },
  { id: 'tops', name: '上装', active: false },
  { id: 'bottoms', name: '下装', active: false },
  { id: 'dresses', name: '连衣裙', active: false },
  { id: 'outerwear', name: '外套', active: false },
  { id: 'shoes', name: '鞋子', active: false },
];

// Sample wardrobe items
const WARDROBE_ITEMS = [
  {
    id: 'item-1',
    category: 'tops',
    name: '基础款T恤',
    imageSrc: 'https://source.unsplash.com/random/300x400?tshirt&sig=1',
    currentPrice: 200,
    wearCount: 12,
  },
  {
    id: 'item-2',
    category: 'tops',
    name: '菱形格纹毛衣',
    imageSrc: 'https://source.unsplash.com/random/300x400?sweater&sig=2',
    currentPrice: 200,
    wearCount: 13,
  },
  {
    id: 'item-3',
    category: 'tops',
    name: '橄榄绿长袖T恤',
    imageSrc: 'https://source.unsplash.com/random/300x400?longsleeve&sig=3',
    currentPrice: 200,
    wearCount: 20,
  },
  {
    id: 'item-4',
    category: 'outerwear',
    name: '米色长款大衣',
    imageSrc: 'https://source.unsplash.com/random/300x400?coat&sig=4',
    currentPrice: 1500,
    wearCount: 71,
  },
];

const Wardrobe = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filter items based on active category
  const filteredItems = activeCategory === 'all' 
    ? WARDROBE_ITEMS 
    : WARDROBE_ITEMS.filter(item => item.category === activeCategory);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">我的衣橱</h1>
          <div className="flex items-center mt-2 gap-2">
            <div className="flex items-center gap-1 text-teal-500">
              <Shirt className="h-5 w-5" />
              <span className="font-medium">6</span>
            </div>
            <div className="flex items-center gap-1 text-amber-500 ml-4">
              <CircleDollarSign className="h-5 w-5" />
              <span className="font-medium">3900</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Category tabs */}
      <div className="bg-white sticky top-[76px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                className={cn(
                  "min-w-[80px] py-2 px-5 rounded-full text-sm font-medium transition-colors",
                  activeCategory === category.id
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                )}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 mt-6">
        {/* Section title */}
        {activeCategory !== 'all' && (
          <h2 className="text-xl font-semibold mb-3">{
            CATEGORIES.find(c => c.id === activeCategory)?.name
          }</h2>
        )}
        
        {/* Wardrobe items */}
        <div className="rounded-xl bg-white shadow p-4">
          {filteredItems
            .filter(item => item.category === 'tops' || activeCategory !== 'all')
            .map(item => (
              <div key={item.id} className="wardrobe-item">
                <WardrobeItem 
                  id={item.id}
                  name={item.name}
                  imageSrc={item.imageSrc}
                  currentPrice={item.currentPrice}
                  wearCount={item.wearCount}
                />
              </div>
            ))}
        </div>
        
        {/* Outerwear section (if showing all) */}
        {activeCategory === 'all' && (
          <>
            <h2 className="text-xl font-semibold mt-6 mb-3">外套</h2>
            <div className="rounded-xl bg-white shadow p-4">
              {filteredItems
                .filter(item => item.category === 'outerwear')
                .map(item => (
                  <div key={item.id} className="wardrobe-item">
                    <WardrobeItem 
                      id={item.id}
                      name={item.name}
                      imageSrc={item.imageSrc}
                      currentPrice={item.currentPrice}
                      wearCount={item.wearCount}
                    />
                  </div>
                ))}
            </div>
          </>
        )}
      </main>

      {/* Add new item button */}
      <div className="fixed bottom-6 right-6">
        <button 
          className="bg-black text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
          aria-label="Add new item"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

interface WardrobeItemProps {
  id: string;
  name: string;
  imageSrc: string;
  currentPrice: number;
  wearCount: number;
}

const WardrobeItem = ({ id, name, imageSrc, currentPrice, wearCount }: WardrobeItemProps) => {
  // Calculate cost per wear
  const costPerWear = wearCount > 0 ? currentPrice / wearCount : currentPrice;
  
  return (
    <div className="flex items-center py-4 border-b border-gray-100 last:border-0">
      <div className="h-[60px] w-[60px] rounded overflow-hidden flex-shrink-0">
        <img 
          src={imageSrc} 
          alt={name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="flex flex-col ml-4 flex-grow">
        <div className="text-lg font-bold text-price">
          ¥{costPerWear.toFixed(2)}/次
        </div>
        <div className="text-gray-400 text-sm">
          ¥{currentPrice} · 已穿 {wearCount} 次
        </div>
      </div>
      
      <button className="bg-emerald-500 text-white w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
        <Plus className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Wardrobe;
