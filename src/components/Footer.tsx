import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="bg-[#0e0e0e] w-full pt-12 pb-8 border-t border-[#353535] mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
          <span className="font-headline text-2xl font-black text-[#c3f400] italic uppercase tracking-tight">
            Maxxfit
          </span>
          <p className="font-body-md text-sm text-[#c4c9ac] max-w-sm opacity-80 leading-relaxed">
            Forging elite fitness in an industrial environment. Peak performance, grit, and industrial precision. No excuses, just results.
          </p>
        </div>

        <div className="flex flex-col gap-2 font-body-md text-sm">
          <h4 className="font-label-caps text-xs text-[#e2e2e2] uppercase mb-2 tracking-widest">
            Navigation
          </h4>
          <button
            onClick={() => setCurrentView('home')}
            className="text-left text-[#c4c9ac] hover:text-[#c3f400] transition-colors opacity-80 hover:opacity-100 cursor-pointer"
          >
            Home Overview
          </button>
          <button
            onClick={() => setCurrentView('programs')}
            className="text-left text-[#c4c9ac] hover:text-[#c3f400] transition-colors opacity-80 hover:opacity-100 cursor-pointer"
          >
            Training Protocols
          </button>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="text-left text-[#c4c9ac] hover:text-[#c3f400] transition-colors opacity-80 hover:opacity-100 cursor-pointer"
          >
            Member Dashboard
          </button>
          <a
            href="#newsletter"
            onClick={(e) => {
              e.preventDefault();
              alert('Subscribed to Maxxfit Performance Briefings.');
            }}
            className="text-[#c4c9ac] hover:text-[#c3f400] transition-colors opacity-80 hover:opacity-100"
          >
            Newsletter Briefings
          </a>
        </div>

        <div className="flex flex-col gap-2 font-body-md text-sm">
          <h4 className="font-label-caps text-xs text-[#e2e2e2] uppercase mb-2 tracking-widest">
            Legal & Security
          </h4>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('Maxxfit Privacy Policy: All personal performance data encrypted locally and synchronized on private servers.');
            }}
            className="text-[#c4c9ac] hover:text-[#c3f400] transition-colors opacity-80 hover:opacity-100"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('Maxxfit Terms of Protocol: High intensity training requires personal dedication and medical clearance.');
            }}
            className="text-[#c4c9ac] hover:text-[#c3f400] transition-colors opacity-80 hover:opacity-100"
          >
            Terms of Protocol
          </a>
          <span className="font-label-caps text-[11px] text-[#c3f400] mt-2">
            STATUS: SYSTEM OPTIMAL
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-[#353535]/50 flex flex-col md:flex-row justify-between items-center text-xs font-body-md text-[#c4c9ac] gap-4">
        <p>© 2024 Maxxfit Performance. All rights reserved.</p>
        <p className="font-label-caps text-[10px] text-[#c4c9ac]/60">
          DESIGN SYSTEM: MAXXFIT KINETIC v2.4 • REALTIME SYNC ENABLED
        </p>
      </div>
    </footer>
  );
};
