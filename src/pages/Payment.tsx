import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { QrCode, Building, ShieldCheck, CheckCircle, RefreshCw, XCircle } from 'lucide-react';

export const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { createOrder } = useApp();
  const [checkoutData, setCheckoutData] = useState<{
    addressId: string;
    deliveryMethod: any;
    paymentMethod: any;
    total: number;
  } | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem('temp_checkout');
    if (!data) {
      navigate('/cart');
      return;
    }
    setCheckoutData(JSON.parse(data));
  }, [navigate]);

  const handleConfirmPayment = (success: boolean) => {
    if (!checkoutData) return;
    setIsProcessing(true);

    setTimeout(() => {
      if (success) {
        const res = createOrder(checkoutData.addressId, checkoutData.deliveryMethod, checkoutData.paymentMethod);
        sessionStorage.removeItem('temp_checkout');
        if (res.success && res.orderId) {
          navigate(`/payment/success?orderId=${res.orderId}`);
        } else {
          navigate('/payment/failed');
        }
      } else {
        sessionStorage.removeItem('temp_checkout');
        navigate('/payment/failed');
      }
    }, 1500);
  };

  if (!checkoutData) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl shadow-xl border border-stone-200 p-8 sm:p-10 text-center space-y-8">
        
        <div className="space-y-2">
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Secure Payment Gateway
          </span>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            {checkoutData.paymentMethod === 'KHQR' ? 'Scan KHQR to Pay' : 'Direct Bank Transfer'}
          </h1>
          <p className="text-xs text-stone-500">
            Amount to Pay: <strong className="text-stone-900 text-base font-serif">${checkoutData.total.toFixed(2)}</strong>
          </p>
        </div>

        {checkoutData.paymentMethod === 'KHQR' ? (
          <div className="space-y-6">
            <div className="w-64 h-64 bg-stone-50 border-2 border-stone-200 rounded-3xl p-4 mx-auto flex items-center justify-center shadow-inner relative group">
              <QrCode className="w-56 h-56 text-stone-900" />
              <div className="absolute inset-0 bg-white/90 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                <p className="font-bold text-stone-900 text-sm">AngkorTaste Merchant QR</p>
                <p className="text-xs text-stone-500 mt-1">ABA Bank / Bakong</p>
              </div>
            </div>
            <p className="text-xs text-stone-500">
              Open your ABA Mobile, ACLEDA, or any Bakong-supported app to scan and pay instantly.
            </p>
          </div>
        ) : (
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 text-left space-y-3 max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <Building className="w-6 h-6 text-amber-700" />
              <div>
                <p className="font-bold text-stone-900 text-sm">ABA Bank Cambodia</p>
                <p className="text-xs text-stone-500">Account Name: ANGKORTASTE CO., LTD</p>
              </div>
            </div>
            <div className="pt-2 border-t border-stone-200 text-xs space-y-1 text-stone-700">
              <p>Account Number: <strong className="text-stone-900">000 888 999 (USD)</strong></p>
              <p>Transfer Reference: <strong className="text-stone-900">AT-{Date.now().toString().slice(-6)}</strong></p>
            </div>
          </div>
        )}

        {isProcessing ? (
          <div className="py-8 space-y-3">
            <RefreshCw className="w-8 h-8 text-amber-700 animate-spin mx-auto" />
            <p className="text-xs font-semibold text-stone-700">Verifying payment with bank...</p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => handleConfirmPayment(true)}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
            >
              <CheckCircle className="w-4 h-4" /> Simulate Successful Payment
            </button>
            <button
              onClick={() => handleConfirmPayment(false)}
              className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm border border-rose-200"
            >
              <XCircle className="w-4 h-4" /> Simulate Failed Payment
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
