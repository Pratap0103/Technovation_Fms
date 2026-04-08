import React, { useState } from 'react';
import {
  TrendingUp, DollarSign, ShoppingBag, Users,
  Package, Wrench, AlertCircle, Clock, CreditCard, BarChart3
} from 'lucide-react';
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { StatCard, PageHeader, Badge, formatCurrency, statusColor } from '../components/UI';
import {
  financialSummary, monthlyTrend, expenseByCategory,
  leads, complaints, installations, salesOrders, attendance, warrantyClaims
} from '../data/dummyData';

const PIE_COLORS = ['#6366f1','#8b5cf6','#ec4899','#f59e0b','#10b981','#3b82f6','#ef4444','#14b8a6','#f97316'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 text-sm shadow-xl">
      <p className="text-slate-700 font-semibold mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="text-xs font-medium">{p.name}: {formatCurrency(p.value)}</p>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const [view, setView] = useState('cash');
  const isCash = view === 'cash';
  const revenue = isCash ? financialSummary.totalRevenue.cash : financialSummary.totalRevenue.account;
  const netProfit = isCash ? financialSummary.netProfit.cash : financialSummary.netProfit.account;

  const pendingInstall = installations.filter(i => i.status !== 'Completed').length;
  const openComplaints = complaints.filter(c => c.status !== 'Resolved').length;
  const todayPresent = attendance.filter(a => a.status === 'Present').length;
  const hotLeads = leads.filter(l => l.status === 'Hot').length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Management Dashboard"
        subtitle={`Today: ${new Date().toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}`}
        action={
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            <button onClick={() => setView('cash')} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${view === 'cash' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Cash P&L</button>
            <button onClick={() => setView('account')} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${view === 'account' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Account P&L</button>
          </div>
        }
      />

      {/* Main KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={`Revenue (Apr)`} value={formatCurrency(revenue)} icon={TrendingUp} color="green" trend={12} sub="vs last month" />
        <StatCard title={`${isCash ? 'Cash' : 'Account'} Net Profit`} value={formatCurrency(Math.abs(netProfit))} icon={DollarSign} color={netProfit >= 0 ? 'indigo' : 'red'} trend={8} sub="April 2026" />
        <StatCard title="Total Receivable" value={formatCurrency(financialSummary.receivable)} icon={CreditCard} color="amber" sub="Customer outstanding" />
        <StatCard title="Total Payable" value={formatCurrency(financialSummary.payable)} icon={ShoppingBag} color="red" sub="Vendor outstanding" />
      </div>

      {/* Mini KPIs */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {[
          { label: 'Hot Leads', value: hotLeads, color: 'text-red-600', bg: 'bg-red-50 border-red-100' },
          { label: 'Pending Install', value: pendingInstall, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
          { label: 'Open Complaints', value: openComplaints, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-100' },
          { label: `Attendance ${todayPresent}/${attendance.length}`, value: todayPresent, color: 'text-sky-600', bg: 'bg-sky-50 border-sky-100' },
          { label: 'Warranty Claims', value: warrantyClaims.filter(w => w.status === 'Pending').length, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
          { label: 'Cash in Hand', value: formatCurrency(financialSummary.cashInHand), color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
        ].map((k, i) => (
          <div key={i} className={`bg-white border rounded-xl p-3 text-center shadow-sm ${k.bg}`}>
            <p className={`text-lg font-black ${k.color}`}>{k.value}</p>
            <p className="text-xs text-slate-500 mt-0.5 leading-tight font-medium">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 font-bold">Revenue / Profit Trend</h3>
            <span className="text-xs text-slate-400 font-medium bg-slate-50 px-3 py-1 rounded-full border border-slate-200">Last 7 months</span>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={monthlyTrend}>
              <defs>
                <linearGradient id="gs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="gp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#64748b' }} />
              <Area type="monotone" dataKey="sales" name="Sales" stroke="#10b981" fill="url(#gs)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="profit" name="Profit" stroke="#6366f1" fill="url(#gp)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#f59e0b" fill="none" strokeWidth={2} strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-slate-800 font-bold mb-3">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={190}>
            <PieChart>
              <Pie data={expenseByCategory} cx="50%" cy="50%" innerRadius={48} outerRadius={75} paddingAngle={3} dataKey="value">
                {expenseByCategory.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={v => formatCurrency(v)} contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-1">
            {expenseByCategory.slice(0, 4).map((e, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i] }}></span>
                  <span className="text-slate-500 font-medium">{e.name}</span>
                </div>
                <span className="text-slate-700 font-semibold">{formatCurrency(e.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Sales + Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-slate-800 font-bold mb-4">Recent Sales Orders</h3>
          <div className="space-y-3">
            {salesOrders.slice(-5).reverse().map(o => (
              <div key={o.id} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-slate-800 text-sm font-semibold">{o.customerName}</p>
                  <p className="text-slate-400 text-xs">{o.productName} • {o.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-800 font-bold text-sm">{formatCurrency(o.total)}</p>
                  <Badge label={o.paymentStatus} color={statusColor(o.paymentStatus)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-slate-800 font-bold mb-4">Pending Actions</h3>
          <div className="space-y-2">
            {leads.filter(l => l.status === 'Hot').map(l => (
              <div key={l.id} className="flex items-center gap-3 p-2.5 bg-red-50 rounded-xl border border-red-100">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                  <Users size={14} className="text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 text-sm font-semibold truncate">{l.company}</p>
                  <p className="text-slate-400 text-xs">Follow-up: {l.nextFollowup}</p>
                </div>
                <Badge label="Hot Lead" color="red" />
              </div>
            ))}
            {complaints.filter(c => c.status === 'Open').map(c => (
              <div key={c.id} className="flex items-center gap-3 p-2.5 bg-amber-50 rounded-xl border border-amber-100">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={14} className="text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 text-sm font-semibold truncate">{c.customerName}</p>
                  <p className="text-slate-400 text-xs">{c.complaintDesc}</p>
                </div>
                <Badge label="Open" color="amber" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
