import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { PageHeader, SearchBar, formatCurrency, DataTable, Badge } from '../components/UI';
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

      <DataTable
        columns={[
          { label: 'SKU', render: p => <span className="font-mono text-indigo-700 font-bold">{p.code}</span> },
          { label: 'Product Name', render: p => (
            <div>
              <p className="text-slate-800 font-bold">{p.name}</p>
              <p className="text-slate-400 text-[10px] uppercase font-bold">{p.brand} • {p.model}</p>
            </div>
          )},
          { label: 'Category', render: p => <span className="text-slate-600 font-medium">{p.category}</span> },
          { label: 'Valuation', render: p => (
            <div className="flex flex-col items-start text-xs">
              <span className="text-indigo-700 font-black">{formatCurrency(p.stock * p.purchaseRate)}</span>
              <span className="text-[10px] text-slate-400">Total Asset Value</span>
            </div>
          )},
          { label: 'Stock Level', render: p => {
            const stockPct = Math.min(100, (p.stock / 20) * 100);
            return (
              <div className="w-40">
                <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-bold">
                  <span>{p.stock} / 20</span><span>{Math.round(stockPct)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${p.stock < 5 ? 'bg-red-500' : p.stock < 10 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${stockPct}%` }} />
                </div>
              </div>
            );
          }},
          { label: 'Status', render: p => {
            const status = p.stock < 5 ? 'Low Stock' : p.stock < 10 ? 'Moderate' : 'Healthy';
            const color = p.stock < 5 ? 'red' : p.stock < 10 ? 'amber' : 'green';
            return <Badge label={status} color={color}/>;
          }},
        ]}
        data={filtered}
      />
    </div>
  );
};

export default Inventory;
