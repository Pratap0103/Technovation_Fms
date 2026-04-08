import React, { useState } from 'react';
import { Plus, Phone, Mail, MapPin } from 'lucide-react';
import { PageHeader, Badge, SearchBar, Btn, formatCurrency, statusColor } from '../components/UI';
import Modal from '../components/Modal';
import { customers as initialCustomers } from '../data/dummyData';

const states = ['Maharashtra','Gujarat','Delhi','Uttar Pradesh','Tamil Nadu','Kerala','Karnataka','Rajasthan','Punjab','Haryana','West Bengal'];
const emptyForm = {
  name:'', company:'', gstin:'', mobile:'', email:'',
  city:'', state:'Maharashtra', billingAddress:'', shippingAddress:'',
  creditLimit:'', paymentTerms:'30 Days', status:'Active'
};

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = customers.filter(c =>
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter==='All' || c.status===statusFilter)
  );

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    setCustomers(p => [{
      ...form, id:`C${String(p.length+1).padStart(3,'0')}`,
      creditLimit: Number(form.creditLimit)||0,
      outstanding: 0,
    }, ...p]);
    setShowForm(false);
    setForm(emptyForm);
  };

  const inp = (name, placeholder, type='text') => (
    <input name={name} type={type} value={form[name]} onChange={handleChange} placeholder={placeholder}
      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all" />
  );
  const selEl = (name, opts) => (
    <select name={name} value={form[name]} onChange={handleChange}
      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all">
      {opts.map(o=><option key={o}>{o}</option>)}
    </select>
  );
  const F = ({ label, req, children }) => (
    <div><label className="block text-xs font-semibold text-slate-600 mb-1">{label}{req && <span className="text-red-500 ml-0.5">*</span>}</label>{children}</div>
  );

  return (
    <div className="space-y-5">
      <PageHeader title="Customer KYC Master" subtitle="Customer profiles, credit limits, and outstanding"
        action={<Btn label="Add Customer" icon={Plus} color="indigo" onClick={()=>setShowForm(true)} />}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label:'Total Customers', value: customers.length, color:'text-indigo-700', bg:'bg-indigo-50 border-indigo-100' },
          { label:'Active', value: customers.filter(c=>c.status==='Active').length, color:'text-emerald-700', bg:'bg-emerald-50 border-emerald-100' },
          { label:'Total Outstanding', value: formatCurrency(customers.reduce((s,c)=>s+c.outstanding,0)), color:'text-red-700', bg:'bg-red-50 border-red-100' },
          { label:'Total Credit Limit', value: formatCurrency(customers.reduce((s,c)=>s+c.creditLimit,0)), color:'text-purple-700', bg:'bg-purple-50 border-purple-100' },
        ].map((s,i)=>(
          <div key={i} className={`bg-white border rounded-xl p-4 text-center shadow-sm ${s.bg}`}>
            <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5 font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search customer or company..." /></div>
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none shadow-sm">
          {['All','Active','Inactive'].map(o=><option key={o}>{o}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c=>(
          <div key={c.id} onClick={()=>setSelected(c)} className="bg-white border border-slate-200 rounded-xl p-5 cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all duration-200 space-y-3 shadow-sm">
            <div className="flex items-start justify-between">
              <div><p className="text-slate-800 font-black">{c.company}</p><p className="text-slate-500 text-sm">{c.name}</p></div>
              <Badge label={c.status} color={statusColor(c.status)}/>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs text-slate-500 flex items-center gap-2"><Phone size={11} className="text-indigo-400"/>{c.mobile}</p>
              <p className="text-xs text-slate-500 flex items-center gap-2"><Mail size={11} className="text-indigo-400"/>{c.email}</p>
              <p className="text-xs text-slate-500 flex items-center gap-2"><MapPin size={11} className="text-indigo-400"/>{c.city}, {c.state}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
              <div><p className="text-red-700 font-black text-sm">{formatCurrency(c.outstanding)}</p><p className="text-slate-400 text-xs">Outstanding</p></div>
              <div><p className="text-purple-700 font-black text-sm">{formatCurrency(c.creditLimit)}</p><p className="text-slate-400 text-xs">Credit Limit</p></div>
              <div><p className="text-slate-700 font-bold text-xs">{c.paymentTerms}</p><p className="text-slate-400 text-xs">Terms</p></div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backdropFilter:'blur(4px)',backgroundColor:'rgba(15,23,42,0.4)'}} onClick={()=>setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full" onClick={e=>e.stopPropagation()} style={{animation:'modalIn 0.2s ease-out'}}>
            <h3 className="text-slate-800 text-lg font-black mb-0.5">{selected.company}</h3>
            <p className="text-slate-400 text-sm mb-5">{selected.id}</p>
            <div className="grid grid-cols-2 gap-4 mb-5">
              {[['Contact Person',selected.name],['Mobile',selected.mobile],['Email',selected.email],['GSTIN',selected.gstin],['City',selected.city],['State',selected.state],['Credit Limit',formatCurrency(selected.creditLimit)],['Payment Terms',selected.paymentTerms],['Outstanding',formatCurrency(selected.outstanding)],['Status',selected.status]].map(([l,v],i)=>(
                <div key={i}><p className="text-slate-400 text-xs font-medium">{l}</p><p className="text-slate-800 text-sm font-semibold mt-0.5">{v}</p></div>
              ))}
            </div>
            <button onClick={()=>setSelected(null)} className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">Close</button>
          </div>
        </div>
      )}

      <Modal open={showForm} onClose={()=>setShowForm(false)} title="Add New Customer" subtitle="KYC details – billing, contact, credit" size="lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <F label="Company / Firm Name" req><div>{inp('company','Company name')}</div></F>
          <F label="Contact Person Name" req><div>{inp('name','Full name')}</div></F>
          <F label="GSTIN"><div>{inp('gstin','27AABCM1234D1Z5')}</div></F>
          <F label="Mobile Number" req><div>{inp('mobile','10-digit mobile')}</div></F>
          <F label="Email ID"><div>{inp('email','email@company.com','email')}</div></F>
          <F label="City" req><div>{inp('city','City name')}</div></F>
          <F label="State" req><div>{selEl('state', states)}</div></F>
          <F label="Payment Terms" req><div>{selEl('paymentTerms',['Immediate','7 Days','15 Days','30 Days','45 Days','60 Days'])}</div></F>
          <F label="Credit Limit (₹)"><div>{inp('creditLimit','e.g. 500000','number')}</div></F>
          <F label="Status"><div>{selEl('status',['Active','Inactive'])}</div></F>
          <div className="sm:col-span-2">
            <F label="Billing Address"><div>
              <textarea name="billingAddress" value={form.billingAddress} onChange={handleChange} placeholder="Full billing address..." rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all resize-none" />
            </div></F>
          </div>
          <div className="sm:col-span-2">
            <F label="Shipping Address (if different)"><div>
              <textarea name="shippingAddress" value={form.shippingAddress} onChange={handleChange} placeholder="Shipping / delivery address..." rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all resize-none" />
            </div></F>
          </div>
        </div>
        <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
      </Modal>
    </div>
  );
};

export default Customers;
