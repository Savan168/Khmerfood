import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Wallet, Package, Clock, CheckCircle2, Heart, 
  ArrowRight, MapPin, Sparkles, User as UserIcon, Plus 
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, walletBalance, orders, wishlist, products } = useApp();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const pendingOrders = orders.filter(o => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed' || o.orderStatus === 'Processing' || o.orderStatus === 'Shipping').length;
  const completedOrders = orders.filter(o => o.orderStatus === 'Delivered').length;
  const recentOrders = orders.slice(0, 3);
  const recommendedProducts = products.filter(p => p.isRecommended || p.isFeatured).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 px-3 py-1 rounded-full text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Customer Dashboard</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">Welcome back, {user.name}!</h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
            Manage your orders, digital wallet, delivery addresses, and discover authentic Khmer food specialties.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 shrink-0">
          <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-amber-400" />
          <div>
            <p className="font-bold text-white text-sm">{user.name}</p>
            <p className="text-xs text-amber-300">{user.email}</p>
            <Link to="/profile" className="text-[11px] text-white/80 hover:text-white underline mt-1 block font-medium">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          onClick={() => navigate('/wallet')}
          className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="space-y-1">
            <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Wallet Balance</p>
            <p className="text-2xl font-serif font-bold text-stone-900">${walletBalance.toFixed(2)}</p>
            <p className="text-[11px] text-amber-700 font-semibold group-hover:underline">Top Up Wallet →</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Wallet className="w-6 h-6" />
          </div>
        </div>

        <div 
          onClick={() => navigate('/orders')}
          className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="space-y-1">
            <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Total Orders</p>
            <p className="text-2xl font-serif font-bold text-stone-900">{orders.length}</p>
            <p className="text-[11px] text-amber-700 font-semibold group-hover:underline">View All Orders →</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div 
          onClick={() => navigate('/orders')}
          className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="space-y-1">
            <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Pending Orders</p>
            <p className="text-2xl font-serif font-bold text-stone-900">{pendingOrders}</p>
            <p className="text-[11px] text-amber-700 font-semibold group-hover:underline">Track Active Orders →</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div 
          onClick={() => navigate('/wishlist')}
          className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="space-y-1">
            <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Wishlist Items</p>
            <p className="text-2xl font-serif font-bold text-stone-900">{wishlist.length}</p>
            <p className="text-[11px] text-amber-700 font-semibold group-hover:underline">View Wishlist →</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-stone-900">Recent Orders</h3>
          <Link to="/orders" className="text-xs font-semibold text-amber-700 hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-xs text-stone-500 py-8 text-center">You have no orders yet.</p>
        ) : (
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div 
                key={order.id}
                onClick={() => navigate(`/orders/${order.id}`)}
                className="p-5 rounded-2xl border border-stone-200 hover:border-amber-600 transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 bg-stone-50/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                    📦
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">Order #{order.orderNumber}</span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        order.orderStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {order.items.length} items • Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-base font-serif font-bold text-stone-900">${order.total.toFixed(2)}</p>
                  <p className="text-[11px] text-amber-700 font-semibold">View Details →</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Products */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-amber-700 text-xs font-bold uppercase tracking-wider block mb-1">Recommended for You</span>
            <h3 className="font-serif text-2xl font-bold text-stone-900">Popular Khmer Specialties</h3>
          </div>
          <Link to="/products" className="text-xs font-semibold text-amber-700 hover:underline">
            Explore Catalog →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommendedProducts.map(prod => (
            <div 
              key={prod.id}
              onClick={() => navigate(`/products/${prod.id}`)}
              className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3"
            >
              <img src={prod.images[0]} alt="" className="w-full aspect-square object-cover rounded-xl" />
              <div>
                <p className="text-[10px] font-bold text-amber-700 uppercase">{prod.categoryName}</p>
                <h4 className="font-semibold text-stone-900 text-sm truncate">{prod.name}</h4>
                <p className="text-sm font-bold text-stone-900 mt-1">${(prod.discountPrice ?? prod.price).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
