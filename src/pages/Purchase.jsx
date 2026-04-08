import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader, Badge, SearchBar, Btn, formatCurrency, formatDate, statusColor } from '../components/UI';
import Modal from '../components/Modal';
import { purchases as initialPurchases, vendors, products } from '../data/dummyData';

const emptyForm = {
  date: new Date().toISOString().split('T')[0],
  vendor: '', product: '', qty: 1, rate: '', notes: '',
};

const Purchase = () => {
  const [purchases, setPurchases] = useState(initialPurchases);
  const [search, setSearch] = useState('');
  const [payFilter, setPayFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = purchases.filter(p => {
    const s = search.toLowerCase();
    return (p.vendorName.toLowerCase().includes(s) || p.productName.toLowerCase().includes(s) || p.id.toLowerCase().includes(s))
      && (payFilter === 'All' || p.paymentStatus === payFilter);
  });

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    const qty = Number(form.qty) || 1;
    const rate = Number(form.rate) || 0;
    const amount = qty * rate;
    const selectedProduct = products.find(p => p.name === form.product);
    const gstPct = selectedProduct ? selectedProduct.gst / 100 : 0.18;
    const gst = Math.round(amount * gstPct);
    const selectedVendor = vendors.find(v => v.company === form.vendor);
    const newPO = {
      id: `PO${String(purchases.length + 1).padStart(3, '0')}`,
      date: form.date,
      vendor: selectedVendor?.id || 'NEW',
      vendorName: form.vendor,
      product: selectedProduct?.id || 'NEW',
      productName: form.product,
      qty, rate, amount, gst, total: amount + gst,
      status: 'Ordered',
      paymentStatus: 'Unpaid',
    };
    setPurchases(p => [newPO, ...p]);
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

  const liveQty = Number(form.qty) || 0;
  const liveRate = Number(form.rate) || 0;
  const liveAmount = liveQty * liveRate;
  const liveGst = Math.round(liveAmount * 0.18);
  const liveTotal = liveAmount + liveGst;

  return (
    <div className="space-y-5">
      <PageHeader title="Purchase Management" subtitle="PO tracking, vendor bills, and payments"
        action={<Btn label="New Purchase Order" icon={Plus} color="indigo" onClick={() => setShowForm(true)} />}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total POs', value: purchases.length, color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-100' },
          { label: 'Total Purchase', value: formatCurrency(purchases.reduce((s,p)=>s+p.total,0)), color: 'text-red-700', bg: 'bg-red-50 border-red-100' },
          { label: 'Paid', value: formatCurrency(purchases.filter(p=>p.paymentStatus==='Paid').reduce((s,p)=>s+p.total,0)), color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-100' },
          { label: 'Outstanding', value: formatCurrency(purchases.filter(p=>p.paymentStatus!=='Paid').reduce((s,p)=>s+p.total,0)), color: 'text-amber-700', bg: 'bg-amber-50 border-amber-100' },
        ].map((s,i)=>(
          <div key={i} className={`bg-white border rounded-xl p-4 text-center shadow-sm ${s.bg}`}>
            <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5 font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search PO, vendor, product..." /></div>
        <select value={payFilter} onChange={e=>setPayFilter(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none shadow-sm">
          {['All','Paid','Partial','Unpaid'].map(o=><option key={o}>{o}</option>)}
        </select>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-100 bg-slate-50">
              {['PO #','Date','Vendor','Product','Qty','Amount','GST','Total','Status','Payment'].map((h,i)=>(
                <th key={i} className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wider px-3 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(p=>(
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-3 text-indigo-700 font-bold text-xs whitespace-nowrap">{p.id}</td>
                  <td className="px-3 py-3 text-slate-500 text-xs whitespace-nowrap">{formatDate(p.date)}</td>
                  <td className="px-3 py-3 text-slate-800 font-semibold whitespace-nowrap truncate max-w-[150px]">{p.vendorName}</td>
                  <td className="px-3 py-3 text-slate-600 whitespace-nowrap truncate max-w-[160px]">{p.productName}</td>
                  <td className="px-3 py-3 text-slate-700 text-center font-semibold whitespace-nowrap">{p.qty}</td>
                  <td className="px-3 py-3 text-slate-700 whitespace-nowrap">{formatCurrency(p.amount)}</td>
                  <td className="px-3 py-3 text-slate-400 text-xs whitespace-nowrap">{formatCurrency(p.gst)}</td>
                  <td className="px-3 py-3 text-red-700 font-black whitespace-nowrap">{formatCurrency(p.total)}</td>
                  <td className="px-3 py-3"><Badge label={p.status} color={statusColor(p.status)}/></td>
                  <td className="px-3 py-3"><Badge label={p.paymentStatus} color={statusColor(p.paymentStatus)}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={showForm} onClose={()=>setShowForm(false)} title="New Purchase Order" subtitle="Create a new purchase order from vendor" size="lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <F label="PO Date" req><div>{inp('date','','date')}</div></F>
          <F label="Vendor" req>
            <div>
              <select name="vendor" value={form.vendor} onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all">
                <option value="">-- Select Vendor --</option>
                {vendors.map(v=><option key={v.id} value={v.company}>{v.company}</option>)}
              </select>
            </div>
          </F>
          <F label="Product" req>
            <div>
              <select name="product" value={form.product} onChange={e=>{
                handleChange(e);
                const p = products.find(p=>p.name===e.target.value);
                if(p) setForm(prev=>({...prev, product:p.name, rate:p.purchaseRate}));
              }}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all">
                <option value="">-- Select Product --</option>
                {products.map(p=><option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </div>
          </F>
          <F label="Quantity" req><div>{inp('qty','1','number')}</div></F>
          <F label="Purchase Rate (₹)" req><div>{inp('rate','Unit cost','number')}</div></F>
          <div className="sm:col-span-2">
            <F label="Notes"><div>
              <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Optional notes..." rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:bg-white transition-all resize-none" />
            </div></F>
          </div>
        </div>
        {liveAmount > 0 && (
          <div className="mt-4 bg-red-50 border border-red-100 rounded-xl p-4 grid grid-cols-3 gap-3 text-center">
            {[['Amount',formatCurrency(liveAmount),'text-slate-700'],['GST (18%)',formatCurrency(liveGst),'text-orange-600'],['Total',formatCurrency(liveTotal),'text-red-700 font-black text-base']].map(([l,v,cls],i)=>(
              <div key={i}><p className="text-xs text-slate-400 font-medium">{l}</p><p className={`text-sm font-bold mt-0.5 ${cls}`}>{v}</p></div>
            ))}
          </div>
        )}
        <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
      </Modal>
    </div>
  );
};

export default Purchase;
