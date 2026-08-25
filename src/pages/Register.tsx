import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Mail, Lock, User, Phone, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const Register: React.FC = () => {
  const { register } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const success = register(name, email, phone, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-stone-200 p-8 sm:p-10">
        
        <div className="text-center mb-8 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-700 text-white flex items-center justify-center mx-auto shadow-md">
            <span className="font-serif text-xl font-bold">អង្គរ</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">Create an Account</h1>
          <p className="text-xs text-stone-500">Join AngkorTaste to order authentic Khmer products & receive $50 bonus wallet</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Sophea Chan"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white transition-all"
              />
              <User className="absolute left-4 top-3.5 w-4 h-4 text-stone-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="sophea@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white transition-all"
              />
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-stone-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
            <div className="relative">
              <input
                type="tel"
                required
                placeholder="+855 12 345 678"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white transition-all"
              />
              <Phone className="absolute left-4 top-3.5 w-4 h-4 text-stone-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white transition-all"
              />
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-stone-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white transition-all"
              />
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-stone-400" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-2"
          >
            Create Account <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-stone-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-amber-700 hover:underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
};
