import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from 'lucide-react';
import { PageHeader, formatCurrency } from '../components/UI';
import { financialSummary, monthlyTrend } from '../data/dummyData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3 text-sm shadow-xl">
      <p className="text-slate-800 font-bold mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="text-xs font-semibold">{p.name}: {formatCurrency(p.value)}</p>
      ))}
    </div>
  );
};

const Accounts = () => {
  const [view, setView] = useState('cash');

  const fs = financialSummary;
  const isCash = view === 'cash';

  const revenue = isCash ? fs.totalRevenue.cash : fs.totalRevenue.account;
  const purchase = isCash ? fs.totalPurchase.cash : fs.totalPurchase.account;
  const expenseAmt = isCash ? fs.totalExpenses.cash : fs.totalExpenses.account;
  const grossProfit = revenue - purchase;
  const netProfit = grossProfit - expenseAmt;
  const isProfit = netProfit >= 0;

  const plRows = [
    { label: 'Sales Revenue', value: revenue, type: 'income', bold: false },
    { label: '(-) Cost of Goods (Purchase)', value: -purchase, type: 'expense', bold: false },
    { label: 'Gross Profit', value: grossProfit, type: 'gross', bold: true },
    { label: '(-) Operating Expenses', value: -expenseAmt, type: 'expense', bold: false },
    { label: 'Net Profit / Loss', value: netProfit, type: 'net', bold: true },
  ];

  const customerLedger = [
    { name: 'Alpha Industries', opening: 0, sales: 179360, received: 179360, closing: 0 },
    { name: 'Beta Enterprises', opening: 0, sales: 61360, received: 61360, closing: 0 },
    { name: 'Gamma Tech', opening: 0, sales: 135700, received: 45000, closing: 90700 },
    { name: 'Epsilon Mfg', opening: 0, sales: 230400, received: 0, closing: 230400 },
    { name: 'Eta Infra', opening: 0, sales: 92040, received: 92040, closing: 0 },
    { name: 'Delta Corp', opening: 0, sales: 25960, received: 25960, closing: 0 },
    { name: 'Theta Textiles', opening: 0, sales: 73160, received: 0, closing: 73160 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Accounts & Profit/Loss"
        subtitle="Financial statements, ledgers, and P&L analysis"
        action={
          <div className="flex items-center gap-2 bg-slate-50 rounded-lg border border-slate-200 p-1 shadow-sm">
            <button onClick={() => setView('cash')} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${view === 'cash' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}>Cash View</button>
            <button onClick={() => setView('account')} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${view === 'account' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}>Account View</button>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Cash in Hand', value: formatCurrency(fs.cashInHand), icon: DollarSign, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-100', iconBg: 'bg-emerald-100 text-emerald-600' },
          { label: 'Total Receivable', value: formatCurrency(fs.receivable), icon: TrendingUp, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-100', iconBg: 'bg-amber-100 text-amber-600' },
          { label: 'Total Payable', value: formatCurrency(fs.payable), icon: TrendingDown, color: 'text-red-700', bg: 'bg-red-50 border-red-100', iconBg: 'bg-red-100 text-red-600' },
          { label: 'Net Position', value: formatCurrency(fs.cashInHand + fs.receivable - fs.payable), icon: CreditCard, color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-100', iconBg: 'bg-indigo-100 text-indigo-600' },
        ].map((s, i) => (
          <div key={i} className={`bg-white border rounded-xl p-4 shadow-sm ${s.bg}`}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${s.iconBg}`}>
              <s.icon size={18} />
            </div>
            <p className="text-slate-500 text-xs font-semibold">{s.label}</p>
            <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 font-bold">Profit & Loss Statement</h3>
            <span className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full font-semibold">April 2026 ({view === 'cash' ? 'Cash' : 'Account'})</span>
          </div>

          <div className="space-y-2">
            {plRows.map((row, i) => (
              <div key={i} className={`flex items-center justify-between py-2.5 px-3 rounded-lg ${
                row.type === 'gross' ? 'bg-sky-50 border border-sky-100' :
                row.type === 'net' ? (isProfit ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100') :
                'bg-slate-50 border border-slate-100'
              }`}>
                <span className={`text-sm ${row.bold ? 'font-bold text-slate-800' : 'text-slate-600 font-medium'}`}>{row.label}</span>
                <span className={`font-bold text-sm ${
                  row.type === 'income' ? 'text-emerald-600' :
                  row.type === 'expense' ? 'text-red-500' :
                  row.type === 'gross' ? 'text-sky-600' :
                  isProfit ? 'text-emerald-700' : 'text-red-700'
                }`}>
                  {row.value < 0 ? `(${formatCurrency(Math.abs(row.value))})` : formatCurrency(row.value)}
                </span>
              </div>
            ))}
          </div>

          <div className={`mt-4 p-4 rounded-xl text-center ${isProfit ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'}`}>
            <p className="text-xs text-slate-500 mb-1 font-semibold">{isCash ? 'Cash' : 'Account'} Net {isProfit ? 'Profit' : 'Loss'}</p>
            <p className={`text-3xl font-black ${isProfit ? 'text-emerald-700' : 'text-red-700'}`}>{formatCurrency(Math.abs(netProfit))}</p>
            <p className="text-xs text-slate-500 mt-1 font-semibold">Margin: {revenue > 0 ? ((netProfit / revenue) * 100).toFixed(1) : 0}%</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-slate-800 font-bold mb-4">Monthly Comparison</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyTrend} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#475569', fontWeight: 600 }} />
              <Bar dataKey="sales" name="Sales" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="purchase" name="Purchase" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" name="Profit" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="text-slate-800 font-bold">Customer Ledger Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-white">
                {['Customer', 'Opening Balance', 'Sales (Dr)', 'Received (Cr)', 'Closing Balance'].map((h, i) => (
                  <th key={i} className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wider px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customerLedger.map((row, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-slate-800 font-bold whitespace-nowrap truncate max-w-[180px]">{row.name}</td>
                  <td className="px-4 py-3 text-slate-500 font-medium whitespace-nowrap">{formatCurrency(row.opening)}</td>
                  <td className="px-4 py-3 text-emerald-600 font-bold whitespace-nowrap">{formatCurrency(row.sales)}</td>
                  <td className="px-4 py-3 text-sky-600 font-bold whitespace-nowrap">{formatCurrency(row.received)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`font-black ${row.closing > 0 ? 'text-amber-600' : 'text-slate-500'}`}>{formatCurrency(row.closing)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 border-t border-slate-200">
                <td className="px-4 py-3 text-slate-800 font-bold">Total</td>
                <td className="px-4 py-3 text-slate-800 font-bold">{formatCurrency(0)}</td>
                <td className="px-4 py-3 text-emerald-700 font-black">{formatCurrency(customerLedger.reduce((s, r) => s + r.sales, 0))}</td>
                <td className="px-4 py-3 text-sky-700 font-black">{formatCurrency(customerLedger.reduce((s, r) => s + r.received, 0))}</td>
                <td className="px-4 py-3 text-amber-700 font-black">{formatCurrency(customerLedger.reduce((s, r) => s + r.closing, 0))}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
