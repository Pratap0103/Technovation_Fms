import React, { useState } from 'react';
import { Building2, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin({ username: 'admin', role: 'Admin' });
    } else if (username === 'user' && password === 'user123') {
      onLogin({ username: 'user', role: 'Staff' });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* Left side - Branding & Hero (hidden on small screens) */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-indigo-600 px-12 py-16 relative overflow-hidden text-white">
        {/* Background Patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <polygon fill="currentColor" points="0,0 100,0 0,100"/>
           </svg>
        </div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl mix-blend-overlay"></div>
        <div className="absolute top-1/4 -left-16 w-64 h-64 bg-indigo-400 opacity-20 rounded-full blur-3xl mix-blend-overlay"></div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-indigo-900/20">
            <Building2 size={24} className="text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl font-black leading-tight tracking-tight">Trading</h1>
            <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest">Business Management</p>
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl lg:text-4xl font-black mb-6 leading-[1.1]">
            Intelligent Business Management
          </h2>
          <p className="text-indigo-100 text-base leading-relaxed mb-8 opacity-90 border-l-2 border-indigo-400 pl-4">
            Unified platform for CRM, Sales, Purchase, Inventory, Field Tracking, and P&L analytics. Streamline your operations today.
          </p>
          
          <div className="flex items-center gap-4 text-sm font-semibold text-indigo-200">
             <div className="flex -space-x-3">
               <div className="w-8 h-8 rounded-full bg-indigo-800 border-2 border-indigo-600 flex items-center justify-center">1</div>
               <div className="w-8 h-8 rounded-full bg-indigo-700 border-2 border-indigo-600 flex items-center justify-center">2</div>
               <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-indigo-600 flex items-center justify-center">3</div>
             </div>
             <p>Used by Top Engineers</p>
          </div>
        </div>
        
        <div className="relative z-10 text-sm text-indigo-200/60 font-medium">
          © 2026 Trading Business Management System. All rights reserved.
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 bg-white relative">
        
        {/* Mobile Header (only shows on mobile) */}
        <div className="md:hidden flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
            <Building2 size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 leading-tight">Trading</h1>
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest">Business Management</p>
          </div>
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Welcome back</h2>
            <p className="text-slate-500 text-sm font-medium">Please enter your details to sign in.</p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 ml-1">Username</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-4.5 w-4.5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(''); }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium placeholder-slate-400"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 ml-1">Password</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4.5 w-4.5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium placeholder-slate-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5 text-slate-400 hover:text-indigo-600 transition-colors" /> : <Eye className="h-4.5 w-4.5 text-slate-400 hover:text-indigo-600 transition-colors" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-100 text-center font-semibold animate-pulse">
                {error}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-md shadow-indigo-600/20 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In to Dashboard
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Demo Credentials Hint */}
            <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-4">
               <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Demo Access</p>
               <div className="flex gap-4">
                 <div className="flex-1 bg-white p-2 rounded-lg border border-slate-100 shadow-sm cursor-pointer hover:border-indigo-300 transition-colors" onClick={() => {setUsername('admin'); setPassword('admin123')}}>
                   <p className="text-xs font-bold text-slate-800 mb-0.5">Admin Role</p>
                   <p className="text-[10px] font-mono text-slate-500">admin / admin123</p>
                 </div>
                 <div className="flex-1 bg-white p-2 rounded-lg border border-slate-100 shadow-sm cursor-pointer hover:border-indigo-300 transition-colors" onClick={() => {setUsername('user'); setPassword('user123')}}>
                   <p className="text-xs font-bold text-slate-800 mb-0.5">Staff Role</p>
                   <p className="text-[10px] font-mono text-slate-500">user / user123</p>
                 </div>
               </div>
            </div>
          </form>
        </div>

        {/* Global Footer in Login */}
        <div className="absolute bottom-6 left-0 w-full text-center">
          <p className="text-[11px] text-slate-500 font-medium">
            Powered By <a href="https://www.botivate.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold hover:underline transition-all">Botivate</a>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;
