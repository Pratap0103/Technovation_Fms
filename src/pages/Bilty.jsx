import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader, Badge, SearchBar, Btn, formatCurrency, formatDate, statusColor } from '../components/UI';
import Modal from '../components/Modal';
import { bilties as initialBilties, salesOrders, customers } from '../data/dummyData';

const emptyForm = {
  date: new Date().toISOString().split('T')[0],
  salesOrder: '',
  customer: '',
  transporter: '',
  lrNo: '',
  dispatchDate: new Date().toISOString().split('T')[0],
  weight: '',
  freight: '',
};

const Bilty = () => {
  const [bilties, setBilties] = useState(initialBilties);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = bilties.filter(b =>
    (b.customer.toLowerCase().includes(search.toLowerCase()) || b.lrNo.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === 'All' || b.status === statusFilter)
  );

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    setBilties(p => [{
      ...form,
      id: `BLT${String(p.length + 1).padStart(3, '0')}`,
      freight: Number(form.freight) || 0,
      deliveryDate: null,
      status: 'In Transit'
    }, ...p]);
    setShowForm(false);
    setForm(emptyForm);
  };
  
  const inp = (name, placeholder, type = 'text') => (
    <input name={name} type={type} value={form[name]} onChange={handleChange} placeholder={placeholder}
      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all" />
  );

  const F = ({ label, req, children }) => (
    <div><label className="block text-xs font-semibold text-slate-600 mb-1">{label}{req && <span className="text-red-500 ml-0.5">*</span>}</label>{children}</div>
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Bilty & Dispatch Management" subtitle="LR numbers, transporter tracking, delivery confirmation"
        action={<Btn label="Generate Bilty" icon={Plus} color="indigo" onClick={() => setShowForm(true)} />}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Bilties', value: bilties.length, color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-100' },
          { label: 'Delivered', value: bilties.filter(b => b.status === 'Delivered').length, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-100' },
          { label: 'In Transit', value: bilties.filter(b => b.status === 'In Transit').length, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-100' },
          { label: 'Total Freight', value: formatCurrency(bilties.reduce((s, b) => s + b.freight, 0)), color: 'text-purple-700', bg: 'bg-purple-50 border-purple-100' },
        ].map((s, i) => (
          <div key={i} className={`bg-white border rounded-xl p-4 text-center shadow-sm ${s.bg}`}>
            <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1 font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search customer or LR number..." /></div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none shadow-sm">
          {['All', 'Delivered', 'In Transit'].map(o => <option key={o}>{o}</option>)}
        </select>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Bilty #', 'Date', 'Sales Order', 'Customer', 'Transporter', 'LR Number', 'Dispatch Date', 'Delivery Date', 'Weight', 'Freight', 'Status'].map((h, i) => (
                  <th key={i} className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wider px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-indigo-700 font-bold text-xs whitespace-nowrap">{b.id}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{formatDate(b.date)}</td>
                  <td className="px-4 py-3 text-indigo-600 font-semibold whitespace-nowrap">{b.salesOrder}</td>
                  <td className="px-4 py-3 text-slate-800 font-bold whitespace-nowrap truncate max-w-[150px]">{b.customer}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap truncate max-w-[150px]">{b.transporter}</td>
                  <td className="px-4 py-3 text-sky-600 font-mono font-bold text-xs whitespace-nowrap">{b.lrNo}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{formatDate(b.dispatchDate)}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{formatDate(b.deliveryDate)}</td>
                  <td className="px-4 py-3 text-slate-500 font-medium whitespace-nowrap">{b.weight}</td>
                  <td className="px-4 py-3 text-amber-700 font-black whitespace-nowrap">{formatCurrency(b.freight)}</td>
                  <td className="px-4 py-3 whitespace-nowrap"><Badge label={b.status} color={statusColor(b.status)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <Modal open={showForm} onClose={() => setShowForm(false)} title="Generate Dispatch Bilty" subtitle="Record LR number and transporter details" size="lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <F label="Bilty Date" req><div>{inp('date','','date')}</div></F>

           <F label="Sales Order" req>
              <div>
                <select name="salesOrder" value={form.salesOrder} onChange={e => {
                  handleChange(e);
                  const so = salesOrders.find(s => s.id === e.target.value);
                  if(so) setForm(p => ({ ...p, salesOrder: so.id, customer: so.customerName }));
                }} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all">
                  <option value="">-- Link to SO --</option>
                  {salesOrders.filter(so => so.status === 'Confirmed' || so.status === 'Processing').map(so => (
                    <option key={so.id} value={so.id}>{so.id} - {so.customerName}</option>
                  ))}
                </select>
              </div>
           </F>

           <F label="Customer Name" req>
              <div>
                <select name="customer" value={form.customer} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all">
                  <option value="">-- Customer --</option>
                  {customers.map(c => <option key={c.id} value={c.company}>{c.company}</option>)}
                </select>
              </div>
           </F>

           <F label="Transporter Name" req><div>{inp('transporter','e.g. VRL Logistics')}</div></F>
           
           <F label="LR / Docket Number" req><div>{inp('lrNo','Tracking number')}</div></F>
           <F label="Dispatch Date" req><div>{inp('dispatchDate','','date')}</div></F>
           
           <F label="Estimated Weight"><div>{inp('weight','e.g. 150 kg')}</div></F>
           <F label="Freight Amount (₹)" req><div>{inp('freight','Amount','number')}</div></F>

        </div>
      </Modal>

    </div>
  );
};

export default Bilty;
