import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Lock, Save, LogOut } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, updateProfile, logout } = useApp();

  if (!user) return null;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [avatar, setAvatar] = useState(user.avatar);

  // Security password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone, avatar });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmNewPassword) return;
    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match.');
      return;
    }
    alert('Password updated successfully.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">Profile & Security</h1>
        <p className="text-xs text-stone-500 mt-0.5">Manage your personal information, avatar, and security settings</p>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-xs space-y-6">
        <h3 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-100 pb-4">
          Personal Information
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="flex items-center gap-6">
            <img src={avatar} alt="" className="w-20 h-20 rounded-full object-cover border-2 border-amber-600 shadow-sm" />
            <div className="flex-1 space-y-1">
              <label className="block text-xs font-semibold text-stone-700">Avatar Image URL</label>
              <input
                type="url"
                value={avatar}
                onChange={e => setAvatar(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 text-xs"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Security */}
      <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-xs space-y-6">
        <h3 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-100 pb-4">
          Change Password
        </h3>

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Current Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">New Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={confirmNewPassword}
              onChange={e => setConfirmNewPassword(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          <button
            type="submit"
            className="bg-stone-900 hover:bg-stone-800 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md text-xs"
          >
            Update Password
          </button>
        </form>
      </div>

    </div>
  );
};
