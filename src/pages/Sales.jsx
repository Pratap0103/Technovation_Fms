import React, { useState } from 'react';
import { Plus, Eye } from 'lucide-react';
import { PageHeader, Badge, SearchBar, Btn, formatCurrency, formatDate, statusColor, DataTable } from '../components/UI';
import Modal from '../components/Modal';
import { salesOrders as initialOrders, customers, products } from '../data/dummyData';

const emptyForm = {
  date: new Date().toISOString().split('T')[0],
  customer: '', product: '', qty: 1, rate: '',
  type: 'Cash', salesperson: '',
  installRequired: 'No', notes: '',
};

const Sales = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = orders.filter(o => {
    const s = search.toLowerCase();
    return (o.customerName.toLowerCase().includes(s) || o.productName.toLowerCase().includes(s) || o.id.toLowerCase().includes(s))
      && (typeFilter === 'All' || o.type === typeFilter)
      && (statusFilter === 'All' || o.status === statusFilter);
  });

  const totalRevenue = salesOrders => salesOrders.reduce((s, o) => s + o.total, 0);
  const paid = orders.filter(o => o.paymentStatus === 'Paid').reduce((s, o) => s + o.total, 0);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    const qty = Number(form.qty) || 1;
    const rate = Number(form.rate) || 0;
    const amount = qty * rate;
    const selectedProduct = products.find(p => p.name === form.product);
    const gstPct = selectedProduct ? selectedProduct.gst / 100 : 0.18;
    const gst = Math.round(amount * gstPct);
    const total = amount + gst;
    const selectedCustomer = customers.find(c => c.company === form.customer || c.name === form.customer);
    const newOrder = {
      id: `SO${String(orders.length + 1).padStart(3, '0')}`,
      date: form.date,
      customer: selectedCustomer?.id || 'NEW',
      customerName: form.customer,
      product: selectedProduct?.id || 'NEW',
      productName: form.product,
      qty, rate, amount, gst, total,
      type: form.type,
      status: 'Confirmed',
      installStatus: form.installRequired === 'Yes' ? 'Not Scheduled' : 'N/A',
      paymentStatus: form.type === 'Cash' ? 'Paid' : 'Unpaid',
      salesperson: form.salesperson,
    };
    setOrders(p => [newOrder, ...p]);
    setShowForm(false);
    setForm(emptyForm);
  };

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
  const F = ({ label, req, children }) => (
    <div><label className="block text-xs font-semibold text-slate-600 mb-1">{label}{req && <span className="text-red-500 ml-0.5">*</span>}</label>{children}</div>
  );

  // Live total calc
  const liveQty = Number(form.qty) || 0;
  const liveRate = Number(form.rate) || 0;
  const liveAmount = liveQty * liveRate;
  const liveGst = Math.round(liveAmount * 0.18);
  const liveTotal = liveAmount + liveGst;

  return (
    <div className="space-y-5">
      <PageHeader title="Sales Management" subtitle="Orders, invoices, delivery and installation"
        action={<Btn label="New Sale Order" icon={Plus} color="indigo" onClick={() => setShowForm(true)} />}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Orders', value: orders.length, color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-100' },
          { label: 'Total Revenue', value: formatCurrency(orders.reduce((s,o)=>s+o.total,0)), color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-100' },
          { label: 'Collected', value: formatCurrency(paid), color: 'text-sky-700', bg: 'bg-sky-50 border-sky-100' },
          { label: 'Outstanding', value: formatCurrency(orders.reduce((s,o)=>s+o.total,0)-paid), color: 'text-red-700', bg: 'bg-red-50 border-red-100' },
        ].map((s,i)=>(
          <div key={i} className={`bg-white border rounded-xl p-4 text-center shadow-sm ${s.bg}`}>
            <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5 font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search order, customer, product..." /></div>
        <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none shadow-sm">
          {['All','Cash','Credit'].map(o=><option key={o}>{o}</option>)}
        </select>
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none shadow-sm">
          {['All','Confirmed','Processing','Dispatched','Delivered'].map(o=><option key={o}>{o}</option>)}
        </select>
      </div>

      <DataTable
        columns={[
          { label: 'Order #', render: o => <span className="font-mono text-indigo-700 font-bold">{o.id}</span> },
          { label: 'Customer', render: o => (
            <div>
              <p className="text-slate-800 font-bold">{o.customerName}</p>
              <p className="text-slate-400 text-[10px] font-medium">{formatDate(o.date)}</p>
            </div>
          )},
          { label: 'Product', render: o => (
            <div className="max-w-[150px] truncate">
              <p className="text-slate-700 font-medium truncate">{o.productName}</p>
              <p className="text-[10px] text-slate-400">Qty: {o.qty}</p>
            </div>
          )},
          { label: 'Total Amount', render: o => (
            <div className="flex flex-col items-start">
              <span className="text-emerald-700 font-black">{formatCurrency(o.total)}</span>
              <span className="text-[10px] text-slate-400">Incl. GST</span>
            </div>
          )},
          { label: 'Type', render: o => <Badge label={o.type} color={o.type==='Cash'?'green':'purple'}/> },
          { label: 'Status', render: o => <Badge label={o.status} color={statusColor(o.status)}/> },
          { label: 'Payment', render: o => <Badge label={o.paymentStatus} color={statusColor(o.paymentStatus)}/> },
          { label: 'Actions', render: o => (
            <button onClick={()=>setSelected(o)} className="text-indigo-600 hover:text-indigo-800 p-1.5 hover:bg-indigo-50 rounded-lg transition-colors">
              <Eye size={16}/>
            </button>
          )},
        ]}
        data={filtered}
      />
      <div className="px-4 py-3 border-t border-slate-100 flex justify-between text-xs text-slate-400 bg-white rounded-b-xl border border-slate-200 border-t-0 -mt-1 shadow-sm">
        <span>{filtered.length} orders found</span>
        <span>Total Portfolio: <span className="text-emerald-700 font-black">{formatCurrency(filtered.reduce((s,o)=>s+o.total,0))}</span></span>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backdropFilter:'blur(4px)',backgroundColor:'rgba(15,23,42,0.4)'}} onClick={()=>setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full" onClick={e=>e.stopPropagation()} style={{animation:'modalIn 0.2s ease-out'}}>
            <div className="flex justify-between mb-5">
              <div><h3 className="text-slate-800 text-lg font-bold">Order {selected.id}</h3><p className="text-slate-400 text-sm">{formatDate(selected.date)} • {selected.salesperson}</p></div>
              <div className="flex gap-2"><Badge label={selected.status} color={statusColor(selected.status)}/><Badge label={selected.type} color={selected.type==='Cash'?'green':'purple'}/></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              {[['Customer',selected.customerName],['Product',selected.productName],['Quantity',selected.qty],['Rate',formatCurrency(selected.rate)],['Amount',formatCurrency(selected.amount)],['GST',formatCurrency(selected.gst)],['Total',formatCurrency(selected.total)],['Payment Status',selected.paymentStatus],['Installation',selected.installStatus]].map(([l,v],i)=>(
                <div key={i}><p className="text-slate-400 text-xs font-medium">{l}</p><p className="text-slate-800 text-sm font-semibold mt-0.5">{v}</p></div>
              ))}
            </div>
            <button onClick={()=>setSelected(null)} className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">Close</button>
          </div>
        </div>
      )}

      {/* Add Order Modal */}
      <Modal open={showForm} onClose={()=>setShowForm(false)} title="New Sales Order" subtitle="Create a new sale with complete details" size="lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <F label="Order Date" req><div>{inp('date','','date')}</div></F>
          <F label="Sale Type" req><div>{sel('type',['Cash','Credit'])}</div></F>
          <F label="Customer Name" req>
            <div>
              <select name="customer" value={form.customer} onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all">
                <option value="">-- Select Customer --</option>
                {customers.map(c=><option key={c.id} value={c.company}>{c.company}</option>)}
              </select>
            </div>
          </F>
          <F label="Product" req>
            <div>
              <select name="product" value={form.product} onChange={e=>{
                handleChange(e);
                const p = products.find(p=>p.name===e.target.value);
                if(p) setForm(prev=>({...prev, product:p.name, rate:p.salesRate}));
              }}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all">
                <option value="">-- Select Product --</option>
                {products.map(p=><option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </div>
          </F>
          <F label="Quantity" req><div>{inp('qty','1','number')}</div></F>
          <F label="Rate (₹)" req><div>{inp('rate','Unit price','number')}</div></F>
          <F label="Salesperson" req><div>{inp('salesperson','Salesperson name')}</div></F>
          <F label="Installation Required"><div>{sel('installRequired',['No','Yes'])}</div></F>
        </div>

        {/* Live Calculation */}
        {liveAmount > 0 && (
          <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-xl p-4 grid grid-cols-4 gap-3 text-center">
            {[['Amount',formatCurrency(liveAmount),'text-slate-700'],['GST (18%)',formatCurrency(liveGst),'text-orange-600'],['Total',formatCurrency(liveTotal),'text-indigo-700 font-black text-base']].map(([l,v,cls],i)=>(
              <div key={i}><p className="text-xs text-slate-400 font-medium">{l}</p><p className={`text-sm font-bold mt-0.5 ${cls}`}>{v}</p></div>
            ))}
          </div>
        )}

        <div className="mt-4">
          <F label="Notes">
            <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Additional notes..." rows={2}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all resize-none" />
          </F>
        </div>
        <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
      </Modal>
    </div>
  );
};

export default Sales;
