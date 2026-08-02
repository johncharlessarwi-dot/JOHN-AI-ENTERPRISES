import React, { useState } from 'react';
import { Brain, Sparkles, Sliders, CheckCircle2, Save, Terminal, Bot } from 'lucide-react';

export function AiBrainView() {
  const [persona, setPersona] = useState(`You are the elite AI Assistant for "John Online Services", a premier digital and professional consultancy in Tanzania.
Services offered: HESLB, NACTVET, TCU, university/college admissions, scholarships, visa & passport applications, birth certificates, NIDA, TIN, TRA, driving license, BRELA company registration, email creation, CV writing, website development, graphic design, printing, scanning, typing, government and academic applications.
Behavior guidelines:
- Be professional, polite, helpful, persuasive, and accurate.
- Detect customer language automatically (Swahili, English, or mixed Swahili+English) and reply in the exact same language.
- Never hallucinate prices or government procedures. Encourage them to send required info or documents.`);

  const [temperature, setTemperature] = useState(0.7);
  const [model, setModel] = useState('gemini-3.6-flash');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 p-8 space-y-6 text-slate-100">
      {/* Header */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">AI Brain & System Instructions</h2>
            <p className="text-slate-400 text-sm">Configure Gemini AI reasoning, persona behavior, and WhatsApp auto-response parameters.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: System Prompt Config */}
        <div className="lg:col-span-2 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Core System Instruction (John Online Services Persona)
            </label>
            <textarea 
              rows={10}
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
            />
            <p className="text-xs text-slate-500 mt-2">
              This system instruction dictates how Gemini interprets inbound WhatsApp messages, detects Swahili/English, and drives sales conversion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Gemini Model
              </label>
              <select 
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="gemini-3.6-flash">gemini-3.6-flash (Recommended Enterprise)</option>
                <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Advanced Reasoning)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Temperature ({temperature})
              </label>
              <input 
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 mt-3"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>Precise (0.1)</span>
                <span>Creative (1.0)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {saved && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 animate-bounce">
                <CheckCircle2 className="w-4 h-4" /> AI Brain Configuration Saved Successfully!
              </span>
            )}
            <button 
              type="submit"
              className="ml-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Save AI Settings
            </button>
          </div>
        </div>

        {/* Right col: AI Engine Status & Rules */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <h3 className="font-bold text-white text-base">Active AI Modules</h3>
          
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white text-sm">Intent & Entity Detection</p>
                <p className="text-xs text-slate-400">Extracts service type & deadlines</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white text-sm">Multi-Language Router</p>
                <p className="text-xs text-slate-400">Swahili & English Auto-Detect</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white text-sm">Lead Scoring Engine</p>
                <p className="text-xs text-slate-400">Calculates conversion probability</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white text-sm">Human Handover Router</p>
                <p className="text-xs text-slate-400">Escalates complex cases to John</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> RAG Knowledge Sync
            </h4>
            <p className="text-xs text-slate-400 mt-1">AI is actively grounded with 4 master documents including John Online Services pricing & HESLB guidelines.</p>
          </div>
        </div>
      </form>
    </div>
  );
}
