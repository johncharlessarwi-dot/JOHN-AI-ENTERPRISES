export interface Message {
  id: string;
  sender: 'customer' | 'ai' | 'agent';
  text: string;
  time: string;
}

export interface Chat {
  id: string;
  customerName: string;
  phone: string;
  avatar: string;
  service: string;
  language: string;
  leadScore: number;
  status: 'Qualified' | 'Negotiating' | 'In Progress' | 'Closed Won' | 'New';
  unread: number;
  lastMessageTime: string;
  messages: Message[];
}

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  size: string;
  updated: string;
  status: string;
}

export interface WhatsappStatus {
  connected: boolean;
  phoneNumber: string;
  businessName: string;
  sessionName: string;
  batteryLevel: number;
  unreadCount: number;
  activeChatsCount: number;
  aiAutoResponder: boolean;
  aiPersona: string;
}

export interface AnalyticsStats {
  totalMessagesToday: number;
  aiResponseRate: string;
  avgResponseTimeSec: number;
  activeLeads: number;
  revenueThisMonth: string;
  satisfactionRate: string;
}
