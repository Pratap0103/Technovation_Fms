import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader, Badge, Btn, formatDate, statusColor, DataTable } from '../components/UI';
import Modal from '../components/Modal';
import { installations as initialInstall, customers, employees, salesOrders } from '../data/dummyData';

const emptyForm = {
  salesOrder:'', customer:'', product:'', site:'',
  scheduledDate:'', engineer:'', notes:''
};

const Installation = () => {
  const [installs, setInstalls] = useState(initialInstall);
  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const statuses = ['All','Completed','Scheduled','Pending'];
  const filtered = installs.filter(i => filter==='All' || i.status===filter);

  const techTeam = employees.filter(e=>e.department==='Technical');

  const handleChange = e => setForm(p=>({...p,[e.target.name]:e.target.value}));
  const handleSubmit = () => {
    setInstalls(p=>[{
      ...form,
      id:`INS${String(p.length+1).padStart(3,'0')}`,
      status:'Scheduled',
      completedDate:null, warrantyStart:null, warrantyEnd:null,
    },...p]);
    setShowForm(false); setForm(emptyForm);
  };

  const inp = (name, placeholder, type='text') => (
    <input name={name} type={type} value={form[name]} onChange={handleChange} placeholder={placeholder}
      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all" />
  );
  const F = ({ label, req, children }) => (
    <div><label className="block text-xs font-semibold text-slate-600 mb-1">{label}{req && <span className="text-red-500 ml-0.5">*</span>}</label>{children}</div>
  );

  return (
    <div className="space-y-5">
      <PageHeader title="Installation Management" subtitle="Schedule and track machine installations"
        action={<Btn label="Schedule Installation" icon={Plus} color="indigo" onClick={()=>setShowForm(true)} />}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {label:'Total',value:installs.length,color:'text-indigo-700',bg:'bg-indigo-50 border-indigo-100'},
          {label:'Completed',value:installs.filter(i=>i.status==='Completed').length,color:'text-emerald-700',bg:'bg-emerald-50 border-emerald-100'},
          {label:'Scheduled',value:installs.filter(i=>i.status==='Scheduled').length,color:'text-amber-700',bg:'bg-amber-50 border-amber-100'},
          {label:'Pending',value:installs.filter(i=>i.status==='Pending').length,color:'text-red-700',bg:'bg-red-50 border-red-100'},
        ].map((s,i)=>(
          <div key={i} className={`bg-white border rounded-xl p-4 text-center shadow-sm ${s.bg}`}>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5 font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {statuses.map(s=>(
          <button key={s} onClick={()=>setFilter(s)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter===s?'bg-indigo-600 text-white shadow-sm':'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>{s}</button>
        ))}
      </div>

      <DataTable
        columns={[
          { label: 'ID', render: i => <span className="font-mono text-indigo-700 font-bold">{i.id}</span> },
          { label: 'Customer', render: i => (
            <div>
              <p className="text-slate-800 font-bold">{i.customer}</p>
              <p className="text-slate-500 text-xs">{i.product}</p>
            </div>
          )},
          { label: 'Site / Engineer', render: i => (
            <div className="text-xs">
              <p className="text-slate-700 font-medium truncate max-w-[150px]">{i.site}</p>
              <p className="text-indigo-600 font-semibold">{i.engineer}</p>
            </div>
          )},
          { label: 'Timeline', render: i => (
            <div className="text-xs">
              <p className="text-amber-600 font-bold">Sch: {formatDate(i.scheduledDate)}</p>
              <p className="text-emerald-600 font-bold">Comp: {formatDate(i.completedDate) || '—'}</p>
            </div>
          )},
          { label: 'Sales Order', render: i => <span className="text-xs text-slate-500 font-mono">{i.salesOrder}</span> },
          { label: 'Status', render: i => <Badge label={i.status} color={statusColor(i.status)}/> },
        ]}
        data={filtered}
      />

      <Modal open={showForm} onClose={()=>setShowForm(false)} title="Schedule Installation" subtitle="Link to a sales order and assign an engineer" size="md" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <F label="Sales Order #" req>
            <div>
              <select name="salesOrder" value={form.salesOrder} onChange={e=>{
                handleChange(e);
                const so = salesOrders.find(s=>s.id===e.target.value);
                if(so) setForm(p=>({...p, salesOrder:so.id, customer:so.customerName, product:so.productName}));
              }} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all">
                <option value="">-- Select Sales Order --</option>
                {salesOrders.filter(s=>s.installStatus!=='Completed').map(s=><option key={s.id} value={s.id}>{s.id} – {s.customerName}</option>)}
              </select>
            </div>
          </F>
          {form.customer && <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-sm">
            <p className="font-semibold text-indigo-700">{form.customer}</p>
            <p className="text-slate-500 text-xs mt-0.5">{form.product}</p>
          </div>}
          <F label="Site / Installation Address" req><div>{inp('site','Full site address')}</div></F>
          <F label="Scheduled Date" req><div>{inp('scheduledDate','','date')}</div></F>
          <F label="Installation Engineer" req>
            <div>
              <select name="engineer" value={form.engineer} onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all">
                <option value="">-- Assign Engineer --</option>
                {techTeam.map(e=><option key={e.id} value={e.name}>{e.name} – {e.role}</option>)}
              </select>
            </div>
          </F>
          <F label="Notes"><div>
            <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Special instructions..." rows={2}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all resize-none" />
          </div></F>
        </div>
        <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
      </Modal>
    </div>
  );
};

export default Installation;
