
import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from './components/Header';
import ToolCard from './components/ToolCard';
import { INITIAL_TOOLS } from './constants';
import { IATool, ToolCategory } from './types';
import { discoverNewTools } from './services/geminiService';

const App: React.FC = () => {
  const [tools, setTools] = useState<IATool[]>(() => {
    const saved = localStorage.getItem('si_tools_db');
    return saved ? JSON.parse(saved) : INITIAL_TOOLS;
  });
  
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'Tudo'>('Tudo');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshLogs, setRefreshLogs] = useState<string[]>([]);
  const [lastRefresh, setLastRefresh] = useState<string | null>(() => localStorage.getItem('last_refresh'));
  const [sources, setSources] = useState<any[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('si_tools_db', JSON.stringify(tools));
  }, [tools]);

  useEffect(() => {
    if (isRefreshing) {
      logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [refreshLogs, isRefreshing]);

  const addLog = (msg: string) => {
    setRefreshLogs(prev => [...prev.slice(-4), `> ${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const term = search.toLowerCase();
      const matchesSearch = 
        tool.name.toLowerCase().includes(term) || 
        tool.description.toLowerCase().includes(term) ||
        tool.features.some(f => f.toLowerCase().includes(term));
      
      const matchesCategory = activeCategory === 'Tudo' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [tools, search, activeCategory]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshLogs([]);
    addLog("Iniciando conexão com infraestrutura de IA...");
    addLog("Escaneando repositórios globais e bases de Threat Intel...");
    
    try {
      const result = await discoverNewTools();
      addLog("Analisando metadados de novas ferramentas encontradas...");
      
      const existingNames = new Set(tools.map(t => t.name.toLowerCase()));
      const newTools = result.tools.filter(t => !existingNames.has(t.name.toLowerCase()));
      
      if (newTools.length === 0) {
        addLog("Nenhuma nova entrada detectada. Database sincronizado.");
        setTimeout(() => setIsRefreshing(false), 2000);
      } else {
        addLog(`${newTools.length} novas ferramentas identificadas e injetadas.`);
        setTools(prev => [...newTools, ...prev]);
        setSources(result.sources);
        const now = new Date().toLocaleDateString('pt-BR');
        setLastRefresh(now);
        localStorage.setItem('last_refresh', now);
        setTimeout(() => setIsRefreshing(false), 1500);
      }
    } catch (err) {
      addLog("ERRO CRÍTICO: Falha na sincronização via Gemini API.");
      console.error(err);
      setTimeout(() => setIsRefreshing(false), 3000);
    }
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-emerald-500/30">
      <Header />

      <main className="container mx-auto px-6 py-12">
        {/* Refresh Status Terminal */}
        {isRefreshing && (
          <div className="mb-12 bg-black border border-emerald-500/30 rounded-lg p-4 font-mono text-[11px] text-emerald-400 shadow-2xl shadow-emerald-950/20">
            <div className="flex items-center gap-2 mb-2 border-b border-emerald-500/10 pb-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="uppercase tracking-widest font-bold">Terminal de Sincronização IA</span>
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

        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-16 items-center justify-between">
          <div className="relative w-full lg:max-w-xl group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative">
              <input 
                type="text"
                placeholder="Filtrar por nome, tecnologia ou funcionalidade..."
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-4 pl-12 text-slate-200 focus:outline-none focus:border-emerald-500 transition-all font-mono text-sm backdrop-blur-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg className="absolute left-4 top-4.5 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {['Tudo', ToolCategory.ATTACK, ToolCategory.DEFENSE, ToolCategory.GENERAL].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.15em] border transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20' 
                    : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`group relative flex items-center gap-3 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all overflow-hidden ${
              isRefreshing 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-slate-50 text-slate-950 hover:bg-emerald-400 hover:scale-105 active:scale-95 shadow-xl'
            }`}
          >
            <span className="relative z-10">Atualizar via IA</span>
            <svg className={`w-4 h-4 relative z-10 transition-transform ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-12'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
        </div>

        {lastRefresh && !isRefreshing && (
          <div className="mb-12 flex items-center justify-center gap-4 text-[10px] text-slate-600 font-mono uppercase tracking-[0.3em]">
            <div className="h-px w-12 bg-slate-800"></div>
            <span>Sync: {lastRefresh} | Total: {tools.length} Entradas</span>
            <div className="h-px w-12 bg-slate-800"></div>
          </div>
        )}

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
          {filteredTools.length === 0 && (
            <div className="col-span-full py-40 text-center">
              <div className="inline-block p-6 rounded-full bg-slate-900 border border-slate-800 mb-6">
                <svg className="w-12 h-12 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl text-slate-300 font-bold uppercase tracking-widest">Nenhuma ameaça ou defesa encontrada</h3>
              <p className="text-slate-500 mt-2 font-mono text-sm italic">O termo "{search}" não retornou resultados na database local.</p>
            </div>
          )}
        </div>

        {/* Sources Section */}
        {sources.length > 0 && (
          <div className="mt-24 p-10 border border-emerald-500/10 rounded-3xl bg-gradient-to-b from-slate-900/60 to-transparent backdrop-blur-xl">
            <h4 className="text-emerald-400 font-black text-xs uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
              <div className="h-1 w-8 bg-emerald-500"></div>
              Relatório de Inteligência (Fontes)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sources.map((source, i) => source.web && (
                <a 
                  key={i} 
                  href={source.web.uri} 
                  target="_blank" 
                  className="group block p-5 border border-slate-800 bg-slate-950/40 rounded-xl hover:border-emerald-500/30 transition-all hover:bg-slate-900/60"
                >
                  <div className="text-emerald-500/40 font-mono text-[9px] mb-3 uppercase tracking-widest">Fonte #{i+1}</div>
                  <p className="text-slate-300 text-[11px] font-bold group-hover:text-emerald-400 transition-colors line-clamp-2 leading-relaxed mb-4">
                    {source.web.title}
                  </p>
                  <div className="flex items-center gap-1.5 text-slate-600 text-[9px] font-mono truncate">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                    </svg>
                    {source.web.uri}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-20 py-12 border-t border-slate-900 flex flex-col items-center">
        <div className="text-[10px] text-slate-700 font-mono uppercase tracking-[0.5em] mb-4">
          SI DAS IA'S HUB // CRYPTOGRAPHICALLY SECURED // 2024
        </div>
        <div className="flex gap-8 text-[9px] text-slate-800 font-mono uppercase tracking-widest">
          <span>Static Deployment</span>
          <span>Zero-Knowledge DB</span>
          <span>End-to-End Discovery</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
