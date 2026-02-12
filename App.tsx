import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ToolCard from './components/ToolCard';
import { INITIAL_TOOLS } from './constants';
import { ToolCategory } from './types';
import { discoverNewTools } from './services/geminiService';

const App: React.FC = () => {
  const [tools, setTools] = useState(() => {
    try {
      const saved = localStorage.getItem('si_tools_db_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("LocalStorage indisponível ou corrompido, usando dados iniciais.");
    }
    return INITIAL_TOOLS;
  });
  
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'Tudo'>('Tudo');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshLogs, setRefreshLogs] = useState<string[]>([]);

  useEffect(() => {
    if (tools && tools.length > 0) {
      localStorage.setItem('si_tools_db_v2', JSON.stringify(tools));
    }
  }, [tools]);

  const addLog = (msg: string) => {
    setRefreshLogs(prev => [...prev.slice(-3), `> ${msg}`]);
  };

  const filteredTools = useMemo(() => {
    const list = Array.isArray(tools) ? tools : INITIAL_TOOLS;
    return list.filter(tool => {
      const term = search.toLowerCase();
      const matchesSearch = 
        tool.name?.toLowerCase().includes(term) || 
        tool.description?.toLowerCase().includes(term);
      const matchesCategory = activeCategory === 'Tudo' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [tools, search, activeCategory]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshLogs([]);
    addLog("Iniciando escaneamento via IA...");
    
    try {
      const result = await discoverNewTools();
      if (result && result.tools) {
        const existingNames = new Set(tools.map((t: any) => t.name.toLowerCase()));
        const newTools = result.tools.filter((t: any) => !existingNames.has(t.name.toLowerCase()));
        
        if (newTools.length > 0) {
          addLog(`${newTools.length} novas ferramentas encontradas!`);
          setTools((prev: any) => [...newTools, ...prev]);
        } else {
          addLog("Nenhuma novidade encontrada no momento.");
        }
      }
    } catch (err) {
      addLog("Falha na conexão com a rede neural.");
    } finally {
      setTimeout(() => setIsRefreshing(false), 2000);
    }
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-emerald-500/30">
      <Header />

      <main className="container mx-auto px-6 py-12">
        {isRefreshing && (
          <div className="mb-12 bg-black/80 border border-emerald-500/30 rounded-xl p-5 font-mono text-[11px] text-emerald-400 animate-pulse">
            {refreshLogs.map((log, i) => <div key={i}>{log}</div>)}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6 mb-16 items-center justify-between">
          <div className="relative w-full lg:max-w-md">
            <input 
              type="text"
              placeholder="Filtre pelo nome ou funcionalidade..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 pl-10 text-slate-200 focus:outline-none focus:border-emerald-500 font-mono text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2">
            {['Tudo', ToolCategory.ATTACK, ToolCategory.DEFENSE, ToolCategory.GENERAL].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                  activeCategory === cat ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase bg-emerald-600 text-white hover:bg-emerald-500 disabled:bg-slate-800 transition-all shadow-lg shadow-emerald-900/20"
          >
            {isRefreshing ? "Scanning..." : "Sync via IA"}
            <svg className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center border-2 border-dashed border-slate-900 rounded-3xl">
            <h3 className="text-xl text-slate-600 font-bold uppercase tracking-widest font-mono">System Idle: No Results</h3>
            <p className="text-slate-700 mt-2 text-sm">Ajuste os filtros ou tente o sincronismo via IA.</p>
          </div>
        )}
      </main>

      <footer className="mt-32 py-12 border-t border-slate-900/50 text-center">
        <div className="text-[10px] text-slate-700 font-mono uppercase tracking-[0.5em] mb-2">
          SI DAS IA'S HUB // INFRASTRUCTURE ACTIVE
        </div>
        <p className="text-slate-800 text-[8px] font-mono">FOR RESEARCH PURPOSES ONLY // ENCRYPTED SESSION</p>
      </footer>
    </div>
  );
};

export default App;