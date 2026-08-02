import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  Bot, 
  User, 
  Phone, 
  MoreVertical, 
  Paperclip, 
  Smile, 
  Mic, 
  CheckCheck, 
  Sparkles, 
  ShieldCheck, 
  Tag,
  Flame,
  Languages,
  RefreshCcw
} from 'lucide-react';
import { Chat } from '../types';

interface WhatsAppChatViewProps {
  chats: Chat[];
  onSendMessage: (chatId: string, text: string) => void;
  aiAutoResponder: boolean;
  setAiAutoResponder: (val: boolean) => void;
}

export function WhatsAppChatView({ chats, onSendMessage, aiAutoResponder, setAiAutoResponder }: WhatsAppChatViewProps) {
  const [selectedChatId, setSelectedChatId] = useState<string>(chats[0]?.id || 'chat_1');
  const [inputText, setInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const currentChat = chats.find(c => c.id === selectedChatId) || chats[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(currentChat.id, inputText.trim());
    setInputText('');
  };

  const handleQuickTemplate = (templateText: string) => {
    onSendMessage(currentChat.id, templateText);
  };

  const filteredChats = chats.filter(c => 
    c.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const swahiliTemplates = [
    "Habari! Karibu John Online Services. Je, unahitaji msaada gani leo kuhusu maombi yako?",
    "Tafadhali tutumie picha au PDF ya vyeti vyako ili tuweze kuanza mchakato mara moja.",
    "Malipo ya huduma hii ni TZS 15,000 tu. Unaweza kulipa kupitia M-Pesa au Tigo Pesa.",
    "Asante sana kwa kuchagua John Online Services! Fomu yako imekamilika kwa ufanisi mkubwa."
  ];

  const englishTemplates = [
    "Hello! Welcome to John Online Services. How can we assist you with your application today?",
    "Please share your documents/certificates so we can process your application right away.",
    "The service fee is TZS 15,000. You can pay via Mobile Money (M-Pesa / Tigo Pesa).",
    "Thank you for choosing John Online Services! Your application has been successfully submitted."
  ];

  return (
    <div className="flex-1 flex bg-slate-900 overflow-hidden text-slate-100">
      {/* Left Chat List Sidebar */}
      <div className="w-80 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="font-bold text-white text-base">WhatsApp Inbox</h3>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setAiAutoResponder(!aiAutoResponder)}
              title="Toggle AI Auto-Responder"
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                aiAutoResponder 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              {aiAutoResponder ? 'AI ON' : 'AI OFF'}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-slate-800/60">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input 
              type="text"
              placeholder="Search chats, services, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Chat List Items */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-900">
          {filteredChats.map((chat) => {
            const isSelected = chat.id === selectedChatId;
            const lastMsg = chat.messages[chat.messages.length - 1];
            return (
              <div
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={`p-3.5 flex items-start gap-3 cursor-pointer transition-all ${
                  isSelected ? 'bg-slate-900 border-l-4 border-emerald-500' : 'hover:bg-slate-900/50'
                }`}
              >
                <img src={chat.avatar} alt={chat.customerName} className="w-12 h-12 rounded-full object-cover border border-slate-700 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="font-bold text-white text-sm truncate">{chat.customerName}</h4>
                    <span className="text-[10px] text-slate-500">{chat.lastMessageTime}</span>
                  </div>
                  <p className="text-xs text-emerald-400 font-medium truncate">{chat.service}</p>
                  <p className="text-xs text-slate-400 truncate mt-1">{lastMsg?.text}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shrink-0">
                    {chat.unread}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat Conversation Area */}
      <div className="flex-1 flex flex-col bg-slate-900">
        {/* Chat Header */}
        <div className="px-6 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={currentChat.avatar} alt={currentChat.customerName} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">{currentChat.customerName}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">{currentChat.phone}</span>
              </div>
              <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Service: {currentChat.service} • Language: {currentChat.language}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[11px] font-semibold text-slate-400">Lead Score</span>
              <p className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                {currentChat.leadScore}/100
              </p>
            </div>
            <button className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message History */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
          {/* AI Notice Banner */}
          <div className="mx-auto max-w-lg p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center text-xs text-slate-400">
            🔒 Messages are end-to-end encrypted on WhatsApp Business API. John AI Auto-Responder is <span className="text-emerald-400 font-bold">{aiAutoResponder ? 'Active' : 'Paused'}</span>.
          </div>

          {currentChat.messages.map((msg) => {
            const isCustomer = msg.sender === 'customer';
            const isAI = msg.sender === 'ai';
            return (
              <div key={msg.id} className={`flex ${isCustomer ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-md rounded-2xl p-4 shadow-md ${
                  isCustomer 
                    ? 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-sm' 
                    : isAI
                    ? 'bg-gradient-to-br from-emerald-900/40 to-teal-950/60 border border-emerald-500/30 text-white rounded-tr-sm'
                    : 'bg-emerald-600 text-white rounded-tr-sm'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {isAI ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                        <Bot className="w-3 h-3" /> John AI Agent
                      </span>
                    ) : isCustomer ? (
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{currentChat.customerName}</span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider">John (Human Agent)</span>
                    )}
                    <span className="text-[10px] text-slate-500 ml-auto">{msg.time}</span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  {!isCustomer && (
                    <div className="flex justify-end mt-1">
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Swahili & English Template Suggestions */}
        <div className="px-6 py-2 bg-slate-950/60 border-t border-slate-800 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 flex items-center gap-1">
            <Languages className="w-3.5 h-3.5 text-emerald-400" /> Quick Templates:
          </span>
          {swahiliTemplates.slice(0, 2).map((tpl, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickTemplate(tpl)}
              className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 whitespace-nowrap truncate max-w-xs transition-all cursor-pointer"
            >
              {tpl}
            </button>
          ))}
        </div>

        {/* Message Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-3">
          <button type="button" className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <Paperclip className="w-5 h-5" />
          </button>
          <button type="button" className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <Smile className="w-5 h-5" />
          </button>
          
          <input 
            type="text"
            placeholder="Type WhatsApp message or ask John AI to draft..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />

          <button type="button" className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <Mic className="w-5 h-5" />
          </button>

          <button 
            type="submit"
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </form>
      </div>

      {/* Right Customer CRM Details Sidebar */}
      <div className="w-72 bg-slate-950 border-l border-slate-800 p-5 hidden xl:flex flex-col justify-between">
        <div>
          <div className="text-center pb-5 border-b border-slate-800">
            <img src={currentChat.avatar} alt={currentChat.customerName} className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-emerald-500 shadow-lg mb-3" />
            <h4 className="font-bold text-white text-base">{currentChat.customerName}</h4>
            <p className="text-xs text-slate-400 mt-0.5">{currentChat.phone}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {currentChat.status}
            </span>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Assigned Service</p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {currentChat.service}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Language Detected</p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2">
                <Languages className="w-4 h-4 text-teal-400" />
                {currentChat.language}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Lead Qualification</p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-between">
                <span>Score</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500" /> {currentChat.leadScore}/100
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <button 
            onClick={() => alert(`Assigned ${currentChat.customerName} to human agent review.`)}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
          >
            Transfer to Human Agent
          </button>
        </div>
      </div>
    </div>
  );
}
