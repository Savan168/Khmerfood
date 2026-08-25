import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const { addToast } = useApp();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    addToast('Password reset instructions sent to your email.');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-stone-200 p-8 sm:p-10">
        
        <div className="text-center mb-8 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-700 text-white flex items-center justify-center mx-auto shadow-md">
            <span className="font-serif text-xl font-bold">អង្គរ</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">Reset Password</h1>
          <p className="text-xs text-stone-500">Enter your email address and we'll send you a recovery link</p>
        </div>

        {submitted ? (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-stone-900">Check your email</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                We have sent password recovery instructions to <span className="font-medium text-stone-800">{email}</span>.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 hover:text-amber-800"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              Send Reset Link
            </button>

            <div className="pt-4 text-center">
              <Link to="/login" className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-amber-700">
                <ArrowLeft className="w-4 h-4" /> Back to Sign In
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
