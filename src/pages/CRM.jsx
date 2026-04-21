import React, { useState } from 'react';
import { Plus, Phone, MapPin, TrendingUp, Calendar } from 'lucide-react';
import { PageHeader, Badge, SearchBar, Btn, formatCurrency, statusColor, DataTable } from '../components/UI';
import Modal from '../components/Modal';
import { leads as initialLeads, employees } from '../data/dummyData';

const statusColorMap = { Hot: 'red', Warm: 'amber', Cold: 'sky' };
const stageOptions = ['Enquiry', 'Follow-up', 'Demo Scheduled', 'Quotation Shared', 'Negotiation', 'Order Confirmation'];
const sourceOptions = ['Reference', 'Website', 'Cold Call', 'Exhibition', 'Google Ads', 'Social Media', 'Walk-in'];

const emptyForm = {
  name: '', company: '', mobile: '', email: '', city: '',
  source: 'Reference', product: '', value: '', status: 'Warm',
  salesperson: '', nextFollowup: '', stage: 'Enquiry', notes: '', conversionProb: 50
};

const CRM = () => {
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [stageFilter, setStageFilter] = useState('All');
  const [view, setView] = useState('cards');
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = leads.filter(l => {
    const s = search.toLowerCase();
    return (l.name.toLowerCase().includes(s) || l.company.toLowerCase().includes(s) || l.product.toLowerCase().includes(s))
      && (statusFilter === 'All' || l.status === statusFilter)
      && (stageFilter === 'All' || l.stage === stageFilter);
  });

  const stats = {
    total: leads.length,
    hot: leads.filter(l => l.status === 'Hot').length,
    warm: leads.filter(l => l.status === 'Warm').length,
    cold: leads.filter(l => l.status === 'Cold').length,
    value: leads.reduce((s, l) => s + Number(l.value || 0), 0),
  };

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    const newLead = {
      ...form,
      id: `L${String(leads.length + 1).padStart(3, '0')}`,
      value: Number(form.value) || 0,
      conversionProb: Number(form.conversionProb) || 50,
      enquiryDate: new Date().toISOString().split('T')[0],
    };
    setLeads(p => [newLead, ...p]);
    setShowForm(false);
    setForm(emptyForm);
  };

  const F = ({ label, req, children }) => (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">{label}{req && <span className="text-red-500 ml-0.5">*</span>}</label>
      {children}
    </div>
  );
  const inp = (name, placeholder, type = 'text') => (
    <input name={name} type={type} value={form[name]} onChange={handleChange} placeholder={placeholder}
      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all" />
  );
  const sel = (name, opts) => (
    <select name={name} value={form[name]} onChange={handleChange}
      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all">
      {opts.map(o => <option key={o}>{o}</option>)}
    </select>
  );

  return (
    <div className="space-y-5">
      <PageHeader title="CRM – Lead & Enquiry Management" subtitle="Track leads, follow-ups, and pipeline"
        action={<Btn label="Add Lead" icon={Plus} color="indigo" onClick={() => setShowForm(true)} />}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Total Leads', value: stats.total, color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-100' },
          { label: 'Hot 🔥', value: stats.hot, color: 'text-red-700', bg: 'bg-red-50 border-red-100' },
          { label: 'Warm', value: stats.warm, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-100' },
          { label: 'Cold', value: stats.cold, color: 'text-sky-700', bg: 'bg-sky-50 border-sky-100' },
          { label: 'Pipeline Value', value: formatCurrency(stats.value), color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-100' },
        ].map((s, i) => (
          <div key={i} className={`bg-white border rounded-xl p-4 text-center shadow-sm ${s.bg}`}>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5 font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search by name, company, product..." /></div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none shadow-sm focus:border-indigo-400">
          {['All', 'Hot', 'Warm', 'Cold'].map(o => <option key={o}>{o}</option>)}
        </select>
        <select value={stageFilter} onChange={e => setStageFilter(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none shadow-sm focus:border-indigo-400">
          {['All', ...stageOptions].map(o => <option key={o}>{o}</option>)}
        </select>
        <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
          <button onClick={() => setView('cards')} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${view === 'cards' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-700'}`}>Cards</button>
          <button onClick={() => setView('table')} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${view === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-700'}`}>Table</button>
        </div>
      </div>

      <DataTable
        columns={[
          { label: 'Lead ID', render: l => <span className="font-mono text-indigo-700 font-bold">{l.id}</span> },
          { label: 'Contact', render: l => (
            <div className="cursor-pointer" onClick={() => setSelected(l)}>
              <p className="text-slate-800 font-bold">{l.name}</p>
              <p className="text-slate-400 text-xs font-medium">{l.company}</p>
            </div>
          )},
          { label: 'Interest', render: l => (
            <div className="text-xs">
              <p className="text-slate-700 font-semibold truncate max-w-[150px]">{l.product}</p>
              <p className="text-slate-400 font-medium">Source: {l.source}</p>
            </div>
          )},
          { label: 'Pipeline', render: l => (
            <div className="text-xs">
              <p className="text-emerald-700 font-black">{formatCurrency(l.value)}</p>
              <Badge label={l.stage} color="indigo"/>
            </div>
          )},
          { label: 'Assigned', render: l => (
            <div className="text-xs">
              <p className="text-slate-700 font-medium">{l.salesperson}</p>
              <p className="text-indigo-600 font-bold">Follow-up: {l.nextFollowup}</p>
            </div>
          )},
          { label: 'Prob', render: l => (
            <div className="flex items-center gap-2">
              <div className="w-12 bg-slate-100 rounded-full h-1.5 overflow-hidden shadow-inner">
                <div className="h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-emerald-500" style={{ width: `${l.conversionProb}%` }} />
              </div>
              <span className="text-[10px] text-slate-800 font-black">{l.conversionProb}%</span>
            </div>
          )},
          { label: 'Status', render: l => <Badge label={l.status} color={statusColorMap[l.status]}/> },
        ]}
        data={filtered}
      />

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backdropFilter:'blur(4px)',backgroundColor:'rgba(15,23,42,0.4)'}} onClick={()=>setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full" onClick={e=>e.stopPropagation()} style={{animation:'modalIn 0.2s ease-out'}}>
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="text-slate-800 text-lg font-bold">{selected.name}</h3>
                <p className="text-slate-400 text-sm">{selected.company} • {selected.city}</p>
              </div>
              <Badge label={selected.status} color={statusColorMap[selected.status]}/>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[['Mobile',selected.mobile],['Email',selected.email],['Source',selected.source],['Product',selected.product],['Value',formatCurrency(selected.value)],['Stage',selected.stage],['Salesperson',selected.salesperson],['Next Follow-up',selected.nextFollowup],['Enquiry Date',selected.enquiryDate],['Conversion %',`${selected.conversionProb}%`]].map(([l,v],i)=>(
                <div key={i}><p className="text-slate-400 text-xs font-medium">{l}</p><p className="text-slate-800 text-sm font-semibold mt-0.5">{v}</p></div>
              ))}
            </div>
            <div className="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100">
              <p className="text-slate-400 text-xs font-medium mb-1">Notes</p>
              <p className="text-slate-700 text-sm">{selected.notes}</p>
            </div>
            <button onClick={()=>setSelected(null)} className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">Close</button>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      <Modal open={showForm} onClose={()=>setShowForm(false)} title="Add New Lead" subtitle="Enter complete lead details" size="lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <F label="Contact Name" req><div>{inp('name','Full name')}</div></F>
          <F label="Company Name" req><div>{inp('company','Company / Firm name')}</div></F>
          <F label="Mobile Number" req><div>{inp('mobile','10-digit mobile')}</div></F>
          <F label="Email ID"><div>{inp('email','email@example.com','email')}</div></F>
          <F label="City"><div>{inp('city','City name')}</div></F>
          <F label="Lead Source" req><div>{sel('source', sourceOptions)}</div></F>
          <div className="sm:col-span-2">
            <F label="Product / Requirement" req><div>{inp('product','Product name or requirement')}</div></F>
          </div>
          <F label="Estimated Value (₹)" req><div>{inp('value','e.g. 65000','number')}</div></F>
          <F label="Status" req><div>{sel('status',['Hot','Warm','Cold'])}</div></F>
          <F label="Stage" req><div>{sel('stage', stageOptions)}</div></F>
          <F label="Salesperson" req>
            <div>
              <select name="salesperson" value={form.salesperson} onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all">
                <option value="">-- Select --</option>
                {employees.filter(e=>e.department==='Sales').map(e=><option key={e.id} value={e.name}>{e.name}</option>)}
              </select>
            </div>
          </F>
          <F label="Next Follow-up Date" req><div>{inp('nextFollowup','','date')}</div></F>
          <F label="Conversion Probability (%)">
            <div className="flex items-center gap-3">
              <input type="range" name="conversionProb" min="0" max="100" step="5" value={form.conversionProb} onChange={handleChange} className="flex-1 accent-indigo-600" />
              <span className="text-indigo-700 font-bold text-sm w-10 text-right">{form.conversionProb}%</span>
            </div>
          </F>
          <div className="sm:col-span-2">
            <F label="Notes">
              <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any additional notes or remarks..." rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all resize-none" />
            </F>
          </div>
        </div>
        <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
      </Modal>
    </div>
  );
};

export default CRM;
