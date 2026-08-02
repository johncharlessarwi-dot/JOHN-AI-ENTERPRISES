import React from 'react';
import { BarChart3, TrendingUp, Users, Clock, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const languageDistribution = [
  { name: 'Swahili', value: 65, color: '#10b981' },
  { name: 'English', value: 25, color: '#14b8a6' },
  { name: 'Mixed (Swa/Eng)', value: 10, color: '#06b6d4' },
];

const conversionFunnel = [
  { stage: 'Inbound Chats', count: 1200 },
  { stage: 'AI Qualified', count: 980 },
  { stage: 'Service Selected', count: 750 },
  { stage: 'Paid & Closed', count: 620 },
];

export function AnalyticsView() {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 p-8 space-y-6 text-slate-100">
      {/* Header */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Analytics & Business Intelligence</h2>
            <p className="text-slate-400 text-sm">Deep performance metrics for John Online Services WhatsApp Business OS.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <h3 className="font-bold text-white text-base mb-1">Customer Conversion Funnel</h3>
          <p className="text-xs text-slate-400 mb-6">From initial WhatsApp chat to closed sale</p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionFunnel} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                <YAxis dataKey="stage" type="category" stroke="#94a3b8" fontSize={12} width={120} />
                <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="count" fill="#10b981" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Language Breakdown */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white text-base mb-1">Language Distribution</h3>
            <p className="text-xs text-slate-400 mb-4">Customer language preferences on WhatsApp</p>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {languageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-center">
            {languageDistribution.map((lang) => (
              <div key={lang.name}>
                <p className="text-xs text-slate-400">{lang.name}</p>
                <p className="text-lg font-bold text-white mt-0.5">{lang.value}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
