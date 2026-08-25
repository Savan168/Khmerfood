import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { 
  Star, Heart, ShoppingBag, Zap, ShieldCheck, 
  Truck, RefreshCw, MapPin, Check, MessageSquare, Plus, Minus 
} from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    products, addToCart, toggleWishlist, isInWishlist, 
    getProductReviews, canUserReviewProduct, addProductReview 
  } = useApp();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
        <h2 className="font-serif text-2xl font-bold text-stone-900">Product Not Found</h2>
        <p className="text-xs text-stone-500">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="bg-amber-700 text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-amber-800">
          Back to Products
        </Link>
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'reviews'>('description');
  
  // Review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const productReviews = getProductReviews(product.id);
  const canReview = canUserReviewProduct(product.id);

  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    addProductReview(product.id, reviewRating, reviewComment.trim());
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Breadcrumb */}
      <nav className="text-xs text-stone-500 flex items-center gap-2">
        <Link to="/" className="hover:text-amber-700">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-amber-700">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.categoryId}`} className="hover:text-amber-700">{product.categoryName}</Link>
        <span>/</span>
        <span className="text-stone-900 font-medium truncate">{product.name}</span>
      </nav>

      {/* Main product view */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-lg relative">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.discountPrice && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                SALE
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImage === idx ? 'border-amber-600 ring-2 ring-amber-600/30' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                {product.categoryName}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">{product.name}</h1>
            <p className="font-serif text-amber-800 text-base font-semibold mt-1">{product.khmerName}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-stone-800">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-stone-500">({product.reviewCount} customer reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-500 font-medium">Price</p>
              <div className="flex items-baseline gap-3 mt-1">
                {product.discountPrice ? (
                  <>
                    <span className="text-3xl font-serif font-bold text-stone-900">${product.discountPrice.toFixed(2)}</span>
                    <span className="text-base text-stone-400 line-through">${product.price.toFixed(2)}</span>
                    <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded-md">
                      Save ${(product.price - product.discountPrice).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-serif font-bold text-stone-900">${product.price.toFixed(2)}</span>
                )}
              </div>
            </div>
            <div className="text-right text-xs text-stone-500 space-y-1">
              <p>Weight: <strong className="text-stone-800">{product.weight}</strong></p>
              <p>Origin: <strong className="text-stone-800">{product.origin}</strong></p>
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center border border-stone-200 rounded-xl bg-white shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="p-2.5 text-stone-600 hover:text-stone-900 disabled:opacity-40"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-stone-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="p-2.5 text-stone-600 hover:text-stone-900 disabled:opacity-40"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-900 font-semibold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-2xs"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
              >
                <Zap className="w-4 h-4" /> Buy Now
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`border font-semibold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  inWishlist 
                    ? 'bg-rose-50 border-rose-200 text-rose-600' 
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                <span>{inWishlist ? 'Wishlisted' : 'Wishlist'}</span>
              </button>
            </div>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200 text-center">
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/60">
              <Truck className="w-5 h-5 text-amber-700 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-stone-800">Fast Delivery</p>
              <p className="text-[10px] text-stone-500">All provinces</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/60">
              <ShieldCheck className="w-5 h-5 text-amber-700 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-stone-800">100% Authentic</p>
              <p className="text-[10px] text-stone-500">Certified origin</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/60">
              <RefreshCw className="w-5 h-5 text-amber-700 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-stone-800">Freshness</p>
              <p className="text-[10px] text-stone-500">Quality assured</p>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs for Description, Ingredients, and Reviews */}
      <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-xs space-y-6">
        <div className="flex border-b border-stone-200 gap-8">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-4 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'description' ? 'border-amber-700 text-amber-700' : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Product Description
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`pb-4 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'ingredients' ? 'border-amber-700 text-amber-700' : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Ingredients & Origin
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'reviews' ? 'border-amber-700 text-amber-700' : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Customer Reviews ({productReviews.length})
          </button>
        </div>

        {activeTab === 'description' && (
          <div className="space-y-4 text-stone-700 text-sm leading-relaxed">
            <p>{product.description}</p>
            <p>
              Crafted with traditional Cambodian standards, this product preserves the authentic flavours cherished by generations of Khmer families. Store in a cool, dry place away from direct sunlight.
            </p>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div className="space-y-4 text-stone-700 text-sm">
            <div>
              <h4 className="font-semibold text-stone-900 mb-2">Ingredients:</h4>
              <ul className="list-disc list-inside space-y-1">
                {product.ingredients.map((ing, idx) => (
                  <li key={idx}>{ing}</li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-stone-100">
              <h4 className="font-semibold text-stone-900 mb-1">Origin & Harvesting:</h4>
              <p className="text-stone-600">{product.origin}</p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-stone-100">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">Customer Reviews</h3>
                <p className="text-xs text-stone-500 mt-0.5">Based on {productReviews.length} verified purchases</p>
              </div>

              {canReview ? (
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-amber-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-amber-800 transition-colors shadow-sm"
                >
                  {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                </button>
              ) : (
                <p className="text-xs text-stone-400 italic">
                  * You can write a review after purchasing and receiving this product.
                </p>
              )}
            </div>

            {/* Review form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200 space-y-4 animate-in fade-in">
                <h4 className="font-semibold text-stone-900 text-sm">Write Your Review</h4>
                
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className={`p-1 ${reviewRating >= star ? 'text-amber-500' : 'text-stone-300'}`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Your Comments</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your experience with this product..."
                    value={reviewComment}
                    onChange={e => setReviewComment(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md"
                >
                  Submit Review
                </button>
              </form>
            )}

            {/* Review list */}
            {productReviews.length === 0 ? (
              <p className="text-xs text-stone-500 py-8 text-center">No reviews yet for this product. Be the first to review!</p>
            ) : (
              <div className="space-y-4 divide-y divide-stone-100">
                {productReviews.map(rev => (
                  <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={rev.userAvatar} alt={rev.userName} className="w-9 h-9 rounded-full object-cover border border-amber-600" />
                        <div>
                          <p className="font-bold text-stone-900 text-xs">{rev.userName}</p>
                          <p className="text-[10px] text-stone-400">{new Date(rev.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed pl-12">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="font-serif text-2xl font-bold text-stone-900">Related Khmer Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
