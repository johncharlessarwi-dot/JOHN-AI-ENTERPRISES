import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { WhatsAppChatView } from './components/WhatsAppChatView';
import { CrmLeadsView } from './components/CrmLeadsView';
import { AiBrainView } from './components/AiBrainView';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
import { BroadcastView } from './components/BroadcastView';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsView } from './components/SettingsView';
import { Chat, AnalyticsStats, WhatsappStatus } from './types';
import { Menu, Smartphone, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [whatsappStatus, setWhatsappStatus] = useState<WhatsappStatus>({
    connected: true,
    phoneNumber: "+255 698 170 989",
    businessName: "John Online Services",
    sessionName: "John_Biz_WhatsApp_Prod_01",
    batteryLevel: 98,
    unreadCount: 4,
    activeChatsCount: 28,
    aiAutoResponder: true,
    aiPersona: "Professional, polite, multilingual (Swahili & English), sales-driven assistant for John Online Services."
  });

  const [stats, setStats] = useState<AnalyticsStats>({
    totalMessagesToday: 342,
    aiResponseRate: "98.4%",
    avgResponseTimeSec: 2.1,
    activeLeads: 156,
    revenueThisMonth: "TZS 14,850,000",
    satisfactionRate: "4.9/5.0"
  });

  useEffect(() => {
    // Fetch initial chats and status
    fetch('/api/chats')
      .then(res => res.json())
      .then(data => setChats(data))
      .catch(err => console.error(err));

    fetch('/api/whatsapp/status')
      .then(res => res.json())
      .then(data => {
        if (data.status) setWhatsappStatus(data.status);
        if (data.stats) setStats(data.stats);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSendMessage = async (chatId: string, text: string) => {
    try {
      const res = await fetch(`/api/chats/${chatId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, sender: 'customer' })
      });
      const data = await res.json();
      if (data.success) {
        // Refresh chats list or update state
        const chatsRes = await fetch('/api/chats');
        const updatedChats = await chatsRes.json();
        setChats(updatedChats);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getTabTitle = () => {
    switch (currentTab) {
      case 'dashboard': return 'Executive Dashboard';
      case 'whatsapp': return 'WhatsApp Live Inbox';
      case 'crm': return 'CRM & Leads';
      case 'ai-brain': return 'AI Brain & Prompts';
      case 'knowledge': return 'Knowledge Base (RAG)';
      case 'broadcast': return 'Broadcast Campaigns';
      case 'analytics': return 'Analytics & Reports';
      case 'settings': return 'System Settings';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 font-sans overflow-hidden">
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        whatsappConnected={whatsappStatus.connected} 
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-900">
        {/* Mobile / Tablet Top Bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 text-white shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-bold text-sm tracking-tight">{getTabTitle()}</h2>
              <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                +255 698 170 989
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-lg bg-blue-600/20 border border-blue-500/30 text-[11px] font-bold text-blue-300">
              John OS v5
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          {currentTab === 'dashboard' && (
            <DashboardView 
              stats={stats} 
              chats={chats} 
              onNavigateTab={setCurrentTab} 
            />
          )}
          {currentTab === 'whatsapp' && (
            <WhatsAppChatView 
              chats={chats} 
              onSendMessage={handleSendMessage}
              aiAutoResponder={whatsappStatus.aiAutoResponder}
              setAiAutoResponder={(val) => setWhatsappStatus({ ...whatsappStatus, aiAutoResponder: val })}
            />
          )}
          {currentTab === 'crm' && (
            <CrmLeadsView chats={chats} />
          )}
          {currentTab === 'ai-brain' && (
            <AiBrainView />
          )}
          {currentTab === 'knowledge' && (
            <KnowledgeBaseView />
          )}
          {currentTab === 'broadcast' && (
            <BroadcastView />
          )}
          {currentTab === 'analytics' && (
            <AnalyticsView />
          )}
          {currentTab === 'settings' && (
            <SettingsView 
              whatsappStatus={whatsappStatus} 
              setWhatsappStatus={setWhatsappStatus} 
            />
          )}
        </div>
      </main>
    </div>
  );
}
