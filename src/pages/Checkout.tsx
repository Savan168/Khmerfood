import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  MapPin, Truck, ShieldCheck, CheckCircle2, Plus, 
  Wallet, QrCode, Building, Banknote, ArrowRight, ArrowLeft 
} from 'lucide-react';
import { DeliveryMethod, PaymentMethod } from '../types';

export const Checkout: React.FC = () => {
  const { 
    cart, cartSubtotal, cartDiscount, addresses, 
    addAddress, walletBalance, createOrder 
  } = useApp();
  const navigate = useNavigate();

  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses.find(a => a.isDefault)?.id || addresses[0]?.id || ''
  );
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('Standard Delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Wallet');

  // Add new address modal state
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newProvince, setNewProvince] = useState('Phnom Penh');
  const [newDistrict, setNewDistrict] = useState('');
  const [newCommune, setNewCommune] = useState('');
  const [newStreetHouse, setNewStreetHouse] = useState('');
  const [newAdditionalInfo, setNewAdditionalInfo] = useState('');

  const deliveryFee = deliveryMethod === 'Express Delivery' ? 3.50 : 1.50;
  const finalTotal = cartSubtotal + deliveryFee;

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newPhone || !newDistrict || !newStreetHouse) return;

    addAddress({
      fullName: newFullName,
      phone: newPhone,
      province: newProvince,
      district: newDistrict,
      commune: newCommune,
      streetHouse: newStreetHouse,
      additionalInfo: newAdditionalInfo,
      isDefault: addresses.length === 0
    });

    setNewFullName('');
    setNewPhone('');
    setNewDistrict('');
    setNewCommune('');
    setNewStreetHouse('');
    setNewAdditionalInfo('');
    setShowNewAddressForm(false);
  };

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      alert('Please select a shipping address.');
      return;
    }

    if (paymentMethod === 'Wallet' && walletBalance < finalTotal) {
      alert(`Insufficient wallet balance ($${walletBalance.toFixed(2)} available, $${finalTotal.toFixed(2)} required). Please top up your wallet or choose another payment method.`);
      navigate('/wallet');
      return;
    }

    // If payment method is KHQR or Bank Transfer, redirect to payment simulator page or create order with pending/paid status
    if (paymentMethod === 'KHQR' || paymentMethod === 'Bank Transfer') {
      // Store checkout temp state in sessionStorage
      sessionStorage.setItem('temp_checkout', JSON.stringify({
        addressId: selectedAddressId,
        deliveryMethod,
        paymentMethod,
        total: finalTotal
      }));
      navigate('/payment');
      return;
    }

    const res = createOrder(selectedAddressId, deliveryMethod, paymentMethod);
    if (res.success && res.orderId) {
      navigate(`/payment/success?orderId=${res.orderId}`);
    } else {
      alert(res.message);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">Checkout & Payment</h1>
        <p className="text-xs text-stone-500 mt-0.5">Complete your shipping and secure payment details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Steps */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Step 1: Shipping Address */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-700" /> 1. Shipping Address
              </h3>
              <button
                onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                className="text-xs font-semibold text-amber-700 hover:underline flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add New Address
              </button>
            </div>

            {/* New address form */}
            {showNewAddressForm && (
              <form onSubmit={handleAddNewAddress} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4 animate-in fade-in">
                <h4 className="font-semibold text-stone-900 text-sm">Add Delivery Address</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Sophea Chan"
                      value={newFullName}
                      onChange={e => setNewFullName(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+855 12 345 678"
                      value={newPhone}
                      onChange={e => setNewPhone(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Province / City</label>
                    <select
                      value={newProvince}
                      onChange={e => setNewProvince(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs"
                    >
                      <option value="Phnom Penh">Phnom Penh</option>
                      <option value="Siem Reap">Siem Reap</option>
                      <option value="Battambang">Battambang</option>
                      <option value="Kampot">Kampot</option>
                      <option value="Kandal">Kandal</option>
                      <option value="Takeo">Takeo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">District / Khan</label>
                    <input
                      type="text"
                      required
                      placeholder="Daun Penh"
                      value={newDistrict}
                      onChange={e => setNewDistrict(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Commune / Sangkat</label>
                    <input
                      type="text"
                      required
                      placeholder="Phsar Kandal"
                      value={newCommune}
                      onChange={e => setNewCommune(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Street / House No.</label>
                  <input
                    type="text"
                    required
                    placeholder="House #45, Street 19"
                    value={newStreetHouse}
                    onChange={e => setNewStreetHouse(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewAddressForm(false)}
                    className="px-4 py-2 bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-700 text-white rounded-xl text-xs font-semibold hover:bg-amber-800"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}

            {/* Address list selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map(addr => (
                <div
                  key={addr.id}
                  onClick={() => setSelectedAddressId(addr.id)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    selectedAddressId === addr.id 
                      ? 'border-amber-600 bg-amber-50/50 shadow-sm' 
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900 text-sm">{addr.fullName}</span>
                      {addr.isDefault && (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md">Default</span>
                      )}
                    </div>
                    <p className="text-xs text-stone-600">{addr.phone}</p>
                    <p className="text-xs text-stone-600 mt-2">{addr.streetHouse}, {addr.commune}, {addr.district}, {addr.province}</p>
                  </div>
                  <div className="pt-4 flex items-center justify-between text-xs text-amber-700 font-semibold">
                    <span>{selectedAddressId === addr.id ? 'Selected' : 'Select'}</span>
                    {selectedAddressId === addr.id && <CheckCircle2 className="w-4 h-4 text-amber-700" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Delivery Option */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-4">
              <Truck className="w-5 h-5 text-amber-700" /> 2. Delivery Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setDeliveryMethod('Standard Delivery')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  deliveryMethod === 'Standard Delivery' 
                    ? 'border-amber-600 bg-amber-50/50 shadow-sm' 
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Standard Delivery</h4>
                  <p className="text-xs text-stone-500 mt-0.5">2–3 Business Days</p>
                </div>
                <span className="font-bold text-stone-900 text-sm">$1.50</span>
              </div>

              <div
                onClick={() => setDeliveryMethod('Express Delivery')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  deliveryMethod === 'Express Delivery' 
                    ? 'border-amber-600 bg-amber-50/50 shadow-sm' 
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Express Delivery</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Same-day delivery (Phnom Penh)</p>
                </div>
                <span className="font-bold text-stone-900 text-sm">$3.50</span>
              </div>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-4">
              <ShieldCheck className="w-5 h-5 text-amber-700" /> 3. Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setPaymentMethod('Wallet')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  paymentMethod === 'Wallet' 
                    ? 'border-amber-600 bg-amber-50/50 shadow-sm' 
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">Angkor Digital Wallet</h4>
                    <p className="text-xs text-stone-500 mt-0.5">Balance: ${walletBalance.toFixed(2)}</p>
                  </div>
                </div>
                {walletBalance < finalTotal && (
                  <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-md">Low Balance</span>
                )}
              </div>

              <div
                onClick={() => setPaymentMethod('KHQR')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  paymentMethod === 'KHQR' 
                    ? 'border-amber-600 bg-amber-50/50 shadow-sm' 
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">KHQR (ABA / Acleda / Bakong)</h4>
                    <p className="text-xs text-stone-500 mt-0.5">Scan & Pay securely</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod('Bank Transfer')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  paymentMethod === 'Bank Transfer' 
                    ? 'border-amber-600 bg-amber-50/50 shadow-sm' 
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">Direct Bank Transfer</h4>
                    <p className="text-xs text-stone-500 mt-0.5">ABA Bank / Canadia Bank</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  paymentMethod === 'Cash on Delivery' 
                    ? 'border-amber-600 bg-amber-50/50 shadow-sm' 
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">Cash on Delivery (COD)</h4>
                    <p className="text-xs text-stone-500 mt-0.5">Pay when your order arrives</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Summary Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-md space-y-6 sticky top-28">
            <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-4">
              Order Summary ({cart.length} items)
            </h3>

            <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-stone-100">
              {cart.map(item => {
                const price = item.product.discountPrice ?? item.product.price;
                return (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <img src={item.product.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-stone-900 truncate">{item.product.name}</p>
                      <p className="text-[11px] text-stone-500">Qty: {item.quantity} × ${price.toFixed(2)}</p>
                    </div>
                    <span className="text-xs font-bold text-stone-900">${(price * item.quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 pt-4 border-t border-stone-200 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">${cartSubtotal.toFixed(2)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount</span>
                  <span>-${cartDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery ({deliveryMethod})</span>
                <span className="font-semibold text-stone-900">${deliveryFee.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-between items-baseline">
              <span className="font-semibold text-stone-900 text-sm">Total Amount</span>
              <span className="text-2xl font-serif font-bold text-stone-900">${finalTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
            >
              {paymentMethod === 'KHQR' || paymentMethod === 'Bank Transfer' ? 'Proceed to Payment' : 'Place Order Now'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
