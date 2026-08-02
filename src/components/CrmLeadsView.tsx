import React, { useState } from 'react';
import { Users, Search, Filter, Phone, Mail, Flame, CheckCircle2, Clock, Plus } from 'lucide-react';
import { Chat } from '../types';

interface CrmLeadsViewProps {
  chats: Chat[];
}

export function CrmLeadsView({ chats }: CrmLeadsViewProps) {
  const [filterService, setFilterService] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = chats.filter(c => {
    const matchesSearch = c.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm);
    const matchesService = filterService === 'All' || c.service.toLowerCase().includes(filterService.toLowerCase());
    return matchesSearch && matchesService;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-8 space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">CRM & Customer Leads</h2>
          <p className="text-slate-600 text-sm mt-1">Manage leads, service requests, lead scores, and application pipelines for John Online Services.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert("Add New Lead modal opened.")}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add New Lead
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search leads by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['All', 'HESLB', 'BRELA', 'Passport', 'Website'].map((srv) => (
            <button
              key={srv}
              onClick={() => setFilterService(srv)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterService === srv
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300'
              }`}
            >
              {srv}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Service Requested</th>
                <th className="px-6 py-4">Language</th>
                <th className="px-6 py-4">Lead Score</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={lead.avatar} alt={lead.customerName} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                    <div>
                      <p className="font-bold text-slate-900">{lead.customerName}</p>
                      <p className="text-xs text-slate-500">{lead.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-blue-600">{lead.service}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-xs font-medium border border-slate-200 text-slate-700">{lead.language}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                      {lead.leadScore}/100
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      lead.status === 'Qualified' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      lead.status === 'Negotiating' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      lead.status === 'Closed Won' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => alert(`Opening CRM profile for ${lead.customerName}`)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 transition-all cursor-pointer"
                    >
                      Manage Lead
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
