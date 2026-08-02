import React from 'react';
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowUpRight, 
  Bot, 
  Smartphone,
  FileText,
  DollarSign
} from 'lucide-react';
import { AnalyticsStats, Chat } from '../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

interface DashboardViewProps {
  stats: AnalyticsStats;
  chats: Chat[];
  onNavigateTab: (tab: string) => void;
}

const revenueData = [
  { month: 'Jan', revenue: 8200000 },
  { month: 'Feb', revenue: 9500000 },
  { month: 'Mar', revenue: 11200000 },
  { month: 'Apr', revenue: 12400000 },
  { month: 'May', revenue: 13900000 },
  { month: 'Jun', revenue: 14850000 },
];

const messageVolumeData = [
  { day: 'Mon', count: 280 },
  { day: 'Tue', count: 340 },
  { day: 'Wed', count: 410 },
  { day: 'Thu', count: 390 },
  { day: 'Fri', count: 520 },
  { day: 'Sat', count: 480 },
  { day: 'Sun', count: 342 },
];

export function DashboardView({ stats, chats, onNavigateTab }: DashboardViewProps) {
  const recentChats = chats.slice(0, 4);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-8 space-y-8 text-slate-900">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              AI System Active
            </span>
            <span className="text-slate-500 text-xs">• John Online Services</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back, John 👋</h2>
          <p className="text-slate-600 text-sm mt-1">Your AI WhatsApp Business Operating System is actively processing customer chats and closing leads.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigateTab('whatsapp')}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            Open WhatsApp Inbox
          </button>
          <button 
            onClick={() => onNavigateTab('broadcast')}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            New Broadcast
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute right-4 top-4 p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <MessageSquare className="w-6 h-6" />
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Messages Today</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-2">{stats.totalMessagesToday}</h3>
          <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% vs yesterday
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute right-4 top-4 p-3 rounded-xl bg-blue-50 text-blue-600">
            <Bot className="w-6 h-6" />
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Auto-Response Rate</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-2">{stats.aiResponseRate}</h3>
          <p className="text-xs text-blue-600 font-medium mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Fully autonomous
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute right-4 top-4 p-3 rounded-xl bg-indigo-50 text-indigo-600">
            <Users className="w-6 h-6" />
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Qualified Leads</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-2">{stats.activeLeads}</h3>
          <p className="text-xs text-indigo-600 font-medium mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +12 new today
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute right-4 top-4 p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <DollarSign className="w-6 h-6" />
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Revenue This Month</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">{stats.revenueThisMonth}</h3>
          <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +24% growth
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Monthly Revenue Trend (TZS)</h3>
              <p className="text-xs text-slate-500">Tracking service sales from HESLB, Admissions, BRELA & IT</p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">2026 Growth</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} tickFormatter={(val) => `${val / 1000000}M`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`TZS ${Number(value).toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Message Volume */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Weekly Messages</h3>
              <p className="text-xs text-slate-500">Incoming WhatsApp requests</p>
            </div>
            <span className="px-2 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">7 Days</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={messageVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Chats & Quick Services Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Conversations */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-base">Active WhatsApp Conversations</h3>
            <button 
              onClick={() => onNavigateTab('whatsapp')}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              View All (28) →
            </button>
          </div>
          <div className="space-y-3">
            {recentChats.map((chat) => (
              <div 
                key={chat.id}
                onClick={() => onNavigateTab('whatsapp')}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-500/50 transition-all flex items-center justify-between cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <img src={chat.avatar} alt={chat.customerName} className="w-11 h-11 rounded-full object-cover border border-slate-200" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{chat.customerName}</h4>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 font-medium">{chat.language}</span>
                    </div>
                    <p className="text-xs text-blue-600 font-semibold mt-0.5">{chat.service}</p>
                    <p className="text-xs text-slate-600 mt-1 truncate max-w-xs">{chat.messages[chat.messages.length - 1]?.text}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    chat.status === 'Qualified' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    chat.status === 'Negotiating' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    chat.status === 'Closed Won' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {chat.status}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1.5">{chat.lastMessageTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Services Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Top Requested Services</h3>
            <p className="text-xs text-slate-500 mb-4">Client inquiry distribution</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">HESLB & TCU Admissions</span>
                  <span className="text-blue-600">42%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">BRELA & TRA Registration</span>
                  <span className="text-emerald-600">28%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Passport & Visa Processing</span>
                  <span className="text-cyan-600">18%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-cyan-600 rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Website & Software Dev</span>
                  <span className="text-indigo-600">12%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>AI Knowledge Base Sync</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Synced
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
