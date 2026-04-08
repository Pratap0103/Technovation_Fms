import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const StatCard = ({ title, value, sub, icon: Icon, color = 'indigo', trend }) => {
  const colorMap = {
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-100', icon: 'text-indigo-600', val: 'text-indigo-700', iconBg: 'bg-indigo-100' },
    green:  { bg: 'bg-emerald-50', border: 'border-emerald-100', icon: 'text-emerald-600', val: 'text-emerald-700', iconBg: 'bg-emerald-100' },
    red:    { bg: 'bg-red-50', border: 'border-red-100', icon: 'text-red-600', val: 'text-red-700', iconBg: 'bg-red-100' },
    amber:  { bg: 'bg-amber-50', border: 'border-amber-100', icon: 'text-amber-600', val: 'text-amber-700', iconBg: 'bg-amber-100' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-100', icon: 'text-purple-600', val: 'text-purple-700', iconBg: 'bg-purple-100' },
    sky:    { bg: 'bg-sky-50', border: 'border-sky-100', icon: 'text-sky-600', val: 'text-sky-700', iconBg: 'bg-sky-100' },
  };
  const c = colorMap[color] || colorMap.indigo;
  return (
    <div className={`bg-white border ${c.border} rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${c.iconBg} flex items-center justify-center`}>
          <Icon size={20} className={c.icon} />
        </div>
        {trend !== undefined && (
          <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-medium ${trend > 0 ? 'bg-emerald-100 text-emerald-700' : trend < 0 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'}`}>
            {trend > 0 ? <TrendingUp size={10} /> : trend < 0 ? <TrendingDown size={10} /> : <Minus size={10} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-slate-500 text-xs font-medium mb-1">{title}</p>
      <p className={`text-xl font-bold ${c.val}`}>{value}</p>
      {sub && <p className="text-slate-400 text-xs mt-1">{sub}</p>}
    </div>
  );
};

export const PageHeader = ({ title, subtitle, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
    <div>
      <h2 className="text-slate-800 text-lg font-bold">{title}</h2>
      {subtitle && <p className="text-slate-500 text-sm mt-0.5">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

export const Badge = ({ label, color = 'slate' }) => {
  const m = {
    green:  'bg-emerald-100 text-emerald-700 border border-emerald-200',
    red:    'bg-red-100 text-red-700 border border-red-200',
    amber:  'bg-amber-100 text-amber-700 border border-amber-200',
    blue:   'bg-blue-100 text-blue-700 border border-blue-200',
    purple: 'bg-purple-100 text-purple-700 border border-purple-200',
    indigo: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
    slate:  'bg-slate-100 text-slate-600 border border-slate-200',
    sky:    'bg-sky-100 text-sky-700 border border-sky-200',
  };
  return <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold whitespace-nowrap ${m[color] || m.slate}`}>{label}</span>;
};

export const TableWrapper = ({ headers, rows, emptyMsg = 'No data available' }) => (
  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50">
            {headers.map((h, i) => (
              <th key={i} className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wider px-4 py-3 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0
            ? <tr><td colSpan={headers.length} className="text-center text-slate-400 py-12">{emptyMsg}</td></tr>
            : rows.map((row, i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-slate-700 whitespace-nowrap truncate max-w-[250px]">{cell}</td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
);

export const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => (
  <div className="relative">
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 pl-9 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all shadow-sm"
    />
    <svg className="absolute left-3 top-3 text-slate-400" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  </div>
);

export const Btn = ({ label, onClick, color = 'indigo', icon: Icon, size = 'md', type = 'button' }) => {
  const c = {
    indigo:  'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200',
    emerald: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-200',
    red:     'bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-200',
    slate:   'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm',
  };
  const s = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm';
  return (
    <button type={type} onClick={onClick} className={`flex items-center gap-2 rounded-lg font-semibold transition-all duration-150 ${c[color] || c.indigo} ${s}`}>
      {Icon && <Icon size={size === 'sm' ? 13 : 15} />}
      {label}
    </button>
  );
};

export const FormField = ({ label, required, children }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

export const Input = ({ value, onChange, placeholder, type = 'text', name, required }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all"
  />
);

export const Select = ({ value, onChange, name, children, required }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all"
  >
    {children}
  </select>
);

export const Textarea = ({ value, onChange, placeholder, name, rows = 3 }) => (
  <textarea
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all resize-none"
  />
);

export const formatCurrency = (n) => '₹' + (n || 0).toLocaleString('en-IN');
export const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

export const statusColor = (status) => {
  const s = (status || '').toLowerCase();
  if (['active', 'paid', 'delivered', 'completed', 'resolved', 'approved', 'present'].includes(s)) return 'green';
  if (['pending', 'partial', 'scheduled', 'in progress', 'warm', 'in transit'].includes(s)) return 'amber';
  if (['unpaid', 'inactive', 'open', 'rejected', 'absent', 'cold'].includes(s)) return 'red';
  if (['confirmed', 'hot', 'processing', 'late'].includes(s)) return 'indigo';
  return 'slate';
};
