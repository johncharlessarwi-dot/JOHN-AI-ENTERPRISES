import React, { useState, useEffect } from 'react';
import { Database, Upload, FileText, CheckCircle2, Plus, Sparkles } from 'lucide-react';
import { DocumentItem } from '../types';

export function KnowledgeBaseView() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Pricing');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('/api/kb/documents')
      .then(res => res.json())
      .then(data => setDocuments(data))
      .catch(err => console.error(err));
  }, []);

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    fetch('/api/kb/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, size: '2.1 MB' })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDocuments([data.document, ...documents]);
          setTitle('');
          setShowModal(false);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 p-8 space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Knowledge Base & RAG Engine</h2>
          <p className="text-slate-400 text-sm mt-1">Upload business guides, service pricing, and government application rules to train your WhatsApp AI assistant.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          Upload Document / Guide
        </button>
      </div>

      {/* Document List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {doc.category}
                </span>
                <span className="text-xs text-slate-500">{doc.size}</span>
              </div>
              <h3 className="font-bold text-white text-base mb-2">{doc.title}</h3>
              <p className="text-xs text-slate-400">Last updated: {doc.updated}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> {doc.status}
              </span>
              <button 
                onClick={() => alert(`Re-indexing document: ${doc.title}`)}
                className="text-slate-400 hover:text-white underline cursor-pointer"
              >
                Re-index
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Upload Knowledge Document</h3>
            <p className="text-xs text-slate-400 mb-4">Add service catalogs or government application instructions for AI retrieval.</p>
            
            <form onSubmit={handleAddDocument} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Document Title</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. TCU Degree Admission Guide 2026"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Pricing">Pricing & Packages</option>
                  <option value="Government Apps">Government Apps (HESLB, NIDA, TRA)</option>
                  <option value="Admissions">University Admissions (TCU, NACTVET)</option>
                  <option value="Business Services">Business Services (BRELA)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-semibold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
                >
                  {loading ? 'Uploading...' : 'Upload & Index'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
