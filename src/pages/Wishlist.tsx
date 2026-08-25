import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const Wishlist: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Heart className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-bold text-stone-900">Your Wishlist is Empty</h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Save your favorite Khmer food products by clicking the heart icon on any product card.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-3.5 rounded-full transition-all shadow-md text-sm"
        >
          Browse Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">My Wishlist ({wishlist.length})</h1>
        <p className="text-xs text-stone-500 mt-0.5">Products you have saved for later</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map(item => {
          const product = item.product;
          return (
            <div 
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between relative group"
            >
              <div 
                onClick={() => navigate(`/products/${product.id}`)}
                className="cursor-pointer space-y-3"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-stone-100 relative">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">{product.categoryName}</span>
                  <h3 className="font-semibold text-stone-900 text-sm truncate mt-0.5">{product.name}</h3>
                  <p className="text-xs text-stone-500 font-serif">{product.khmerName}</p>
                  <p className="text-base font-serif font-bold text-stone-900 mt-2">
                    ${(product.discountPrice ?? product.price).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 mt-4 flex gap-2">
                <button
                  onClick={() => addToCart(product, 1)}
                  className="flex-1 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="p-2.5 text-stone-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
