import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle2, Copy, Users } from 'lucide-react';

export function BroadcastView() {
  const [campaignTitle, setCampaignTitle] = useState('HESLB Loan Application Deadline Alert');
  const [targetAudience, setTargetAudience] = useState('Students & Form Six Leavers');
  const [promptText, setPromptText] = useState('Remind students that HESLB application window is closing soon and John Online Services offers fast & accurate application assistance.');
  const [language, setLanguage] = useState('Swahili');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/ai/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignTitle, targetAudience, promptText, language })
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedText(data.broadcastText);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 p-8 space-y-6 text-slate-100">
      {/* Header */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">WhatsApp Broadcast Campaigns</h2>
            <p className="text-slate-400 text-sm">Generate AI-powered marketing and notification broadcasts for student and business databases.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Generator Form */}
        <form onSubmit={handleGenerate} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-base">Campaign Parameters</h3>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Campaign Title</label>
            <input 
              type="text"
              required
              value={campaignTitle}
              onChange={(e) => setCampaignTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Target Audience</label>
            <input 
              type="text"
              required
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Language</label>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Swahili">Swahili</option>
              <option value="English">English</option>
              <option value="Mixed Swahili + English">Mixed Swahili + English</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Core Offer / Message Objective</label>
            <textarea 
              rows={4}
              required
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? 'Generating Broadcast via Gemini...' : 'Generate AI Broadcast Message'}
          </button>
        </form>

        {/* Right: Generated Output Preview */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white text-base">WhatsApp Preview</h3>
              {generatedText && (
                <button 
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-emerald-400 flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 min-h-[280px] text-sm text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
              {generatedText || "Your AI-generated WhatsApp broadcast message will appear here. Click 'Generate AI Broadcast Message' to create a compelling campaign."}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-400" /> Target Database: 1,450 Verified Contacts
            </span>
            <button 
              onClick={() => alert("Campaign queued for instant WhatsApp broadcast!")}
              disabled={!generatedText}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all ${
                generatedText 
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30 cursor-pointer' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Send Broadcast Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
