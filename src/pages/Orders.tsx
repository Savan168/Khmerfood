import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Package, Clock, CheckCircle2, XCircle, ArrowRight, Eye, RefreshCw } from 'lucide-react';
import { OrderStatus } from '../types';

export const Orders: React.FC = () => {
  const { orders, cancelOrder, addToCart } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('All');

  const tabs = ['All', 'Pending', 'Confirmed', 'Processing', 'Shipping', 'Delivered', 'Cancelled'];

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'All') return true;
    return order.orderStatus === activeTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">My Orders</h1>
        <p className="text-xs text-stone-500 mt-0.5">Track, review, and manage your Khmer food orders</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-stone-200">
        {tabs.map(tab => {
          const count = tab === 'All' ? orders.length : orders.filter(o => o.orderStatus === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab 
                  ? 'bg-amber-700 text-white shadow-sm' 
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <span>{tab}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === tab ? 'bg-amber-800 text-white' : 'bg-stone-200 text-stone-700'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-16 text-center space-y-4">
          <div className="w-16 h-16 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900">No orders found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">You don't have any orders with status "{activeTab}".</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-all"
          >
            Start Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map(order => (
            <div 
              key={order.id}
              className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-serif font-bold text-stone-900 text-base">Order #{order.orderNumber}</span>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                      order.orderStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                      order.orderStatus === 'Cancelled' ? 'bg-rose-100 text-rose-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-stone-500 font-medium">Total Amount</p>
                  <p className="text-xl font-serif font-bold text-stone-900">${order.total.toFixed(2)}</p>
                </div>
              </div>

              {/* Items Preview */}
              <div className="space-y-3">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={item.productImage} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-100" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-stone-900 truncate">{item.productName}</p>
                        <p className="text-[11px] text-stone-500">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-900 shrink-0">${item.subtotal.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Footer actions */}
              <div className="pt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-stone-500 space-y-0.5">
                  <p>Payment: <strong className="text-stone-800">{order.paymentMethod} ({order.paymentStatus})</strong></p>
                  <p>Delivery: <strong className="text-stone-800">{order.deliveryMethod}</strong></p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={`/orders/${order.id}`}
                    className="bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" /> View Details & Tracking
                  </Link>

                  {(order.orderStatus === 'Pending' || order.orderStatus === 'Confirmed') && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
                    >
                      Cancel Order
                    </button>
                  )}

                  {order.orderStatus === 'Delivered' && (
                    <button
                      onClick={() => {
                        order.items.forEach(i => {
                          // reorder items
                        });
                        navigate('/cart');
                      }}
                      className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Buy Again
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
