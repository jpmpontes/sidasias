
import React from 'react';
import { IATool, ToolCategory, PricingType } from '../types';

interface ToolCardProps {
  tool: IATool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const getCategoryColor = (cat: ToolCategory) => {
    switch (cat) {
      case ToolCategory.ATTACK: return 'text-rose-400 border-rose-500/30 bg-rose-500/5';
      case ToolCategory.DEFENSE: return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5';
      default: return 'text-sky-400 border-sky-500/30 bg-sky-500/5';
    }
  };

  const handleShare = () => {
    const text = `Conheça a IA ${tool.name} para Segurança da Informação: ${tool.url}`;
    if (navigator.share) {
      navigator.share({ title: tool.name, url: tool.url, text: tool.description });
    } else {
      navigator.clipboard.writeText(text);
      alert('Link copiado!');
    }
  };

  return (
    <div className="cyber-card group relative flex flex-col h-full rounded-2xl p-6 transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-widest border rounded-md ${getCategoryColor(tool.category)}`}>
          {tool.category}
        </span>
        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
          {tool.pricing}
        </span>
      </div>

      <div className="flex justify-between items-start gap-4 mb-4">
        <h3 className="text-2xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
          {tool.name}
        </h3>
        <button onClick={handleShare} className="text-slate-600 hover:text-emerald-400 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6a3 3 0 100-2.684m0 2.684l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>
      
      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
        {tool.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {tool.features.map((f, i) => (
          <span key={i} className="text-[10px] font-mono bg-slate-800/50 text-slate-500 px-2 py-1 rounded border border-slate-700">
            {f}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-slate-800/50 flex items-center justify-between">
        <div className="text-[10px] text-slate-600 font-mono">
          ADDED: {tool.addedAt}
        </div>
        <a 
          href={tool.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-emerald-400 hover:text-emerald-300 font-bold text-sm flex items-center gap-1 group/link"
        >
          Explorar
          <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ToolCard;
