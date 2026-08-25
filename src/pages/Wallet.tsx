import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Plus, RefreshCw } from 'lucide-react';

export const Wallet: React.FC = () => {
  const { walletBalance, walletTransactions, topUpWallet } = useApp();
  const [topUpAmount, setTopUpAmount] = useState(20);
  const [showTopUpModal, setShowTopUpModal] = useState(false);

  const handleTopUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (topUpAmount <= 0) return;
    topUpWallet(topUpAmount, `Wallet Top-Up via KHQR`);
    setShowTopUpModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Digital Wallet</h1>
          <p className="text-xs text-stone-500 mt-0.5">Manage your balance, top up instantly, and view transaction history</p>
        </div>
        <button
          onClick={() => setShowTopUpModal(true)}
          className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs"
        >
          <Plus className="w-4 h-4" /> Top Up Wallet
        </button>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider block">Available Balance</span>
          <p className="text-4xl sm:text-5xl font-serif font-bold">${walletBalance.toFixed(2)}</p>
          <p className="text-stone-300 text-xs">Securely protected by AngkorTaste digital ledger.</p>
        </div>
        <div className="w-20 h-20 rounded-2xl bg-amber-600/30 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
          <WalletIcon className="w-10 h-10" />
        </div>
      </div>

      {/* Top Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl animate-in fade-in">
            <h3 className="font-serif text-xl font-bold text-stone-900">Top Up Wallet</h3>
            
            <form onSubmit={handleTopUp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">Select Top Up Amount (USD)</label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[10, 20, 50, 100].map(amt => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setTopUpAmount(amt)}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        topUpAmount === amt 
                          ? 'bg-amber-700 text-white border-amber-700 shadow-sm' 
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="5"
                  max="1000"
                  value={topUpAmount}
                  onChange={e => setTopUpAmount(Number(e.target.value))}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTopUpModal(false)}
                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-3 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 rounded-xl text-xs shadow-md"
                >
                  Confirm Top Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transaction History */}
      <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-xs space-y-6">
        <h3 className="font-serif text-xl font-bold text-stone-900">Transaction History</h3>

        {walletTransactions.length === 0 ? (
          <p className="text-xs text-stone-500 py-8 text-center">No transactions recorded yet.</p>
        ) : (
          <div className="space-y-4 divide-y divide-stone-100">
            {walletTransactions.map(tx => (
              <div key={tx.id} className="pt-4 first:pt-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    tx.type === 'TOP_UP' ? 'bg-emerald-100 text-emerald-700' :
                    tx.type === 'REFUND' ? 'bg-sky-100 text-sky-700' :
                    'bg-rose-100 text-rose-700'
                  }`}>
                    {tx.type === 'TOP_UP' ? <ArrowDownLeft className="w-6 h-6" /> :
                     tx.type === 'REFUND' ? <RefreshCw className="w-5 h-5" /> :
                     <ArrowUpRight className="w-6 h-6" />}
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-stone-900 text-sm truncate">{tx.description}</p>
                    <p className="text-xs text-stone-400">
                      {new Date(tx.createdAt).toLocaleDateString()} at {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • <strong className="uppercase text-stone-600">{tx.type}</strong>
                    </p>
                  </div>
                </div>

                <span className={`text-base font-serif font-bold shrink-0 ${
                  tx.type === 'TOP_UP' || tx.type === 'REFUND' ? 'text-emerald-600' : 'text-stone-900'
                }`}>
                  {tx.type === 'TOP_UP' || tx.type === 'REFUND' ? '+' : '-'}${tx.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
