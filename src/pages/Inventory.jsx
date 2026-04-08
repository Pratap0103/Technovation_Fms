import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { PageHeader, SearchBar, formatCurrency } from '../components/UI';
import { products } from '../data/dummyData';

const Inventory = () => {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filtered = products.filter(p =>
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase())) &&
    (catFilter === 'All' || p.category === catFilter)
  );

  const totalValue = products.reduce((s, p) => s + (p.stock * p.purchaseRate), 0);
  const lowStock = products.filter(p => p.stock < 8);

  return (
    <div className="space-y-6">
      <PageHeader title="Inventory Management" subtitle="Stock levels, movements, and valuation" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total SKUs', value: products.length, color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-100' },
          { label: 'Stock Value', value: formatCurrency(totalValue), color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-100' },
          { label: 'Low Stock Items', value: lowStock.length, color: 'text-red-700', bg: 'bg-red-50 border-red-100' },
          { label: 'Categories', value: categories.length - 1, color: 'text-purple-700', bg: 'bg-purple-50 border-purple-100' },
        ].map((s, i) => (
          <div key={i} className={`bg-white border rounded-xl p-4 text-center shadow-sm ${s.bg}`}>
            <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1 font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      {lowStock.length > 0 && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3 shadow-sm">
          <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-bold text-sm">Low Stock Alert</p>
            <p className="text-red-600 text-xs mt-0.5 font-medium">{lowStock.map(p => `${p.name} (${p.stock} left)`).join(' · ')}</p>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search product or SKU..." /></div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none shadow-sm focus:border-indigo-400">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(p => {
          const stockPct = Math.min(100, (p.stock / 20) * 100);
          const stockColor = p.stock < 5 ? 'text-red-700 bg-red-50 border-red-100' : p.stock < 10 ? 'text-amber-700 bg-amber-50 border-amber-100' : 'text-emerald-700 bg-emerald-50 border-emerald-100';
          return (
            <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-4 hover:border-indigo-300 hover:shadow-md transition-all duration-200 space-y-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1 mr-2">
                  <p className="text-slate-800 font-bold text-sm truncate">{p.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{p.code} • {p.brand}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-black ${stockColor}`}>{p.stock}</span>
              </div>
              
              <div className="space-y-2 py-2 border-y border-slate-50">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Category</span><span className="text-slate-700 font-semibold">{p.category}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Value</span><span className="text-indigo-700 font-black">{formatCurrency(p.stock * p.purchaseRate)}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider mb-1.5 font-bold">
                  <span>Stock Level</span><span>{p.stock} {p.unit}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${p.stock < 5 ? 'bg-red-500' : p.stock < 10 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${stockPct}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Inventory;
