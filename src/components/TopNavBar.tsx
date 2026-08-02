import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ViewState } from '../types';

export const TopNavBar: React.FC = () => {
  const { currentView, setCurrentView, user, logout, isLoggedIn } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems: { label: string; view: ViewState }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Programs', view: 'programs' },
    { label: 'Dashboard', view: 'dashboard' },
  ];

  const handleNavClick = (view: ViewState) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#131313]/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-[#353535] shadow-lg flex justify-between items-center h-20 px-4 md:px-8 transition-all duration-300">
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
        >
          <img
            alt="Maxxfit Logo"
            className="h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(195,244,0,0.3)] transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDN0aL_-iyZKx4kjU6PyGqUMmnrtHONbK4wueQ1BJJ--RWXMgAOHIVusXtum8wI6NLEim_7i_Uwhp8oQoxP7pjGCZFqhzKwY1aUndy8l8qcsqYEAHhKoru0Dc8DLT8muCvJJputHIaqabaQXJ1FFB2OmQBzBm3wErjO3yU8GZvOodo29Dka4BhSFY9qeN71k3EXzF0Yb-UVnUa2b6Q51L0Elc6eAT96MfJUE2d59P7LaEOVq3XkCrV"
          />
          <span className="font-headline text-2xl font-black text-[#c3f400] italic uppercase tracking-tight hidden sm:inline-block">
            Maxxfit
          </span>
        </button>
      </div>

      {/* Web Navigation */}
      <div className="hidden md:flex space-x-6 items-center h-full font-label-caps">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => handleNavClick(item.view)}
              className={`px-4 py-2 uppercase transition-all cursor-pointer ${
                isActive
                  ? 'text-[#c3f400] border-b-2 border-[#c3f400] pb-1 h-full flex items-center bg-[#c3f400]/5 font-bold'
                  : 'text-[#c4c9ac] hover:text-[#c3f400] hover:bg-[#c3f400]/10 rounded'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 bg-[#1f1f1f] border border-[#353535] hover:border-[#c3f400] px-3 py-1.5 rounded transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-[#c3f400] text-[#161e00] font-headline font-black text-xs flex items-center justify-center uppercase">
                {user?.name.charAt(0)}
              </div>
              <span className="font-label-caps text-xs text-[#e2e2e2] hidden sm:inline uppercase">
                {user?.name}
              </span>
              <span className="material-symbols-outlined text-sm text-[#c4c9ac]">
                {userDropdownOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#1f1f1f] border border-[#353535] rounded shadow-2xl py-2 z-50">
                <div className="px-4 py-2 border-b border-[#353535]">
                  <p className="font-headline font-bold text-sm text-[#e2e2e2]">{user?.name}</p>
                  <p className="font-label-caps text-[10px] text-[#c4c9ac] truncate">{user?.email}</p>
                  <span className="inline-block mt-1 bg-[#c3f400]/20 text-[#c3f400] font-label-caps text-[9px] px-1.5 py-0.5 uppercase">
                    {user?.membershipStatus}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setCurrentView('dashboard');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-label-caps uppercase text-[#e2e2e2] hover:bg-[#353535] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base text-[#c3f400]">dashboard</span>
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    setCurrentView('calendar');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-label-caps uppercase text-[#e2e2e2] hover:bg-[#353535] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base text-[#7df4ff]">calendar_month</span>
                  Full Calendar
                </button>
                <div className="border-t border-[#353535] my-1"></div>
                <button
                  onClick={() => {
                    logout();
                    setUserDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-label-caps uppercase text-[#ffb4ab] hover:bg-[#93000a]/20 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">logout</span>
                  Disconnect Session
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setCurrentView('login')}
            className="font-label-caps bg-[#c3f400] text-[#161e00] px-6 py-2 rounded uppercase font-bold text-xs tracking-widest hover:bg-[#abd600] transition-colors box-glow cursor-pointer"
          >
            Access Protocol
          </button>
        )}

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#e2e2e2] p-2 rounded hover:bg-[#353535] cursor-pointer"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full bg-[#131313]/98 border-b border-[#353535] p-6 flex flex-col gap-4 shadow-2xl z-40">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => handleNavClick(item.view)}
              className={`text-left font-label-caps text-sm uppercase py-3 border-b border-[#353535] flex justify-between items-center ${
                currentView === item.view ? 'text-[#c3f400] font-bold pl-2 border-l-2 border-[#c3f400]' : 'text-[#e2e2e2]'
              }`}
            >
              <span>{item.label}</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          ))}
          <button
            onClick={() => handleNavClick('calendar')}
            className="text-left font-label-caps text-sm uppercase py-3 border-b border-[#353535] flex justify-between items-center text-[#e2e2e2]"
          >
            <span>Full Schedule Calendar</span>
            <span className="material-symbols-outlined text-sm">calendar_month</span>
          </button>
          {!isLoggedIn && (
            <button
              onClick={() => handleNavClick('login')}
              className="mt-2 w-full bg-[#c3f400] text-[#161e00] font-label-caps font-bold py-3 uppercase tracking-wider text-center"
            >
              Log In / Sign Up
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
