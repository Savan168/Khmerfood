import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Bell, CheckCheck, Package } from 'lucide-react';

export const Notifications: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, unreadNotificationCount } = useApp();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Notifications</h1>
          <p className="text-xs text-stone-500 mt-0.5">Stay updated on your orders, payments, and wallet top-ups</p>
        </div>

        {unreadNotificationCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold px-4 py-2.5 rounded-xl transition-colors text-xs flex items-center gap-1.5 border border-amber-200"
          >
            <CheckCheck className="w-4 h-4" /> Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-xs space-y-4">
        {notifications.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <Bell className="w-10 h-10 text-stone-300 mx-auto" />
            <p className="text-sm font-semibold text-stone-700">No notifications yet</p>
            <p className="text-xs text-stone-400">We'll notify you when order status or wallet balance changes.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {notifications.map(notif => (
              <div 
                key={notif.id}
                onClick={() => {
                  markNotificationAsRead(notif.id);
                  if (notif.link) navigate(notif.link);
                }}
                className={`py-4 first:pt-0 last:pb-0 flex items-start gap-4 cursor-pointer hover:bg-stone-50 p-3 rounded-2xl transition-colors ${!notif.isRead ? 'bg-amber-50/50' : ''}`}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Package className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                      {notif.title}
                      {!notif.isRead && <span className="w-2 h-2 rounded-full bg-amber-600"></span>}
                    </h3>
                    <span className="text-[10px] text-stone-400 shrink-0">
                      {new Date(notif.createdAt).toLocaleDateString()} {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
