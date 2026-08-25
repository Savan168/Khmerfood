import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, Heart, Bell, Wallet, User as UserIcon, 
  Search, Menu, X, ChevronDown, Package, LogOut, Settings, MapPin, Sparkles 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    user, isAuthenticated, logout, cartItemCount, wishlist, 
    walletBalance, notifications, markNotificationAsRead, 
    markAllNotificationsAsRead, unreadNotificationCount 
  } = useApp();
  
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              A
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-emerald-900 block leading-tight">
                ANGKOR<span className="text-amber-600">TASTE</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-slate-400 font-semibold block">
                Khmer Food Market
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search Khmer food, Kampot pepper, palm sugar, prahok..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-full py-2.5 pl-11 pr-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-inner"
            />
            <Search className="absolute left-4 top-3 w-4 h-4 text-slate-400" />
            <button type="submit" className="absolute right-1.5 top-1.5 bg-emerald-700 text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-emerald-800 transition-colors">
              Search
            </button>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Wallet Balance widget */}
            {isAuthenticated && (
              <Link 
                to="/wallet" 
                className="hidden lg:flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-full text-emerald-900 hover:bg-emerald-100/80 transition-colors shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
                  $
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider leading-none">Wallet</p>
                  <p className="text-xs font-bold text-emerald-950">${walletBalance.toFixed(2)}</p>
                </div>
              </Link>
            )}

            {/* Wishlist Icon */}
            <Link 
              to="/wishlist" 
              aria-label="Wishlist"
              className="relative p-2.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-50 rounded-full transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link 
              to="/cart" 
              aria-label="Shopping Cart"
              className="relative p-2.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-50 rounded-full transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Notifications Dropdown */}
            {isAuthenticated && (
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  className="relative p-2.5 text-stone-700 hover:text-amber-700 hover:bg-amber-50 rounded-full transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotificationCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                      {unreadNotificationCount}
                    </span>
                  )}
                </button>

                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-stone-200 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between px-4 pb-3 border-b border-stone-100">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-stone-900 text-sm">Notifications</h3>
                        {unreadNotificationCount > 0 && (
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {unreadNotificationCount} new
                          </span>
                        )}
                      </div>
                      {unreadNotificationCount > 0 && (
                        <button 
                          onClick={markAllNotificationsAsRead}
                          className="text-xs text-amber-700 hover:underline font-medium"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
                      {notifications.length === 0 ? (
                        <div className="py-8 text-center text-stone-500 text-xs">
                          No notifications yet.
                        </div>
                      ) : (
                        notifications.map(notif => (
                          <div 
                            key={notif.id}
                            onClick={() => {
                              markNotificationAsRead(notif.id);
                              if (notif.link) navigate(notif.link);
                              setNotifDropdownOpen(false);
                            }}
                            className={`p-3.5 hover:bg-stone-50 cursor-pointer transition-colors flex gap-3 ${!notif.isRead ? 'bg-amber-50/40' : ''}`}
                          >
                            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                              <Package className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-stone-900 flex items-center justify-between">
                                {notif.title}
                                {!notif.isRead && <span className="w-2 h-2 rounded-full bg-amber-600"></span>}
                              </p>
                              <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{notif.message}</p>
                              <span className="text-[10px] text-stone-400 mt-1 block">
                                {new Date(notif.createdAt).toLocaleDateString()} {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="pt-2 px-4 border-t border-stone-100 text-center">
                      <Link 
                        to="/notifications" 
                        onClick={() => setNotifDropdownOpen(false)}
                        className="text-xs font-medium text-amber-700 hover:text-amber-800"
                      >
                        View all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile Menu */}
            {isAuthenticated && user ? (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-stone-100 transition-colors border border-stone-200"
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-7 h-7 rounded-full object-cover border border-amber-600"
                  />
                  <span className="hidden sm:inline text-sm font-semibold text-stone-800 max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2.5 border-b border-stone-100">
                      <p className="text-xs text-stone-500 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-stone-900 truncate">{user.name}</p>
                    </div>

                    <div className="py-1">
                      <Link 
                        to="/dashboard" 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:text-amber-700"
                      >
                        <UserIcon className="w-4 h-4" /> Customer Dashboard
                      </Link>
                      <Link 
                        to="/orders" 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:text-amber-700"
                      >
                        <Package className="w-4 h-4" /> My Orders
                      </Link>
                      <Link 
                        to="/wallet" 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:text-amber-700"
                      >
                        <Wallet className="w-4 h-4" /> My Wallet (${walletBalance.toFixed(2)})
                      </Link>
                      <Link 
                        to="/addresses" 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:text-amber-700"
                      >
                        <MapPin className="w-4 h-4" /> Delivery Addresses
                      </Link>
                      <Link 
                        to="/profile" 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:text-amber-700"
                      >
                        <Settings className="w-4 h-4" /> Profile & Settings
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-stone-100">
                      <button 
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  to="/login"
                  className="text-xs sm:text-sm font-semibold text-stone-700 hover:text-amber-700 px-3 py-2"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register"
                  className="bg-amber-700 hover:bg-amber-800 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow-sm transition-all"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-amber-700 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Navigation Links Bar */}
        <nav className="hidden md:flex items-center justify-between py-3 border-t border-stone-100 text-sm font-medium text-stone-700">
          <div className="flex items-center gap-8">
            <Link to="/" className="hover:text-amber-700 transition-colors">Home</Link>
            <Link to="/products" className="hover:text-amber-700 transition-colors">All Products</Link>
            <Link to="/products?category=cat-1" className="hover:text-amber-700 transition-colors">Khmer Snacks</Link>
            <Link to="/products?category=cat-4" className="hover:text-amber-700 transition-colors">Kampot Spices</Link>
            <Link to="/products?category=cat-5" className="hover:text-amber-700 transition-colors">Prahok & Pastes</Link>
            <Link to="/products?category=cat-3" className="hover:text-amber-700 transition-colors">Desserts</Link>
            <Link to="/products?category=cat-8" className="hover:text-amber-700 transition-colors">Gift Sets</Link>
          </div>
          <div className="flex items-center gap-6 text-xs font-semibold text-amber-800">
            <span className="bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              🇰🇭 100% Authentic Cambodian Products
            </span>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <form onSubmit={handleSearch} className="relative mt-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-100 border border-stone-200 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
          </form>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-stone-50 rounded-xl font-medium text-stone-800 text-xs hover:bg-amber-50 hover:text-amber-700 text-center"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-stone-50 rounded-xl font-medium text-stone-800 text-xs hover:bg-amber-50 hover:text-amber-700 text-center"
            >
              Products
            </Link>
            <Link 
              to="/cart" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-stone-50 rounded-xl font-medium text-stone-800 text-xs hover:bg-amber-50 hover:text-amber-700 text-center"
            >
              Cart ({cartItemCount})
            </Link>
            <Link 
              to="/wishlist" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-stone-50 rounded-xl font-medium text-stone-800 text-xs hover:bg-amber-50 hover:text-amber-700 text-center"
            >
              Wishlist ({wishlist.length})
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  to="/dashboard" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 bg-stone-50 rounded-xl font-medium text-stone-800 text-xs hover:bg-amber-50 hover:text-amber-700 text-center"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/orders" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 bg-stone-50 rounded-xl font-medium text-stone-800 text-xs hover:bg-amber-50 hover:text-amber-700 text-center"
                >
                  My Orders
                </Link>
                <Link 
                  to="/wallet" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 bg-stone-50 rounded-xl font-medium text-stone-800 text-xs hover:bg-amber-50 hover:text-amber-700 text-center col-span-2"
                >
                  Wallet Balance: ${walletBalance.toFixed(2)}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
