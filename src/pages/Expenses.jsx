import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PageHeader, Badge, SearchBar, Btn, formatCurrency, formatDate, statusColor, DataTable } from '../components/UI';
import Modal from '../components/Modal';
import { expenses as initialExpenses, expenseByCategory, employees } from '../data/dummyData';

const emptyForm = {
  date: new Date().toISOString().split('T')[0],
  category: '',
  amount: '',
  paymentMethod: 'Cash',
  submittedBy: '',
  desc: ''
};

const PIE_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

const Expenses = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const categories = ['Salary', 'Rent', 'Travel & Fuel', 'Office Supplies', 'Marketing', 'Maintenance', 'Other'];

  const filtered = expenses.filter(e =>
    ((e.desc || '').toLowerCase().includes(search.toLowerCase()) || (e.submittedBy || '').toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === 'All' || e.status === statusFilter)
  );

  const totalExpense = expenses.filter(e => e.status === 'Approved').reduce((s, e) => s + e.amount, 0);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    setExpenses(p => [{
      ...form,
      id: `EX${String(p.length + 1).padStart(3, '0')}`,
      amount: Number(form.amount) || 0,
      status: 'Pending'
    }, ...p]);
    setShowForm(false);
    setForm(emptyForm);
  };

  const F = ({ label, req, children }) => (
    <div><label className="block text-xs font-semibold text-slate-600 mb-1">{label}{req && <span className="text-red-500 ml-0.5">*</span>}</label>{children}</div>
  );
  
  const inp = (name, placeholder, type = 'text') => (
    <input name={name} type={type} value={form[name]} onChange={handleChange} placeholder={placeholder}
      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all" />
  );

  const selEl = (name, opts) => (
    <select name={name} value={form[name]} onChange={handleChange}
      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all">
      {opts.map(o => <option key={o}>{o}</option>)}
    </select>
  );

  return (
    <div className="space-y-5">
      <PageHeader title="Expense Management" subtitle="Track company operating expenses and approvals"
         action={<Btn label="Record Expense" icon={Plus} color="indigo" onClick={() => setShowForm(true)} />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-3 space-y-5">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Total Approved', value: formatCurrency(totalExpense), color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-100' },
              { label: 'Pending Approval', value: expenses.filter(e => e.status === 'Pending').length, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-100' },
              { label: 'Rejected', value: expenses.filter(e => e.status === 'Rejected').length, color: 'text-red-700', bg: 'bg-red-50 border-red-100' },
            ].map((s, i) => (
              <div key={i} className={`bg-white border rounded-xl p-4 text-center shadow-sm ${s.bg}`}>
                <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5 font-semibold">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search description or employee..." /></div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none shadow-sm">
              {['All', 'Pending', 'Approved', 'Rejected'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>

          <DataTable
            columns={[
              { label: 'Expense ID', render: e => <span className="font-mono text-indigo-700 font-bold">{e.id}</span> },
              { label: 'Description', render: e => (
                <div>
                  <p className="text-slate-800 font-semibold">{e.desc}</p>
                  <p className="text-slate-400 text-[10px] font-medium uppercase tracking-wider">{formatDate(e.date)}</p>
                </div>
              )},
              { label: 'Category', render: e => <Badge label={e.category} color="purple"/> },
              { label: 'Submitted By', render: e => (
                <div className="flex flex-col">
                  <span className="text-slate-700 font-medium">{e.submittedBy}</span>
                  <span className="text-[10px] text-slate-400">{e.paymentMethod}</span>
                </div>
              )},
              { label: 'Amount', render: e => <span className="text-red-700 font-black">{formatCurrency(e.amount)}</span> },
              { label: 'Status', render: e => <Badge label={e.status} color={statusColor(e.status)}/> },
            ]}
            data={filtered}
          />
        </div>

        <div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm sticky top-5">
            <h3 className="text-slate-800 font-bold mb-4">Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={expenseByCategory} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                  {expenseByCategory.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={v => formatCurrency(v)} contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {expenseByCategory.map((e, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}></div>
                    <span className="text-slate-600 font-medium">{e.name}</span>
                  </div>
                  <span className="text-slate-800 font-bold">{formatCurrency(e.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Modal open={showForm} onClose={() => setShowForm(false)} title="Record Corporate Expense" subtitle="Submit an expense for approval" size="md" onSubmit={handleSubmit}>
        <div className="space-y-4">
           <F label="Date" req><div>{inp('date','','date')}</div></F>

           <F label="Category" req><div>{selEl('category', categories)}</div></F>

           <F label="Amount" req><div>{inp('amount','Amount in ₹','number')}</div></F>
           
           <F label="Payment Method" req><div>{selEl('paymentMethod', ['Cash', 'Bank Transfer', 'Credit Card', 'UPI'])}</div></F>

           <F label="Claimed By">
            <div>
              <select name="submittedBy" value={form.submittedBy} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all">
                <option value="">-- Select Employee --</option>
                {employees.map(e => <option key={e.id} value={e.name}>{e.name} ({e.role})</option>)}
              </select>
            </div>
           </F>

          <F label="Description" req>
              <div>
                <textarea name="desc" value={form.desc} onChange={handleChange} placeholder="What was this expense for?" rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all resize-none" />
              </div>
          </F>
        </div>
      </Modal>

    </div>
  );
};

export default Expenses;
