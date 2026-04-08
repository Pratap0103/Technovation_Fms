import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader, Badge, SearchBar, Btn, formatCurrency, formatDate, statusColor } from '../components/UI';
import Modal from '../components/Modal';
import { warrantyClaims as initialClaims, vendors, customers, products } from '../data/dummyData';

const emptyForm = {
  date: new Date().toISOString().split('T')[0],
  srNo: '',
  vendor: '',
  customer: '',
  product: '',
  claimAmount: '',
  issue: ''
};

const Warranty = () => {
  const [claims, setClaims] = useState(initialClaims);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = claims.filter(c =>
    ((c.vendorName || '').toLowerCase().includes(search.toLowerCase()) || (c.srNo || '').toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === 'All' || c.status === statusFilter)
  );

  const totalClaimAmount = claims.reduce((s, c) => s + c.claimAmount, 0);
  const totalRecovery = claims.reduce((s, c) => s + c.recoveryAmount, 0);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    setClaims(p => [{
      ...form,
      id: `WC${String(p.length + 1).padStart(3, '0')}`,
      vendorName: form.vendor,
      customerName: form.customer,
      productName: form.product,
      claimAmount: Number(form.claimAmount) || 0,
      recoveryAmount: 0,
      status: 'Pending',
      dispatchDate: 'Pending'
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

  return (
    <div className="space-y-5">
      <PageHeader title="Warranty Claims" subtitle="Track warranty returns and vendor recoveries"
         action={<Btn label="Lodge Claim" icon={Plus} color="indigo" onClick={() => setShowForm(true)} />}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Claims', value: claims.length, color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-100' },
          { label: 'Pending', value: claims.filter(c => c.status === 'Pending').length, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-100' },
          { label: 'Total Claimed', value: formatCurrency(totalClaimAmount), color: 'text-red-700', bg: 'bg-red-50 border-red-100' },
          { label: 'Total Recovered', value: formatCurrency(totalRecovery), color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-100' },
        ].map((s, i) => (
          <div key={i} className={`bg-white border rounded-xl p-4 text-center shadow-sm ${s.bg}`}>
            <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5 font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search vendor or SR number..." /></div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none shadow-sm">
          {['All', 'Pending', 'Dispatched to Vendor', 'Approved', 'Rejected'].map(o => <option key={o}>{o}</option>)}
        </select>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
             <thead><tr className="border-b border-slate-100 bg-slate-50">
              {['Claim #', 'SR No', 'Date', 'Vendor', 'Product', 'Claim Amount', 'Recovery Amount', 'Status'].map((h, i) => (
                <th key={i} className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wider px-4 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-indigo-700 font-bold text-xs whitespace-nowrap">{c.id}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap truncate max-w-[100px]">{c.srNo}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{formatDate(c.date)}</td>
                  <td className="px-4 py-3 text-slate-800 font-semibold whitespace-nowrap truncate max-w-[150px]">{c.vendorName}</td>
                  <td className="px-4 py-3 text-slate-600 max-w-[150px] whitespace-nowrap truncate">{c.productName}</td>
                  <td className="px-4 py-3 text-red-700 font-semibold whitespace-nowrap">{formatCurrency(c.claimAmount)}</td>
                  <td className="px-4 py-3 text-emerald-700 font-black whitespace-nowrap">{formatCurrency(c.recoveryAmount)}</td>
                  <td className="px-4 py-3 whitespace-nowrap"><Badge label={c.status} color={statusColor(c.status)}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <Modal open={showForm} onClose={() => setShowForm(false)} title="Lodge Warranty Claim" subtitle="Send defective products back to the vendor" size="md" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <F label="Date" req><div>{inp('date','','date')}</div></F>
           <F label="Service Request (SR No)" req><div>{inp('srNo','e.g. SR001')}</div></F>
           
           <div className="sm:col-span-2">
           <F label="Vendor" req>
            <div>
              <select name="vendor" value={form.vendor} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all">
                <option value="">-- Select Vendor --</option>
                {vendors.map(v => <option key={v.id} value={v.company}>{v.company}</option>)}
              </select>
            </div>
          </F>
          </div>

          <F label="Customer Name">
            <div>
              <select name="customer" value={form.customer} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all">
                <option value="">-- Customer (Optional) --</option>
                {customers.map(c => <option key={c.id} value={c.company}>{c.name}</option>)}
              </select>
            </div>
           </F>
           
          <F label="Product" req>
            <div>
               <select name="product" value={form.product} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all">
                <option value="">-- Select Product --</option>
                {products.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </div>
          </F>

          <F label="Claim amount" req><div>{inp('claimAmount','Amount in ₹','number')}</div></F>

          <div className="sm:col-span-2">
            <F label="Issue / Defect details" req>
              <div>
                <textarea name="issue" value={form.issue} onChange={handleChange} placeholder="Describe the defect..." rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all resize-none" />
              </div>
            </F>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Warranty;
