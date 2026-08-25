import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Features banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-900/50 text-emerald-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">100% Authentic</h4>
              <p className="text-xs text-slate-400 mt-0.5">Sourced directly from local farmers in Kampot, Battambang & Siem Reap</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-900/50 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Nationwide Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Fast & secure delivery across all provinces in Cambodia</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-900/50 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Secure Payment</h4>
              <p className="text-xs text-slate-400 mt-0.5">KHQR, Wallet, Bank Transfer & Cash on Delivery</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-900/50 text-emerald-400 flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Quality Guaranteed</h4>
              <p className="text-xs text-slate-400 mt-0.5">Freshness inspection and easy return policy</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12 border-b border-slate-800">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <span className="font-serif text-xl font-bold text-white">
                ANGKOR<span className="text-amber-500">TASTE</span>
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Your premier destination for authentic Khmer food products, organic Kampot pepper, palm sugar, traditional dried food, and artisanal gift sets.
            </p>
            <div className="space-y-2 text-xs text-stone-400">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-500 shrink-0" /> #88, Preah Monivong Blvd, Phnom Penh, Cambodia</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-500 shrink-0" /> +855 23 999 888 / +855 12 345 678</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-amber-500 shrink-0" /> support@angkortaste.com.kh</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-amber-400 transition-colors">All Products</Link></li>
              <li><Link to="/cart" className="hover:text-amber-400 transition-colors">Shopping Cart</Link></li>
              <li><Link to="/wishlist" className="hover:text-amber-400 transition-colors">My Wishlist</Link></li>
              <li><Link to="/dashboard" className="hover:text-amber-400 transition-colors">Customer Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 tracking-wider uppercase">Khmer Categories</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/products?category=cat-1" className="hover:text-amber-400 transition-colors">Khmer Snacks</Link></li>
              <li><Link to="/products?category=cat-2" className="hover:text-amber-400 transition-colors">Dried Food & Jerky</Link></li>
              <li><Link to="/products?category=cat-4" className="hover:text-amber-400 transition-colors">Kampot Pepper & Spices</Link></li>
              <li><Link to="/products?category=cat-5" className="hover:text-amber-400 transition-colors">Prahok & Pastes</Link></li>
              <li><Link to="/products?category=cat-8" className="hover:text-amber-400 transition-colors">Artisanal Gift Sets</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 tracking-wider uppercase">Customer Account</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/orders" className="hover:text-amber-400 transition-colors">My Orders & Tracking</Link></li>
              <li><Link to="/wallet" className="hover:text-amber-400 transition-colors">Digital Wallet & Top Up</Link></li>
              <li><Link to="/addresses" className="hover:text-amber-400 transition-colors">Delivery Addresses</Link></li>
              <li><Link to="/profile" className="hover:text-amber-400 transition-colors">Profile & Security</Link></li>
              <li><Link to="/notifications" className="hover:text-amber-400 transition-colors">Notifications</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 AngkorTaste Khmer Food Market. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-400 cursor-pointer">Security & Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
