import React, { useState } from 'react';
import { MapPin, Clock, Car } from 'lucide-react';
import { PageHeader, Badge, statusColor, DataTable } from '../components/UI';
import { attendance, employees } from '../data/dummyData';

const Attendance = () => {
  const [dateFilter] = useState('2026-04-08');

  const todayData = attendance.filter(a => a.date === dateFilter);
  const present = todayData.filter(a => a.status === 'Present').length;
  const absent = todayData.filter(a => a.status === 'Absent').length;
  const late = todayData.filter(a => a.status === 'Late').length;
  const totalTravel = todayData.reduce((s, a) => s + a.travel, 0);

  const statusBg = { Present: 'bg-emerald-100', Absent: 'bg-red-100', Late: 'bg-amber-100' };
  const statusIcon = { Present: '✓', Absent: '✗', Late: '⏰' };
  const statusIconColor = { Present: 'text-emerald-600', Absent: 'text-red-600', Late: 'text-amber-600' };

  return (
    <div className="space-y-6">
      <PageHeader title="Attendance & Field Tracking" subtitle="Live attendance, GPS punch-in, and travel tracking" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Present', value: present, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-100' },
          { label: 'Absent', value: absent, color: 'text-red-700', bg: 'bg-red-50 border-red-100' },
          { label: 'Late', value: late, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-100' },
          { label: 'Total Travel', value: `${totalTravel} km`, color: 'text-sky-700', bg: 'bg-sky-50 border-sky-100' },
        ].map((s, i) => (
          <div key={i} className={`bg-white border rounded-xl p-4 text-center shadow-sm ${s.bg}`}>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1 font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm">
        <Clock size={18} className="text-indigo-500" />
        <span className="text-slate-800 font-bold">Attendance for: {new Date(dateFilter).toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</span>
        <span className="ml-auto text-indigo-700 font-semibold text-sm bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">{present}/{todayData.length} Present</span>
      </div>

      <DataTable
        columns={[
          { label: 'Employee', render: a => (
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-inner ${statusBg[a.status]}`}>
                <span className={statusIconColor[a.status]}>{statusIcon[a.status]}</span>
              </div>
              <div>
                <p className="text-slate-800 font-bold">{a.name}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{employees.find(e => e.id === a.empId)?.role || 'Staff'}</p>
              </div>
            </div>
          )},
          { label: 'Punch In/Out', render: a => (
            <div className="text-xs">
              <p className="text-emerald-700 font-bold">In: {a.punchIn || '—'}</p>
              <p className="text-amber-600 font-bold">Out: {a.punchOut || 'Active'}</p>
            </div>
          )},
          { label: 'Travel Tracking', render: a => (
            <div className="w-48">
              <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-bold">
                <span>{a.travel} km</span><span>Max 350km</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="h-1.5 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500" style={{ width: `${Math.min(100, (a.travel / 350) * 100)}%` }} />
              </div>
            </div>
          )},
          { label: 'Location', render: a => (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 max-w-[150px] truncate">
              <MapPin size={12} className="text-indigo-400 flex-shrink-0" />
              <span className="truncate">{a.location || 'N/A'}</span>
            </div>
          )},
          { label: 'Status', render: a => <Badge label={a.status} color={statusColor(a.status)}/> },
        ]}
        data={todayData}
      />

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-slate-800 font-bold mb-4">Travel Summary – Today</h3>
        <div className="space-y-3.5">
          {todayData.filter(a => a.travel > 0).sort((a, b) => b.travel - a.travel).map(a => (
            <div key={a.id} className="flex items-center gap-4">
              <p className="text-slate-700 font-semibold text-sm w-36 truncate">{a.name}</p>
              <div className="flex-1 bg-slate-100 rounded-full h-2.5 shadow-inner">
                <div className="h-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-sky-500" style={{ width: `${Math.min(100, (a.travel / 350) * 100)}%` }} />
              </div>
              <span className="text-sky-700 text-sm font-black w-16 text-right">{a.travel} km</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
