import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative py-16 px-6 border-b border-emerald-500/10 bg-slate-950/50 backdrop-blur-md overflow-hidden">
      <div className="scanline"></div>
      <div className="container mx-auto relative z-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500 mb-4 font-mono">
              SI DAS IA'S
            </h1>
            <p className="text-slate-400 max-w-xl text-lg leading-relaxed">
              O radar definitivo para Inteligência Artificial em <span className="text-emerald-400 font-mono font-bold">Cyber Security</span>. 
            </p>
          </div>
          <div className="hidden lg:block p-4 border border-emerald-500/20 bg-emerald-500/5 rounded-xl font-mono text-[10px] text-emerald-400">
            [ SYSTEM: ACTIVE ] [ NODE: NETLIFY ]
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;