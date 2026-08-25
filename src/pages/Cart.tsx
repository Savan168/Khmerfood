import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';

export const Cart: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, cartSubtotal, cartDiscount, clearCart } = useApp();
  const navigate = useNavigate();

  const deliveryFee = cart.length > 0 ? (cartSubtotal >= 50 ? 0 : 2.50) : 0;
  const finalTotal = cartSubtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-700 shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-bold text-stone-900">Your Cart is Empty</h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Looks like you haven't added any authentic Khmer food products to your shopping cart yet.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-3.5 rounded-full transition-all shadow-md text-sm"
        >
          Explore Khmer Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Shopping Cart</h1>
          <p className="text-xs text-stone-500 mt-0.5">Review your selected items before checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart items list */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => {
            const price = item.product.discountPrice ?? item.product.price;
            return (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center gap-4"
              >
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.name} 
                  className="w-24 h-24 rounded-xl object-cover shrink-0 border border-stone-100"
                />

                <div className="flex-1 text-center sm:text-left space-y-1">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">{item.product.categoryName}</span>
                  <h3 className="font-semibold text-stone-900 text-sm">{item.product.name}</h3>
                  <p className="text-xs text-stone-500 font-serif">{item.product.khmerName}</p>
                  <p className="text-sm font-bold text-stone-900 mt-1">${price.toFixed(2)} each</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="p-2 text-stone-600 hover:text-stone-900"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-stone-900">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.product.stock}
                    className="p-2 text-stone-600 hover:text-stone-900 disabled:opacity-40"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right sm:w-28">
                  <p className="text-xs text-stone-500 font-medium">Subtotal</p>
                  <p className="text-base font-serif font-bold text-stone-900">${(price * item.quantity).toFixed(2)}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                  className="p-2 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}

          <div className="pt-2">
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 hover:text-amber-800"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-md h-fit space-y-6">
          <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-4">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-900">${cartSubtotal.toFixed(2)}</span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Product Discounts</span>
                <span>-${cartDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Fee {cartSubtotal >= 50 && <span className="text-emerald-600 font-bold">(Free Over $50)</span>}</span>
              <span className="font-semibold text-stone-900">{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 flex justify-between items-baseline">
            <span className="font-semibold text-stone-900 text-sm">Final Total</span>
            <span className="text-2xl font-serif font-bold text-stone-900">${finalTotal.toFixed(2)}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
