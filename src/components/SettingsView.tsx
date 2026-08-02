import React, { useState } from 'react';
import { Settings, Smartphone, CheckCircle2, ShieldCheck, RefreshCw, QrCode } from 'lucide-react';
import { WhatsappStatus } from '../types';

interface SettingsViewProps {
  whatsappStatus: WhatsappStatus;
  setWhatsappStatus: React.Dispatch<React.SetStateAction<WhatsappStatus>>;
}

export function SettingsView({ whatsappStatus, setWhatsappStatus }: SettingsViewProps) {
  const [saved, setSaved] = useState(false);

  const handleToggleConnection = () => {
    setWhatsappStatus(prev => ({
      ...prev,
      connected: !prev.connected
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 p-8 space-y-6 text-slate-100">
      {/* Header */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">System Settings & Integrations</h2>
            <p className="text-slate-400 text-sm">Configure WhatsApp Business API session, business hours, and operational preferences.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: WhatsApp Connection Panel */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <h3 className="font-bold text-white text-base">WhatsApp Session</h3>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Status</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${whatsappStatus.connected ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/25'}`}>
                {whatsappStatus.connected ? 'CONNECTED' : 'DISCONNECTED'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Phone Number</span>
              <span className="text-xs font-bold text-white">{whatsappStatus.phoneNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Session Name</span>
              <span className="text-xs font-mono text-emerald-400">{whatsappStatus.sessionName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Battery Level</span>
              <span className="text-xs font-bold text-white">{whatsappStatus.batteryLevel}%</span>
            </div>
          </div>

          <button 
            onClick={handleToggleConnection}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              whatsappStatus.connected 
                ? 'bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-400' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30'
            }`}
          >
            {whatsappStatus.connected ? 'Disconnect WhatsApp Session' : 'Connect / Link WhatsApp Web'}
          </button>
        </div>

        {/* Right 2 cols: Business Settings */}
        <form onSubmit={handleSave} className="lg:col-span-2 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <h3 className="font-bold text-white text-base">Business Profile Settings</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Business Name</label>
              <input 
                type="text"
                value={whatsappStatus.businessName}
                onChange={(e) => setWhatsappStatus({ ...whatsappStatus, businessName: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">WhatsApp Phone Number</label>
              <input 
                type="text"
                value={whatsappStatus.phoneNumber}
                onChange={(e) => setWhatsappStatus({ ...whatsappStatus, phoneNumber: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div>
              <h4 className="font-bold text-white text-sm">AI Auto-Responder</h4>
              <p className="text-xs text-slate-400">Automatically reply to incoming customer WhatsApp messages</p>
            </div>
            <input 
              type="checkbox"
              checked={whatsappStatus.aiAutoResponder}
              onChange={(e) => setWhatsappStatus({ ...whatsappStatus, aiAutoResponder: e.target.checked })}
              className="w-5 h-5 accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {saved && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 animate-bounce">
                <CheckCircle2 className="w-4 h-4" /> Settings Updated Successfully!
              </span>
            )}
            <button 
              type="submit"
              className="ml-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
