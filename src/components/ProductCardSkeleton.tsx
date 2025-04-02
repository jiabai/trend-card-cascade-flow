
import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm relative animate-pulse">
      {/* Skeleton for image */}
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
        <div className="skeleton w-full h-full" />
      </div>
      
      {/* Skeleton for price tag */}
      <div className="absolute bottom-2 left-2 skeleton w-20 h-8 rounded-md" />
      
      {/* Skeleton for product name */}
      <div className="p-3 pb-2">
        <div className="skeleton w-3/4 h-5 rounded mb-1" />
        <div className="skeleton w-2/4 h-5 rounded" />
      </div>
      
      {/* Skeleton for operations */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="skeleton w-24 h-8 rounded" />
        <div className="skeleton w-16 h-5 rounded" />
      </div>
      
      {/* Skeleton for tags */}
      <div className="px-3 pb-3">
        <div className="flex flex-wrap gap-1 mt-1">
          <div className="skeleton w-16 h-6 rounded-full" />
          <div className="skeleton w-20 h-6 rounded-full" />
          <div className="skeleton w-14 h-6 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
