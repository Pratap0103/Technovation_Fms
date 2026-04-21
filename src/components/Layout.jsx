import React, { useState } from 'react';
import {
  LayoutDashboard, TrendingUp, Users, ShoppingCart, Package,
  Box, Wrench, Shield, Receipt, Clock, Truck, FileText,
  BookOpen, BarChart3, Menu, X, ChevronRight, Bell, Search,
  Settings, Building2, LogOut
} from 'lucide-react';

const navItems = [
  { id: 'dashboard',    label: 'Dashboard',         icon: LayoutDashboard },
  { id: 'crm',          label: 'CRM / Leads',        icon: Users },
  { id: 'sales',        label: 'Sales',              icon: TrendingUp },
  { id: 'purchase',     label: 'Purchase',           icon: ShoppingCart },
  { id: 'inventory',    label: 'Inventory',          icon: Box },
  { id: 'products',     label: 'Products',           icon: Package },
  { id: 'customers',    label: 'Customers',          icon: BookOpen },
  { id: 'vendors',      label: 'Vendors',            icon: Building2 },
  { id: 'installation', label: 'Installation',       icon: Wrench },
  { id: 'service',      label: 'Service / Complaint',icon: Settings },
  { id: 'warranty',     label: 'Warranty Claims',    icon: Shield },
  { id: 'expenses',     label: 'Expenses',           icon: Receipt },
  { id: 'attendance',   label: 'Attendance',         icon: Clock },
  { id: 'bilty',        label: 'Bilty & Dispatch',   icon: Truck },
  { id: 'accounts',     label: 'Accounts & P&L',     icon: BarChart3 },
];

const Layout = ({ currentPage, setCurrentPage, children, user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const current = navItems.find(n => n.id === currentPage);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative z-40 flex flex-col h-full bg-white border-r border-slate-200 shadow-sm
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'w-60' : 'w-16'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-100 min-h-[68px]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-200">
            <Building2 size={18} className="text-white" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="text-slate-800 font-extrabold text-sm leading-tight">Trading Business</p>
              <p className="text-indigo-600 text-xs font-semibold">Management System</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); setMobileOpen(false); }}
                title={!sidebarOpen ? item.label : ''}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left
                  transition-all duration-150 group
                  ${active
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }
                `}
              >
                <Icon size={17} className="flex-shrink-0" />
                {sidebarOpen && (
                  <span className="text-sm font-medium truncate flex-1">{item.label}</span>
                )}
                {sidebarOpen && active && <ChevronRight size={13} className="ml-auto opacity-70" />}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-100 space-y-1">
          <button
            onClick={() => setSidebarOpen(p => !p)}
            className="w-full hidden lg:flex items-center gap-3 px-3 py-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <Menu size={17} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Collapse Menu</span>}
          </button>
          
          <button
            onClick={onLogout}
            title={!sidebarOpen ? "Logout" : ""}
            className="w-full flex items-center gap-3 px-3 py-2 border border-red-100 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 transition-colors mt-2"
          >
            <LogOut size={17} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-bold">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Topbar */}
        <header className="h-[68px] bg-white border-b border-slate-200 flex items-center px-4 lg:px-6 gap-4 flex-shrink-0 shadow-sm z-10">
          <button onClick={() => setMobileOpen(p => !p)} className="lg:hidden text-slate-500 hover:text-slate-800">
            <Menu size={22} />
          </button>

          <div className="flex-1">
            <h1 className="text-slate-800 font-bold text-lg">{current?.label || 'Dashboard'}</h1>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 border border-slate-200">
            <Search size={14} className="text-slate-400" />
            <input placeholder="Search..." className="bg-transparent text-sm text-slate-700 outline-none w-40 placeholder-slate-400" />
          </div>

          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors">
            <Bell size={19} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 ml-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="hidden sm:block">
              <p className="text-slate-800 text-xs font-bold leading-none capitalize">{user?.username || 'User'}</p>
              <p className="text-slate-400 text-xs mt-0.5">{user?.role || 'Staff'}</p>
            </div>
          </div>
        </header>

        {/* Main Content Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto flex flex-col bg-slate-100">
          <main className="flex-1 p-4 lg:p-6">
            {children}
          </main>
        </div>

        {/* Global Fixed Footer */}
        <footer className="h-10 border-t border-slate-200 bg-white px-6 flex justify-center items-center shadow-[0_-2px_10px_rgba(0,0,0,0.02)] z-10">
          <p className="text-xs text-slate-500 font-medium tracking-wide">
            Powered By <a href="https://www.botivate.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold hover:underline transition-all">Botivate</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
