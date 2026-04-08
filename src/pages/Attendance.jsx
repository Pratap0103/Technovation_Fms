import React, { useState } from 'react';
import { MapPin, Clock, Car } from 'lucide-react';
import { PageHeader, Badge, statusColor } from '../components/UI';
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {todayData.map(a => (
          <div key={a.id} className={`bg-white border ${a.status === 'Absent' ? 'border-red-100 bg-red-50/30' : 'border-slate-200'} rounded-xl p-4 shadow-sm`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-inner ${statusBg[a.status]}`}>
                  <span className={statusIconColor[a.status]}>{statusIcon[a.status]}</span>
                </div>
                <div>
                  <p className="text-slate-800 font-bold">{a.name}</p>
                  <p className="text-slate-500 text-xs font-medium mt-0.5">{employees.find(e => e.id === a.empId)?.role}</p>
                </div>
              </div>
              <Badge label={a.status} color={statusColor(a.status)} />
            </div>

            {a.status !== 'Absent' ? (
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-center">
                  <p className="text-slate-500 mb-0.5 font-medium">Punch In</p>
                  <p className="text-emerald-700 font-bold">{a.punchIn || '—'}</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-center">
                  <p className="text-slate-500 mb-0.5 font-medium">Punch Out</p>
                  <p className="text-amber-600 font-bold">{a.punchOut || 'Active'}</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-center">
                  <p className="text-slate-500 mb-0.5 font-medium">Travel</p>
                  <p className="text-sky-600 font-bold">{a.travel} km</p>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-center text-xs font-bold text-red-600">Not punched in today</div>
            )}

            {a.location && (
              <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500 font-medium">
                <MapPin size={12} className="text-indigo-500 flex-shrink-0" />
                <span>{a.location}</span>
              </div>
            )}

            {a.travel > 0 && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-slate-500 font-medium mb-1.5">
                  <span className="flex items-center gap-1"><Car size={11} className="text-sky-500"/> Travel</span>
                  <span className="text-sky-700 font-bold">{a.travel} km</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 shadow-inner">
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500" style={{ width: `${Math.min(100, (a.travel / 350) * 100)}%` }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

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
