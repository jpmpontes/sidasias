
import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from './components/Header';
import ToolCard from './components/ToolCard';
import { INITIAL_TOOLS } from './constants';
import { IATool, ToolCategory } from './types';
import { discoverNewTools } from './services/geminiService';

const App: React.FC = () => {
  const [tools, setTools] = useState<IATool[]>(() => {
    const saved = localStorage.getItem('si_tools_db_v2');
    return saved ? JSON.parse(saved) : INITIAL_TOOLS;
  });
  
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'Tudo'>('Tudo');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshLogs, setRefreshLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('si_tools_db_v2', JSON.stringify(tools));
  }, [tools]);

  useEffect(() => {
    if (isRefreshing) {
      logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [refreshLogs, isRefreshing]);

  const addLog = (msg: string) => {
    setRefreshLogs(prev => [...prev.slice(-4), `> [${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const term = search.toLowerCase();
      const matchesSearch = 
        tool.name.toLowerCase().includes(term) || 
        tool.description.toLowerCase().includes(term);
      const matchesCategory = activeCategory === 'Tudo' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [tools, search, activeCategory]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshLogs([]);
    addLog("Iniciando handshake com Gemini AI Infrastructure...");
    addLog("Pesquisando novos vetores e defesas na Web clara...");
    
    try {
      const result = await discoverNewTools();
      addLog("Analisando metadados de 10 ferramentas encontradas.");
      
      const existingNames = new Set(tools.map(t => t.name.toLowerCase()));
      const newTools = result.tools.filter(t => !existingNames.has(t.name.toLowerCase()));
      
      if (newTools.length === 0) {
        addLog("Nenhum dado novo encontrado. Sync concluído.");
        setTimeout(() => setIsRefreshing(false), 2000);
      } else {
        addLog(`Injetando ${newTools.length} novas entradas na database local.`);
        setTools(prev => [...newTools, ...prev]);
        setTimeout(() => setIsRefreshing(false), 1500);
      }
    } catch (err) {
      addLog("ERRO: Falha na sincronização remota.");
      setTimeout(() => setIsRefreshing(false), 3000);
    }
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-emerald-500/30">
      <Header />

      <main className="container mx-auto px-6 py-12">
        {/* IA Terminal Section */}
        {isRefreshing && (
          <div className="mb-12 bg-black/80 border border-emerald-500/30 rounded-xl p-5 font-mono text-[11px] text-emerald-400 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-3 border-b border-emerald-500/10 pb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="uppercase tracking-[0.2em] font-bold">IA Search Terminal v2.1</span>
            </div>
            <div className="space-y-1">
              {refreshLogs.map((log, i) => (
                <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
                  {log}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-16 items-center justify-between">
          <div className="relative w-full lg:max-w-xl group">
            <input 
              type="text"
              placeholder="Pesquisar por nome ou funcionalidade..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 pl-12 text-slate-200 focus:outline-none focus:border-emerald-500 transition-all font-mono text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg className="absolute left-4 top-4.5 w-5 h-5 text-slate-600 group-focus-within:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {['Tudo', ToolCategory.ATTACK, ToolCategory.DEFENSE, ToolCategory.GENERAL].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                  activeCategory === cat 
                    ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20' 
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`flex items-center gap-3 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
              isRefreshing 
                ? 'bg-slate-800 text-slate-600' 
                : 'bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-105 active:scale-95 shadow-xl shadow-emerald-900/20'
            }`}
          >
            {isRefreshing ? "Scanning..." : "Sync via IA"}
            <svg className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
          {filteredTools.length === 0 && (
            <div className="col-span-full py-32 text-center">
              <h3 className="text-xl text-slate-500 font-bold uppercase tracking-widest">Nenhuma ameaça ou defesa encontrada</h3>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-32 py-16 border-t border-slate-900/50 flex flex-col items-center">
        <div className="text-[10px] text-slate-700 font-mono uppercase tracking-[0.5em] mb-4">
          SI DAS IA'S HUB // 2024
        </div>
        <p className="text-slate-800 text-[9px] font-mono">ENCRYPTED END-TO-END // INFRASTRUCTURE BY NETLIFY</p>
      </footer>
    </div>
  );
};

export default App;
