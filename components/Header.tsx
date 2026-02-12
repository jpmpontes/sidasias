
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative py-12 px-6 border-b border-emerald-500/20 bg-slate-950 overflow-hidden">
      <div className="scanline"></div>
      <div className="container mx-auto relative z-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2 font-mono">
              SI das IA's
            </h1>
            <p className="text-slate-400 max-w-lg">
              O diretório definitivo de Inteligência Artificial para <span className="text-emerald-400 font-mono">Segurança da Informação</span>. Ataque, Defesa e Resposta.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-md text-emerald-400 text-sm font-mono">
              v1.0.4 - STABLE
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
