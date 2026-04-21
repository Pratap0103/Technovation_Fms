import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { PageHeader, Badge, SearchBar, Btn, formatDate, statusColor, DataTable } from '../components/UI';
import Modal from '../components/Modal';
import { complaints as initialComplaints, customers, employees, products } from '../data/dummyData';

const emptyForm = {
  customer: '',
  product: '',
  type: 'Breakdown',
  priority: 'High',
  desc: '',
  assignedTo: '',
};

const Service = () => {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const statuses = ['All', 'Open', 'In Progress', 'Resolved', 'Closed'];
  const filtered = complaints.filter(c =>
    (c.id.toLowerCase().includes(search.toLowerCase()) || c.customerName.toLowerCase().includes(search.toLowerCase())) &&
    (filter === 'All' || c.status === filter)
  );

  const techTeam = employees.filter(e => e.department === 'Technical');

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    const selectedCustomer = customers.find(c => c.company === form.customer || c.name === form.customer);
    const selectedProduct = products.find(p => p.name === form.product);

    setComplaints(p => [{
      ...form,
      id: `SR${String(p.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      customerName: form.customer,
      productName: form.product,
      complaintDesc: form.desc,
      status: 'Open',
      partsChanged: 'N/A',
      serviceCost: 0,
      engineer: form.assignedTo
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
      <PageHeader title="Service & Complaints" subtitle="Track breakdowns, PMs, and engineer tasks"
        action={<Btn label="Log Complaint" icon={Plus} color="indigo" onClick={() => setShowForm(true)} />}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Tickets', value: complaints.length, color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-100' },
          { label: 'Open', value: complaints.filter(c => c.status === 'Open').length, color: 'text-red-700', bg: 'bg-red-50 border-red-100' },
          { label: 'In Progress', value: complaints.filter(c => c.status === 'In Progress').length, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-100' },
          { label: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-100' },
        ].map((s, i) => (
          <div key={i} className={`bg-white border rounded-xl p-4 text-center shadow-sm ${s.bg}`}>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5 font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by SR No, Customer..." />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statuses.map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${filter === s ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>{s}</button>
          ))}
        </div>
      </div>

      <DataTable
        columns={[
          { label: 'SR #', render: c => <span className="font-mono text-indigo-700 font-bold">{c.id}</span> },
          { label: 'Customer', render: c => (
            <div>
              <p className="text-slate-800 font-bold">{c.customerName}</p>
              <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wider">{c.productName}</p>
            </div>
          )},
          { label: 'Issue Description', render: c => (
            <div className="max-w-[200px]">
              <p className="text-slate-700 text-xs font-semibold truncate">{c.complaintDesc}</p>
              <div className="flex gap-2 mt-1">
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${c.priority==='High'?'bg-red-50 text-red-600 border border-red-100':'bg-slate-50 text-slate-500'}`}>
                  {c.priority}
                </span>
                <span className="text-[9px] text-slate-400 font-bold uppercase">{c.type}</span>
              </div>
            </div>
          )},
          { label: 'Assigned Engineer', render: c => (
            <div className="text-xs">
              <p className="text-indigo-600 font-bold">{c.engineer}</p>
              <p className="text-slate-400 text-[10px] font-medium">{formatDate(c.date)}</p>
            </div>
          )},
          { label: 'Status', render: c => <Badge label={c.status} color={statusColor(c.status)}/> },
        ]}
        data={filtered}
      />

      <Modal open={showForm} onClose={() => setShowForm(false)} title="Log New Complaint" subtitle="Create a service ticket and assign an engineer" size="md" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <F label="Customer" req>
            <div>
              <select name="customer" value={form.customer} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all">
                <option value="">-- Select Customer --</option>
                {customers.map(cust => <option key={cust.id} value={cust.company}>{cust.company}</option>)}
              </select>
            </div>
          </F>

          <F label="Product / Machine" req>
            <div>
              <select name="product" value={form.product} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all">
                <option value="">-- Select Product --</option>
                {products.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </div>
          </F>
          
          <div className="grid grid-cols-2 gap-4">
            <F label="Service Type" req><div>{selEl('type', ['Breakdown', 'Routine PM', 'Installation check', 'Warranty Claim'])}</div></F>
            <F label="Priority Level" req><div>{selEl('priority', ['Low', 'Normal', 'High'])}</div></F>
          </div>

          <F label="Issue Description" req>
            <div>
              <textarea name="desc" value={form.desc} onChange={handleChange} placeholder="Describe the problem in detail..." rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all resize-none" />
            </div>
          </F>

          <F label="Assign Engineer">
            <div>
              <select name="assignedTo" value={form.assignedTo} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all">
                <option value="">-- Leave Unassigned --</option>
                {techTeam.map(e => <option key={e.id} value={e.name}>{e.name} ({e.role})</option>)}
              </select>
            </div>
          </F>
        </div>
      </Modal>

    </div>
  );
};

export default Service;
