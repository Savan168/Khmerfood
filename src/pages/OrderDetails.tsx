import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Package, MapPin, Truck, ShieldCheck, ArrowLeft, 
  CheckCircle2, Clock, XCircle, RefreshCw 
} from 'lucide-react';
import { OrderStatus } from '../types';

export const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders, cancelOrder } = useApp();

  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-stone-900">Order Not Found</h2>
        <p className="text-xs text-stone-500">The order you are looking for does not exist.</p>
        <Link to="/orders" className="bg-amber-700 text-white text-xs font-semibold px-6 py-2.5 rounded-full">
          Back to Orders
        </Link>
      </div>
    );
  }

  const statuses: OrderStatus[] = ['Pending', 'Confirmed', 'Processing', 'Shipping', 'Delivered'];
  const currentStatusIdx = statuses.indexOf(order.orderStatus);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex items-center justify-between">
        <Link to="/orders" className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-amber-700">
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </Link>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
          order.orderStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
          order.orderStatus === 'Cancelled' ? 'bg-rose-100 text-rose-800' :
          'bg-amber-100 text-amber-800'
        }`}>
          Status: {order.orderStatus}
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-xs space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-stone-900">Order #{order.orderNumber}</h1>
            <p className="text-xs text-stone-500 mt-1">
              Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-stone-500 font-medium">Payment Status</p>
            <p className="text-sm font-bold text-stone-900">{order.paymentMethod} ({order.paymentStatus})</p>
          </div>
        </div>

        {/* Order Tracking Timeline */}
        {order.orderStatus !== 'Cancelled' && (
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
            <h3 className="font-semibold text-stone-900 text-sm">Order Tracking Timeline</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-2">
              {statuses.map((st, idx) => {
                const isPassed = currentStatusIdx >= idx;
                const isCurrent = order.orderStatus === st;
                return (
                  <div key={st} className="flex flex-col items-center text-center space-y-2 relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isPassed ? 'bg-amber-700 text-white shadow-md' : 'bg-stone-200 text-stone-500'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className={`text-xs font-medium ${isCurrent ? 'text-amber-800 font-bold' : 'text-stone-600'}`}>
                      {st}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="space-y-4">
          <h3 className="font-semibold text-stone-900 text-sm">Ordered Products</h3>
          <div className="divide-y divide-stone-100">
            {order.items.map(item => (
              <div key={item.id} className="py-4 first:pt-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <img src={item.productImage} alt="" className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-stone-100" />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-stone-900 text-sm truncate">{item.productName}</h4>
                    <p className="text-xs text-stone-500">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <span className="text-base font-serif font-bold text-stone-900 shrink-0">${item.subtotal.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Address and Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-stone-100">
          <div className="space-y-3 bg-stone-50 p-6 rounded-2xl border border-stone-200">
            <h4 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-700" /> Shipping Address
            </h4>
            <div className="text-xs text-stone-600 space-y-1">
              <p className="font-bold text-stone-900">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.phone}</p>
              <p>{order.shippingAddress.streetHouse}, {order.shippingAddress.commune}</p>
              <p>{order.shippingAddress.district}, {order.shippingAddress.province}</p>
              {order.shippingAddress.additionalInfo && (
                <p className="italic text-stone-500 pt-1">Note: {order.shippingAddress.additionalInfo}</p>
              )}
            </div>
          </div>

          <div className="space-y-3 bg-stone-50 p-6 rounded-2xl border border-stone-200">
            <h4 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
              <Package className="w-4 h-4 text-amber-700" /> Cost Breakdown
            </h4>
            <div className="text-xs text-stone-600 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee ({order.deliveryMethod})</span>
                <span className="font-semibold text-stone-900">${order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                <span className="font-bold text-stone-900 text-sm">Total Paid</span>
                <span className="text-xl font-serif font-bold text-stone-900">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        {(order.orderStatus === 'Pending' || order.orderStatus === 'Confirmed') && (
          <div className="pt-4 flex justify-end">
            <button
              onClick={() => cancelOrder(order.id)}
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold px-6 py-3 rounded-xl transition-colors border border-rose-200"
            >
              Cancel This Order
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
