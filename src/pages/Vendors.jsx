import React, { useState } from 'react';
import { Plus, Phone, Mail, Building2 } from 'lucide-react';
import { PageHeader, Badge, SearchBar, Btn, formatCurrency, statusColor, DataTable } from '../components/UI';
import Modal from '../components/Modal';
import { vendors as initialVendors } from '../data/dummyData';

const states = ['Maharashtra','Gujarat','Delhi','UP','Tamil Nadu','Kerala','Karnataka'];
const emptyForm = {
  name:'', company:'', gstin:'', mobile:'', email:'',
  city:'', state:'Maharashtra', type:'Equipment',
  bankName:'', accountNo:'', ifsc:'', panNo:'', status:'Active'
};

const Vendors = () => {
  const [vendors, setVendors] = useState(initialVendors);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const types = ['All', ...new Set(vendors.map(v=>v.type))];
  const filtered = vendors.filter(v =>
    (v.name.toLowerCase().includes(search.toLowerCase()) || v.company.toLowerCase().includes(search.toLowerCase())) &&
    (typeFilter==='All' || v.type===typeFilter)
  );

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = () => {
    setVendors(p => [{
      ...form, id:`V${String(p.length+1).padStart(3,'0')}`, outstanding: 0,
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
      <PageHeader title="Vendor KYC Master" subtitle="Supplier profiles, bank details, and outstanding"
        action={<Btn label="Add Vendor" icon={Plus} color="indigo" onClick={()=>setShowForm(true)} />}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label:'Total Vendors', value: vendors.length, color:'text-indigo-700', bg:'bg-indigo-50 border-indigo-100' },
          { label:'Active', value: vendors.filter(v=>v.status==='Active').length, color:'text-emerald-700', bg:'bg-emerald-50 border-emerald-100' },
          { label:'Total Payable', value: formatCurrency(vendors.reduce((s,v)=>s+v.outstanding,0)), color:'text-red-700', bg:'bg-red-50 border-red-100' },
          { label:'Vendor Types', value: types.length-1, color:'text-purple-700', bg:'bg-purple-50 border-purple-100' },
        ].map((s,i)=>(
          <div key={i} className={`bg-white border rounded-xl p-4 text-center shadow-sm ${s.bg}`}>
            <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5 font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search vendor or company..." /></div>
        <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none shadow-sm">
          {types.map(t=><option key={t}>{t}</option>)}
        </select>
      </div>

      <DataTable
        columns={[
          { label: 'ID', render: v => <span className="font-mono text-indigo-700 font-bold">{v.id}</span> },
          { label: 'Company Name', render: v => (
            <div className="cursor-pointer" onClick={() => setSelected(v)}>
              <p className="text-slate-800 font-bold">{v.company}</p>
              <p className="text-slate-500 text-xs">{v.name}</p>
            </div>
          )},
          { label: 'Type', render: v => <Badge label={v.type} color="purple"/> },
          { label: 'Contact', render: v => (
            <div className="space-y-0.5 text-xs">
              <p className="flex items-center gap-1.5 text-slate-600"><Phone size={10} className="text-indigo-400"/> {v.mobile}</p>
              <p className="flex items-center gap-1.5 text-slate-400 truncate max-w-[150px]"><Mail size={10} className="text-indigo-300"/> {v.email}</p>
            </div>
          )},
          { label: 'Location', render: v => (
            <div className="flex items-center gap-1.5 text-slate-600">
              <Building2 size={11} className="text-slate-400"/>
              <span>{v.city}, {v.state}</span>
            </div>
          )},
          { label: 'Outstanding', render: v => <span className="text-red-700 font-black">{formatCurrency(v.outstanding)}</span> },
          { label: 'Status', render: v => <Badge label={v.status} color={statusColor(v.status)}/> },
        ]}
        data={filtered}
      />

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backdropFilter:'blur(4px)',backgroundColor:'rgba(15,23,42,0.4)'}} onClick={()=>setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full" onClick={e=>e.stopPropagation()} style={{animation:'modalIn 0.2s ease-out'}}>
            <h3 className="text-slate-800 text-lg font-black mb-0.5">{selected.company}</h3>
            <p className="text-slate-400 text-sm mb-5">{selected.id} • {selected.type}</p>
            <div className="grid grid-cols-2 gap-4 mb-5">
              {[['Contact Person',selected.name],['Mobile',selected.mobile],['Email',selected.email],['GSTIN',selected.gstin],['Bank',selected.bankName],['Account No',selected.accountNo],['IFSC',selected.ifsc],['City',selected.city],['Outstanding',formatCurrency(selected.outstanding)],['Status',selected.status]].map(([l,v],i)=>(
                <div key={i}><p className="text-slate-400 text-xs font-medium">{l}</p><p className="text-slate-800 text-sm font-semibold mt-0.5">{v}</p></div>
              ))}
            </div>
            <button onClick={()=>setSelected(null)} className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">Close</button>
          </div>
        </div>
      )}

      <Modal open={showForm} onClose={()=>setShowForm(false)} title="Add New Vendor" subtitle="KYC, bank details and contact information" size="lg" onSubmit={handleSubmit}>
        <div className="space-y-5">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Basic Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <F label="Company / Firm Name" req><div>{inp('company','Company name')}</div></F>
              <F label="Contact Person" req><div>{inp('name','Full name')}</div></F>
              <F label="GSTIN"><div>{inp('gstin','27AABCM1234D1Z5')}</div></F>
              <F label="Mobile Number" req><div>{inp('mobile','10-digit mobile')}</div></F>
              <F label="Email ID"><div>{inp('email','email@company.com','email')}</div></F>
              <F label="Vendor Type" req><div>{selEl('type',['Equipment','Spare Parts','Installation Material','Logistics','Service','Other'])}</div></F>
              <F label="City" req><div>{inp('city','City')}</div></F>
              <F label="State"><div>{selEl('state', states)}</div></F>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Bank Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <F label="Bank Name"><div>{inp('bankName','e.g. HDFC Bank')}</div></F>
              <F label="Account Number"><div>{inp('accountNo','Account number')}</div></F>
              <F label="IFSC Code"><div>{inp('ifsc','e.g. HDFC0001234')}</div></F>
              <F label="PAN Number"><div>{inp('panNo','10-char PAN')}</div></F>
            </div>
          </div>
          <F label="Status"><div>{selEl('status',['Active','Inactive'])}</div></F>
        </div>
        <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
      </Modal>
    </div>
  );
};

export default Vendors;
