import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';

export const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="bg-white rounded-3xl shadow-xl border border-stone-200 p-8 sm:p-12 space-y-6">
        
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
            Order Confirmed Successfully
          </span>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Thank You for Your Order!</h1>
          <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
            Your payment has been verified and your order has been successfully placed. We are now preparing your authentic Khmer food items.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          {orderId && (
            <Link
              to={`/orders/${orderId}`}
              className="flex-1 bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs"
            >
              <Package className="w-4 h-4" /> View Order Details
            </Link>
          )}
          <Link
            to="/"
            className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
          >
            <Home className="w-4 h-4" /> Return to Home
          </Link>
        </div>

      </div>
    </div>
  );
};
