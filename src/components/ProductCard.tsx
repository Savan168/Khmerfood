import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Star, Heart, ShoppingBag, Zap } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const navigate = useNavigate();
  const inWishlist = isInWishlist(product.id);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    navigate('/checkout');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Link 
      to={`/products/${product.id}`}
      className="group bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative"
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.discountPrice && (
            <span className="bg-rose-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
              SALE
            </span>
          )}
          {product.isNew && (
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
              NEW
            </span>
          )}
          {product.isPopular && !product.discountPrice && (
            <span className="bg-amber-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
              POPULAR
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label="Wishlist"
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all z-10 shadow-sm ${
            inWishlist 
              ? 'bg-rose-600 text-white' 
              : 'bg-white/95 text-stone-700 hover:text-rose-600 backdrop-blur-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Stock status overlay if out of stock */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-10">
            <span className="bg-stone-900 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-medium text-amber-800">{product.categoryName}</span>
            <span className="text-[11px] bg-stone-100 px-2 py-0.5 rounded-md text-stone-600">{product.weight}</span>
          </div>

          <h3 className="font-semibold text-stone-900 text-sm group-hover:text-amber-800 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-stone-500 font-serif mt-0.5 mb-2">{product.khmerName}</p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-stone-800">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-stone-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            {product.discountPrice ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-stone-900">${product.discountPrice.toFixed(2)}</span>
                <span className="text-xs text-stone-400 line-through">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-base font-bold text-stone-900">${product.price.toFixed(2)}</span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              aria-label="Add to cart"
              className="p-2.5 rounded-xl bg-amber-50 text-amber-800 hover:bg-amber-700 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              aria-label="Buy now"
              className="px-3 py-2 rounded-xl bg-amber-700 text-white text-xs font-semibold hover:bg-amber-800 transition-colors flex items-center gap-1 shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-3.5 h-3.5" /> Buy
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
