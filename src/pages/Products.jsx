import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader, Badge, SearchBar, Btn, formatCurrency } from '../components/UI';
import Modal from '../components/Modal';
import { products as initialProducts } from '../data/dummyData';

const categories = ['Compressors','Water Systems','HVAC','Spare Parts','Pumps','Electrical','Other'];
const brands = ['Atlas Copco','Aquapure','Daikin','Festo','Leybold','Siemens','Generic','Other'];
const emptyForm = { name:'',code:'',category:'Compressors',brand:'',model:'',hsn:'',gst:18,purchaseRate:'',salesRate:'',warranty:12,unit:'Nos',installRequired:false,serviceType:'Preventive',stock:0 };

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const allCats = ['All', ...new Set(products.map(p=>p.category))];
  const filtered = products.filter(p =>
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase())) &&
    (catFilter==='All' || p.category===catFilter)
  );

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type==='checkbox' ? checked : value }));
  };

  const handleSubmit = () => {
    const margin = ((Number(form.salesRate)-Number(form.purchaseRate))/Number(form.purchaseRate)*100).toFixed(1);
    setProducts(p => [{
      ...form, id:`PNEW${p.length+1}`,
      purchaseRate:Number(form.purchaseRate), salesRate:Number(form.salesRate),
      warranty:Number(form.warranty), gst:Number(form.gst), stock:Number(form.stock),
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

  const margin = form.salesRate && form.purchaseRate
    ? ((Number(form.salesRate)-Number(form.purchaseRate))/Number(form.purchaseRate)*100).toFixed(1)
    : null;

  return (
    <div className="space-y-5">
      <PageHeader title="Product Master" subtitle="Full catalogue with rates, GST and warranty"
        action={<Btn label="Add Product" icon={Plus} color="indigo" onClick={()=>setShowForm(true)} />}
      />

      <div className="flex gap-2">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search product or SKU..." /></div>
        <select value={catFilter} onChange={e=>setCatFilter(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none shadow-sm">
          {allCats.map(c=><option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-100 bg-slate-50">
              {['SKU','Product Name','Category','Brand / Model','HSN','GST%','Purchase Rate','Sales Rate','Margin%','Warranty','Install','Stock'].map((h,i)=>(
                <th key={i} className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wider px-3 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(p=>{
                const m = (((p.salesRate-p.purchaseRate)/p.purchaseRate)*100).toFixed(1);
                return (
                  <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-3 py-3 text-indigo-700 font-mono text-xs font-bold whitespace-nowrap">{p.code}</td>
                    <td className="px-3 py-3 whitespace-nowrap truncate max-w-[200px]"><p className="text-slate-800 font-semibold truncate">{p.name}</p><p className="text-slate-400 text-xs truncate">{p.unit}</p></td>
                    <td className="px-3 py-3 whitespace-nowrap"><Badge label={p.category} color="purple"/></td>
                    <td className="px-3 py-3 text-slate-700 whitespace-nowrap truncate max-w-[150px]">{p.brand}<br/><span className="text-xs text-slate-400 truncate">{p.model}</span></td>
                    <td className="px-3 py-3 text-slate-500 font-mono text-xs">{p.hsn}</td>
                    <td className="px-3 py-3 text-slate-700 font-semibold">{p.gst}%</td>
                    <td className="px-3 py-3 text-slate-700">{formatCurrency(p.purchaseRate)}</td>
                    <td className="px-3 py-3 text-emerald-700 font-bold">{formatCurrency(p.salesRate)}</td>
                    <td className="px-3 py-3 text-sky-700 font-bold">{m}%</td>
                    <td className="px-3 py-3 text-slate-700">{p.warranty} mo</td>
                    <td className="px-3 py-3"><Badge label={p.installRequired?'Yes':'No'} color={p.installRequired?'amber':'slate'}/></td>
                    <td className="px-3 py-3 font-black text-sm">
                      <span className={p.stock<5?'text-red-600':p.stock<10?'text-amber-600':'text-slate-800'}>{p.stock}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={showForm} onClose={()=>setShowForm(false)} title="Add New Product" subtitle="Enter complete product details for the master catalogue" size="lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <F label="Product Name" req><div>{inp('name','e.g. Industrial Air Compressor 5HP')}</div></F>
          <F label="Product Code / SKU" req><div>{inp('code','e.g. IAC-5HP')}</div></F>
          <F label="Category" req><div>{selEl('category', categories)}</div></F>
          <F label="Brand" req><div>{selEl('brand', brands)}</div></F>
          <F label="Model Number"><div>{inp('model','Model number')}</div></F>
          <F label="HSN Code"><div>{inp('hsn','8-digit HSN code')}</div></F>
          <F label="GST %" req><div>{selEl('gst',['5','12','18','28'])}</div></F>
          <F label="Unit"><div>{selEl('unit',['Nos','Set','Kg','Meter','Liter','Box'])}</div></F>
          <F label="Purchase Rate (₹)" req><div>{inp('purchaseRate','Cost price','number')}</div></F>
          <F label="Sales Rate (₹)" req><div>{inp('salesRate','Selling price','number')}</div></F>
          <F label="Warranty (Months)" req><div>{inp('warranty','e.g. 12','number')}</div></F>
          <F label="Opening Stock"><div>{inp('stock','Current stock qty','number')}</div></F>
          <F label="Service Type"><div>{selEl('serviceType',['None','Preventive','AMC','On-Call'])}</div></F>
          <F label="Installation Required">
            <div className="flex items-center gap-3 mt-1.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="installRequired" checked={form.installRequired} onChange={handleChange} className="w-4 h-4 accent-indigo-600 rounded" />
                <span className="text-sm text-slate-700 font-medium">Yes, installation required</span>
              </label>
            </div>
          </F>
        </div>
        {margin && (
          <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
            <p className="text-xs text-slate-400 font-medium">Profit Margin</p>
            <p className="text-2xl font-black text-emerald-700 mt-0.5">{margin}%</p>
            <p className="text-xs text-slate-400 mt-0.5">= {formatCurrency(Number(form.salesRate)-Number(form.purchaseRate))} per unit</p>
          </div>
        )}
        <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
      </Modal>
    </div>
  );
};

export default Products;
