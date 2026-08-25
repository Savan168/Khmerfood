import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

export const Products: React.FC = () => {
  const { products, categories } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryCategory = searchParams.get('category') || 'all';
  const querySearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(queryCategory);
  const [searchFilter, setSearchFilter] = useState(querySearch);
  const [sortBy, setSortBy] = useState('popular');
  const [maxPrice, setMaxPrice] = useState(50);

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSearchFilter(searchParams.get('search') || '');
  }, [searchParams]);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          product.khmerName.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchFilter.toLowerCase());
    const price = product.discountPrice ?? product.price;
    const matchesPrice = price <= maxPrice;

    return matchesCategory && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    const priceA = a.discountPrice ?? a.price;
    const priceB = b.discountPrice ?? b.price;

    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return b.id.localeCompare(a.id);
    return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
  });

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    const params = new URLSearchParams(searchParams);
    if (catId === 'all') {
      params.delete('category');
    } else {
      params.set('category', catId);
    }
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header title */}
      <div className="bg-gradient-to-r from-stone-900 to-amber-950 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">Khmer Food Products Catalog</h1>
          <p className="text-stone-300 text-sm">
            Explore our curated selection of authentic Cambodian delicacies, spices, snacks, and traditional ingredients.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className="space-y-6 lg:border-r lg:border-stone-200 lg:pr-8">
          <div>
            <h3 className="font-semibold text-stone-900 text-sm mb-4 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-700" /> Categories
            </h3>
            <div className="space-y-1.5">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-amber-700 text-white font-semibold shadow-xs' 
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                All Categories ({products.length})
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === cat.id 
                      ? 'bg-amber-700 text-white font-semibold shadow-xs' 
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${selectedCategory === cat.id ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-500'}`}>
                    {cat.productCount}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price filter */}
          <div className="pt-6 border-t border-stone-200">
            <h3 className="font-semibold text-stone-900 text-sm mb-3">Max Price: ${maxPrice}.00</h3>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-700 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>$5</span>
              <span>$25</span>
              <span>$50+</span>
            </div>
          </div>

          {/* Reset Filters */}
          {(selectedCategory !== 'all' || searchFilter || maxPrice < 50) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchFilter('');
                setMaxPrice(50);
                setSearchParams({});
              }}
              className="w-full py-2.5 bg-stone-100 text-stone-700 hover:bg-stone-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-3.5 h-3.5" /> Clear All Filters
            </button>
          )}
        </div>

        {/* Main Product Listing Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Search and Sort Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search products..."
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs text-stone-500 font-medium">
                Showing <strong className="text-stone-900">{filteredProducts.length}</strong> products
              </span>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-stone-400" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-600 cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Additions</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">No products found</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchFilter('');
                  setMaxPrice(50);
                  setSearchParams({});
                }}
                className="bg-amber-700 text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-amber-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
