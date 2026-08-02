import React, { useState, useEffect } from 'react';
import { Settings, Smartphone, CheckCircle2, ShieldCheck, RefreshCw, QrCode, Send, Key, Terminal } from 'lucide-react';
import { WhatsappStatus } from '../types';

interface SettingsViewProps {
  whatsappStatus: WhatsappStatus;
  setWhatsappStatus: React.Dispatch<React.SetStateAction<WhatsappStatus>>;
}

export function SettingsView({ whatsappStatus, setWhatsappStatus }: SettingsViewProps) {
  const [saved, setSaved] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [phoneNumberId, setPhoneNumberId] = useState('');
  const [wabaId, setWabaId] = useState('');
  const [testRecipient, setTestRecipient] = useState('+255');
  const [testMessage, setTestMessage] = useState('Hello from John AI Enterprise OS! Your connection is live.');
  const [testResult, setTestResult] = useState<{ success?: boolean; error?: string; queueId?: string; status?: string } | null>(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    // Fetch current backend whatsapp config
    fetch('/api/whatsapp/config')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setApiKey(data.accessToken || '');
          setPhoneNumberId(data.phoneNumberId || '');
          setWabaId(data.wabaId || '');
        }
      })
      .catch(err => console.error("Failed to load WhatsApp config", err));
  }, []);

  const handleToggleConnection = async () => {
    const newConnected = !whatsappStatus.connected;
    try {
      const res = await fetch('/api/whatsapp/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connected: newConnected })
      });
      const data = await res.json();
      if (data.success) {
        setWhatsappStatus(prev => ({
          ...prev,
          connected: newConnected
        }));
      }
    } catch (err) {
      console.error("Failed to toggle connection", err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/whatsapp/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: 'meta_cloud',
          accessToken: apiKey,
          phoneNumberId,
          wabaId
        })
      });
      setSaved(true);
      setWhatsappStatus(prev => ({ ...prev, connected: Boolean(phoneNumberId && apiKey) }));
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save WhatsApp configuration", err);
    }
  };

  const handleTestDm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testRecipient || !testMessage) return;
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/whatsapp/test-dm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient: testRecipient, message: testMessage })
      });
      const data = await res.json();
      setTestResult(data);
    } catch (err: any) {
      setTestResult({ success: false, error: err.message || 'Failed to dispatch test DM' });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 p-8 space-y-6 text-slate-100">
      {/* Header */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">WhatsApp Business & System Settings</h2>
            <p className="text-slate-400 text-sm">Configure Meta Cloud API credentials, access tokens, webhook verify tokens, and test real DMs.</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-mono">
          <ShieldCheck className="w-4 h-4" /> TLS 1.3 / OAuth2 Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: WhatsApp Connection Panel & Live Test DM */}
        <div className="space-y-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-400" /> WhatsApp Session State
            </h3>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Status</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${whatsappStatus.connected ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/25'}`}>
                  {whatsappStatus.connected ? 'CONNECTED (LIVE)' : 'DISCONNECTED'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Phone Number ID</span>
                <span className="text-xs font-mono text-white">{phoneNumberId || 'Not Configured'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Webhook URL</span>
                <span className="text-xs font-mono text-emerald-400 truncate max-w-[150px]">/api/whatsapp/engine/webhook</span>
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
              {whatsappStatus.connected ? 'Disconnect WhatsApp Session' : 'Connect / Link WhatsApp Session'}
            </button>
          </div>

          {/* Test Real WhatsApp DM Card */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" /> Test Real WhatsApp DM
            </h3>
            <p className="text-xs text-slate-400">Dispatch an immediate test message through the configured Meta Cloud API / Baileys gateway.</p>
            
            <form onSubmit={handleTestDm} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Recipient Phone Number</label>
                <input 
                  type="text" 
                  value={testRecipient} 
                  onChange={e => setTestRecipient(e.target.value)} 
                  placeholder="+255712345678"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message Body</label>
                <textarea 
                  value={testMessage} 
                  onChange={e => setTestMessage(e.target.value)} 
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={testing}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {testing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {testing ? 'Sending WhatsApp DM...' : 'Send Test WhatsApp DM'}
              </button>
            </form>

            {testResult && (
              <div className={`p-3 rounded-xl text-xs space-y-1 font-mono ${testResult.success ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300' : 'bg-rose-950/40 border border-rose-500/30 text-rose-300'}`}>
                <div className="font-bold flex items-center gap-1">
                  {testResult.success ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5 text-rose-400" />}
                  {testResult.success ? 'DM Dispatched Successfully!' : 'Delivery Error'}
                </div>
                <div>{testResult.error || `Queue ID: ${testResult.queueId}`}</div>
                <div className="text-[10px] text-slate-400">Status: {testResult.status || 'SENT'}</div>
              </div>
            )}
          </div>
        </div>

        {/* Right 2 cols: Meta Cloud API Credentials & Business Profile Settings */}
        <form onSubmit={handleSave} className="lg:col-span-2 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Key className="w-5 h-5 text-emerald-400" /> Meta WhatsApp Business Cloud API Credentials
          </h3>
          <p className="text-xs text-slate-400">To receive and send real WhatsApp DMs in production, obtain your permanent access token and Phone Number ID from the Meta Developer Dashboard.</p>

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
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Phone Number ID (Meta API)</label>
              <input 
                type="text"
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
                placeholder="e.g. 10492837456789"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">WhatsApp Business Account ID (WABA ID)</label>
              <input 
                type="text"
                value={wabaId}
                onChange={(e) => setWabaId(e.target.value)}
                placeholder="e.g. 1092834756"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Permanent Access Token (Meta Graph API)</label>
            <input 
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="EAAG..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div>
              <h4 className="font-bold text-white text-sm">AI Auto-Responder (Swahili & English)</h4>
              <p className="text-xs text-slate-400">Automatically reply to incoming customer WhatsApp messages using Gemini AI Brain</p>
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
                <CheckCircle2 className="w-4 h-4" /> Meta Cloud API Credentials Saved & Live!
              </span>
            )}
            <button 
              type="submit"
              className="ml-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
            >
              Save & Activate WhatsApp API
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
