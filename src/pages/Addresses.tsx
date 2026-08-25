import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const Addresses: React.FC = () => {
  const { addresses, addAddress, deleteAddress, setDefaultAddress } = useApp();

  const [showForm, setShowForm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('Phnom Penh');
  const [district, setDistrict] = useState('');
  const [commune, setCommune] = useState('');
  const [streetHouse, setStreetHouse] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !district || !streetHouse) return;

    addAddress({
      fullName,
      phone,
      province,
      district,
      commune,
      streetHouse,
      additionalInfo,
      isDefault
    });

    setFullName('');
    setPhone('');
    setDistrict('');
    setCommune('');
    setStreetHouse('');
    setAdditionalInfo('');
    setIsDefault(false);
    setShowForm(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Delivery Addresses</h1>
          <p className="text-xs text-stone-500 mt-0.5">Manage your saved delivery locations across Cambodia</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs"
        >
          <Plus className="w-4 h-4" /> Add New Address
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-stone-200 p-8 shadow-md space-y-4 animate-in fade-in">
          <h3 className="font-serif text-xl font-bold text-stone-900 pb-2 border-b border-stone-100">Add New Address</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Sophea Chan"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                placeholder="+855 12 345 678"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Province / City</label>
              <select
                value={province}
                onChange={e => setProvince(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs"
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
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Commune / Sangkat</label>
              <input
                type="text"
                required
                placeholder="Phsar Kandal"
                value={commune}
                onChange={e => setCommune(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Street / House No.</label>
            <input
              type="text"
              required
              placeholder="House #45, Street 19"
              value={streetHouse}
              onChange={e => setStreetHouse(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Additional Notes (Optional)</label>
            <input
              type="text"
              placeholder="Near blue gate, leave with receptionist"
              value={additionalInfo}
              onChange={e => setAdditionalInfo(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={e => setIsDefault(e.target.checked)}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-stone-300"
            />
            <span className="text-xs text-stone-700 font-medium">Set as default delivery address</span>
          </label>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 bg-stone-100 text-stone-700 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-700 text-white rounded-xl text-xs font-semibold hover:bg-amber-800 shadow-sm"
            >
              Save Address
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map(addr => (
          <div key={addr.id} className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-base">{addr.fullName}</span>
                {addr.isDefault && (
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Default</span>
                )}
              </div>
              <p className="text-xs text-stone-600">{addr.phone}</p>
              <p className="text-xs text-stone-600 leading-relaxed">{addr.streetHouse}, {addr.commune}, {addr.district}, {addr.province}</p>
              {addr.additionalInfo && (
                <p className="text-xs text-stone-400 italic">"{addr.additionalInfo}"</p>
              )}
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              {!addr.isDefault ? (
                <button
                  onClick={() => setDefaultAddress(addr.id)}
                  className="text-xs font-semibold text-amber-700 hover:underline"
                >
                  Set as Default
                </button>
              ) : (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Default Address
                </span>
              )}

              {addresses.length > 1 && (
                <button
                  onClick={() => deleteAddress(addr.id)}
                  className="p-2 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
