import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Brain, 
  Database, 
  Send, 
  BarChart3, 
  Settings, 
  ShieldCheck, 
  Sparkles,
  Smartphone,
  X
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  whatsappConnected: boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function Sidebar({ currentTab, setCurrentTab, whatsappConnected, mobileOpen, setMobileOpen }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'whatsapp', label: 'WhatsApp Live Inbox', icon: MessageSquare, badge: 'Live' },
    { id: 'crm', label: 'CRM & Leads', icon: Users },
    { id: 'ai-brain', label: 'AI Brain & Prompts', icon: Brain },
    { id: 'knowledge', label: 'Knowledge Base (RAG)', icon: Database },
    { id: 'broadcast', label: 'Broadcast Campaigns', icon: Send },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-[#0f172a] text-slate-100 flex flex-col border-r border-slate-800 shrink-0 select-none
        transform transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/30 font-extrabold text-lg">
              J
            </div>
            <div>
              <h1 className="font-bold text-white tracking-tight text-sm">JOHN AI ENTERPRISE</h1>
              <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                WhatsApp OS v5.0
              </p>
            </div>
          </div>
          <button 
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* WhatsApp Connection Status Card */}
        <div className="mx-4 my-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-2.5">
            <div className={`w-3 h-3 rounded-full ${whatsappConnected ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-rose-500'}`} />
            <div>
              <p className="font-semibold text-white">WhatsApp Business</p>
              <p className="text-slate-400 text-[11px] font-mono">+255 698 170 989</p>
            </div>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${whatsappConnected ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/25'}`}>
            {whatsappConnected ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-2 space-y-1.5 overflow-y-auto">
          <p className="px-3 pb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">Core Systems</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer min-h-[44px] ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${isActive ? 'bg-blue-700 text-white' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 text-xs text-slate-400 flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-300">John Online Services</p>
            <p className="text-[11px] text-slate-500">Tanzania • Production Ready</p>
          </div>
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </div>
      </aside>
    </>
  );
}
