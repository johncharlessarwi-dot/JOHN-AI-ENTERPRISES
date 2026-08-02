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

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [chats, setChats] = useState<Chat[]>([]);
  const [whatsappStatus, setWhatsappStatus] = useState<WhatsappStatus>({
    connected: true,
    phoneNumber: "+255 712 345 678",
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

  return (
    <div className="flex h-screen w-screen bg-slate-950 font-sans overflow-hidden">
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        whatsappConnected={whatsappStatus.connected} 
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
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
      </main>
    </div>
  );
}
