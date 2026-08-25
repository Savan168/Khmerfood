import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, RefreshCw, ShoppingBag } from 'lucide-react';

export const PaymentFailed: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="bg-white rounded-3xl shadow-xl border border-stone-200 p-8 sm:p-12 space-y-6">
        
        <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <XCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="bg-rose-50 text-rose-700 text-xs font-bold px-3 py-1 rounded-full border border-rose-200">
            Payment Transaction Failed
          </span>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Unable to Complete Payment</h1>
          <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
            Your payment could not be processed at this time. Please check your balance, verify your bank account, or try another payment method.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link
            to="/checkout"
            className="flex-1 bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </Link>
          <Link
            to="/cart"
            className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
          >
            <ShoppingBag className="w-4 h-4" /> Back to Cart
          </Link>
        </div>

      </div>
    </div>
  );
};
