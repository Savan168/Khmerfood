import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { 
  ArrowRight, ShieldCheck, Sparkles, Star, Award, 
  Truck, ArrowUpRight, Flame, HeartHandshake 
} from 'lucide-react';

export const Home: React.FC = () => {
  const { categories, products, reviews } = useApp();
  const navigate = useNavigate();

  const featuredProducts = products.filter(p => p.isFeatured);
  const popularProducts = products.filter(p => p.isPopular);
  const discountProducts = products.filter(p => p.discountPrice);

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white py-20 lg:py-28">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-semibold tracking-wide">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Authentic Cambodian Culinary Heritage</span>
              </div>
              
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Taste the Rich Soul of <span className="text-amber-400">Khmer Cuisine</span>
              </h1>
              
              <p className="text-stone-300 text-base sm:text-lg max-w-xl leading-relaxed">
                Discover organic Kampot pepper, sun-dried Tonle Sap river delicacies, Kampong Speu palm sugar, and handcrafted traditional Khmer food products delivered to your doorstep.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg transition-all flex items-center gap-2 group"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/products?category=cat-4"
                  className="bg-white/10 hover:bg-white/25 text-white font-semibold px-8 py-3.5 rounded-full backdrop-blur-md transition-all border border-white/20"
                >
                  Kampot Pepper Spices
                </Link>
              </div>

              {/* Trust stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-lg">
                <div>
                  <p className="text-2xl font-serif font-bold text-amber-400">100%</p>
                  <p className="text-xs text-stone-400 mt-0.5">Authentic Sourced</p>
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-amber-400">25+ Prods</p>
                  <p className="text-xs text-stone-400 mt-0.5">Handcrafted Khmer Items</p>
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-amber-400">4.9 ★</p>
                  <p className="text-xs text-stone-400 mt-0.5">Customer Satisfaction</p>
                </div>
              </div>
            </div>

            {/* Hero Banner Grid Image */}
            <div className="relative">
              <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-600/30">
                <img 
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800" 
                  alt="Kampot Pepper and Khmer Spices"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-6">
                  <div className="bg-stone-900/90 backdrop-blur-md p-4 rounded-2xl border border-stone-700 max-w-xs">
                    <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider">Featured Specialty</p>
                    <p className="text-white font-serif text-sm font-bold mt-0.5">Organic Kampot Black Peppercorns</p>
                    <p className="text-stone-300 text-xs mt-1">Directly from certified pepper farms in Kampot province.</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-amber-600 text-white p-4 rounded-2xl shadow-xl hidden sm:flex items-center gap-3 border border-amber-500">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold">Geographical Indication (GI)</p>
                  <p className="text-[11px] text-amber-100">Certified Authentic Origin</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-amber-700 text-xs font-bold uppercase tracking-wider block mb-1">Browse by Category</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Khmer Food Categories</h2>
          </div>
          <Link to="/products" className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1 group">
            View All Categories <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => navigate(`/products?category=${cat.id}`)}
              className="group bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs hover:shadow-lg hover:border-amber-600 transition-all cursor-pointer text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden mb-3 bg-stone-100 border border-stone-200 group-hover:scale-105 transition-transform">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold text-stone-800 text-xs group-hover:text-amber-700 transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <p className="text-[10px] text-stone-400 mt-0.5">{cat.productCount} items</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-amber-700 text-xs font-bold uppercase tracking-wider block mb-1">Handpicked for You</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Featured Khmer Specialties</h2>
          </div>
          <Link to="/products" className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1 group">
            All Products <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-800 via-amber-900 to-stone-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="bg-amber-500/30 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
              Special Offer
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">Traditional Khmer Gift Hampers</h2>
            <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed">
              Surprise your loved ones with authentic bamboo hampers filled with premium Kampot pepper, palm sugar, and lotus flower tea. Perfect for festivals and family gatherings.
            </p>
            <div>
              <Link
                to="/products/prod-12"
                className="inline-flex items-center gap-2 bg-white text-amber-900 font-bold px-6 py-3 rounded-full hover:bg-amber-100 transition-colors shadow-md text-sm"
              >
                View Gift Hamper <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-amber-700 text-xs font-bold uppercase tracking-wider block mb-1">Most Loved</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Popular Khmer Food Products</h2>
          </div>
          <Link to="/products" className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1 group">
            Explore All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="bg-stone-100/80 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-amber-700 text-xs font-bold uppercase tracking-wider block">Customer Stories</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Loved by Food Lovers Across Cambodia</h2>
            <p className="text-stone-600 text-sm">Read authentic feedback from customers who enjoy our traditional Khmer ingredients.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map(rev => (
              <div key={rev.id} className="bg-white p-6 rounded-2xl shadow-xs border border-stone-200 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-stone-700 text-sm leading-relaxed italic">"{rev.comment}"</p>
                </div>

                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-stone-100">
                  <img src={rev.userAvatar} alt={rev.userName} className="w-10 h-10 rounded-full object-cover border border-amber-600" />
                  <div>
                    <p className="font-bold text-stone-900 text-sm">{rev.userName}</p>
                    <p className="text-[11px] text-stone-400">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
