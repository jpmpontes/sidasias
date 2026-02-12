
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

  const getPricingTag = (price: PricingType) => {
    switch (price) {
      case PricingType.FREE:
      case PricingType.OPEN_SOURCE: return 'text-emerald-400 bg-emerald-400/10';
      case PricingType.FREEMIUM: return 'text-amber-400 bg-amber-400/10';
      default: return 'text-slate-400 bg-slate-800';
    }
  };

  const handleShare = () => {
    const text = `Confira a ferramenta ${tool.name} para Segurança da Informação no SI das IA's! ${tool.url}`;
    if (navigator.share) {
      navigator.share({ title: tool.name, text: tool.description, url: tool.url });
    } else {
      navigator.clipboard.writeText(text);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <div className="group relative flex flex-col h-full bg-slate-900/40 border border-slate-800 rounded-2xl p-6 transition-all duration-500 hover:border-emerald-500/40 hover:bg-slate-900/80 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-5">
        <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest border rounded-md shadow-sm ${getCategoryColor(tool.category)}`}>
          {tool.category}
        </span>
        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${getPricingTag(tool.pricing)}`}>
          {tool.pricing}
        </span>
      </div>

      <div className="flex justify-between items-baseline gap-2 mb-3">
        <h3 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors truncate">
          {tool.name}
        </h3>
        <button 
          onClick={handleShare}
          className="p-1.5 rounded-md hover:bg-slate-800 text-slate-500 hover:text-emerald-400 transition-colors"
          title="Compartilhar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6a3 3 0 100-2.684m0 2.684l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>
      
      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
        {tool.description}
      </p>

      {tool.features.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {tool.features.map((f, i) => (
            <span key={i} className="text-[10px] font-mono border border-slate-800 bg-slate-800/50 text-slate-400 px-2 py-1 rounded">
              #{f.replace(/\s+/g, '_').toLowerCase()}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto pt-5 border-t border-slate-800/50 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-600 font-mono uppercase tracking-tighter">Database Entry</span>
          <span className="text-[11px] text-slate-500 font-mono">{tool.addedAt}</span>
        </div>
        <a 
          href={tool.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-white transition-all duration-200 bg-emerald-600 rounded-lg group/btn hover:bg-emerald-500 focus:outline-none"
        >
          <span>Acessar</span>
          <svg className="w-4 h-4 ml-1.5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ToolCard;
