"use client";

import React from "react";

export default function ProductFilter({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
}) {
  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), priceRange.max - 100);
    onPriceChange({ ...priceRange, min: value });
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), priceRange.min + 100);
    onPriceChange({ ...priceRange, max: value });
  };

  return (
    <aside className="w-full lg:w-64 xl:w-72 p-4 bg-gray-100 rounded-lg shadow-sm">
      {/* Category Filter */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-gray-800">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
              />
              <span className="text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Price Range</h3>
        <div className="relative h-20">
          <input
            type="range"
            min="0"
            max="20000"
            step="100"
            value={priceRange.min}
            onChange={handleMinChange}
            className="absolute w-full h-1 bg-transparent pointer-events-none appearance-none z-10"
            style={{ "--thumb-z-index": 20 }}
          />
          <input
            type="range"
            min="0"
            max="20000"
            step="100"
            value={priceRange.max}
            onChange={handleMaxChange}
            className="absolute w-full h-1 bg-transparent pointer-events-none appearance-none"
          />
          <div className="relative h-1 bg-gray-300 rounded-full mt-2">
            <div
              className="absolute h-1 bg-blue-500 rounded-full"
              style={{
                left: `${(priceRange.min / 20000) * 100}%`,
                right: `${100 - (priceRange.max / 20000) * 100}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
          <span>৳ {priceRange.min.toLocaleString()}</span>
          <span>৳ {priceRange.max.toLocaleString()}</span>
        </div>
      </div>
    </aside>
  );
}
