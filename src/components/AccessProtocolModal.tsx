import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AccessProtocolModal: React.FC = () => {
  const { login, setCurrentView } = useApp();
  const [email, setEmail] = useState('agent@maxxfit.com');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Alex');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showRecoverModal, setShowRecoverModal] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState('');
  const [recoverSent, setRecoverSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter a valid IDENT email.');
      return;
    }
    setErrorMsg('');
    login(email, isSignUp ? name : undefined);
  };

  const handleQuickAccess = () => {
    login('agent@maxxfit.com', 'Alex');
  };

  const handleRecoverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoverEmail) return;
    setRecoverSent(true);
    setTimeout(() => {
      setShowRecoverModal(false);
      setRecoverSent(false);
      setRecoverEmail('');
    }, 2500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-6 relative bg-[#131313] selection:bg-[#c3f400] selection:text-[#161e00]">
      {/* Background Layer with Dark Gym Photo */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA9-CrwW6JNIm6JZnZz_aonlO_oX0t9_ZyQl9Tjewyrpt76FSVQ99rRSGKlr2f85eU_Q_DgSCGP6boCyVOEivi3ho0RDRAI9vYPnjn6Y83w9bfI6L-QErCW3qgYBU04ImZo7fKoBNgv3FJF6wyOVeGLozYWo4WlCLBpgz273i4XvIBlU4MmnwRwaImV8rC9EbfcMMbHw3dx-0AcYhlc1fWJgyS3wE3YS0yw6a5q6fFOUr3gHvmzGi0x')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/80 to-transparent" />
      </div>

      {/* Main Content Box */}
      <main className="w-full max-w-md bg-[#1A1A1A]/85 backdrop-blur-xl border border-[#333333] rounded-none p-8 flex flex-col gap-6 shadow-2xl relative z-10 my-auto">
        {/* Logo & Header */}
        <div className="flex flex-col items-center text-center">
          <img
            alt="Maxxfit Logo"
            className="h-16 mb-4 object-contain drop-shadow-[0_0_15px_rgba(195,244,0,0.25)]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDN0aL_-iyZKx4kjU6PyGqUMmnrtHONbK4wueQ1BJJ--RWXMgAOHIVusXtum8wI6NLEim_7i_Uwhp8oQoxP7pjGCZFqhzKwY1aUndy8l8qcsqYEAHhKoru0Dc8DLT8muCvJJputHIaqabaQXJ1FFB2OmQBzBm3wErjO3yU8GZvOodo29Dka4BhSFY9qeN71k3EXzF0Yb-UVnUa2b6Q51L0Elc6eAT96MfJUE2d59P7LaEOVq3XkCrV"
          />
          <h1 className="font-headline text-3xl font-black italic tracking-tight text-white uppercase">
            {isSignUp ? 'JOIN THE PROTOCOL' : 'ACCESS PROTOCOL'}
          </h1>
          <p className="font-body-md text-sm text-[#c4c9ac] mt-2">
            {isSignUp
              ? 'Create credentials to unlock industrial performance.'
              : 'Enter credentials to unlock performance.'}
          </p>
        </div>

        {errorMsg && (
          <div className="bg-[#93000a]/30 border border-[#ffb4ab]/50 p-3 text-xs font-label-caps text-[#ffb4ab] uppercase">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignUp && (
            <div className="flex flex-col gap-1 relative">
              <label
                className="font-label-caps text-xs text-[#c4c9ac] uppercase tracking-widest pl-1"
                htmlFor="name"
              >
                Athlete Name
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#c4c9ac] text-lg pointer-events-none">
                  badge
                </span>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivers"
                  className="w-full bg-[#0A0A0A] border-0 border-b border-[#333333] focus:border-[#c3f400] focus:ring-0 text-white font-body-md text-sm pl-10 pr-4 py-3 transition-colors placeholder:text-[#c4c9ac]/40"
                  required
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="flex flex-col gap-1 relative">
            <label
              className="font-label-caps text-xs text-[#c4c9ac] uppercase tracking-widest pl-1"
              htmlFor="email"
            >
              Ident
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#c4c9ac] text-lg pointer-events-none">
                person
              </span>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agent@maxxfit.com"
                className="w-full bg-[#0A0A0A] border-0 border-b border-[#333333] focus:border-[#c3f400] focus:ring-0 text-white font-body-md text-sm pl-10 pr-4 py-3 transition-colors placeholder:text-[#c4c9ac]/40"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1 relative mt-1">
            <div className="flex justify-between items-end pl-1 pr-1">
              <label
                className="font-label-caps text-xs text-[#c4c9ac] uppercase tracking-widest"
                htmlFor="password"
              >
                Cipher
              </label>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => setShowRecoverModal(true)}
                  className="font-label-caps text-xs text-[#c3f400] hover:text-[#abd600] transition-colors cursor-pointer"
                >
                  Recover?
                </button>
              )}
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#c4c9ac] text-lg pointer-events-none">
                lock
              </span>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0A0A0A] border-0 border-b border-[#333333] focus:border-[#c3f400] focus:ring-0 text-white font-body-md text-sm pl-10 pr-4 py-3 transition-colors placeholder:text-[#c4c9ac]/40 tracking-[0.2em]"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-4">
            <button
              type="submit"
              className="w-full bg-[#c3f400] text-[#161e00] font-label-caps font-black uppercase tracking-widest py-4 neon-glow transition-all active:scale-[0.98] cursor-pointer"
            >
              {isSignUp ? 'CREATE ACCOUNT & UNLOCK' : 'LOG IN'}
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-[#333333]" />
              <span className="flex-shrink-0 mx-4 font-label-caps text-xs text-[#c4c9ac]">
                OR
              </span>
              <div className="flex-grow border-t border-[#333333]" />
            </div>

            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full bg-transparent border border-[#333333] text-white font-label-caps font-bold uppercase tracking-widest py-3 text-center hover:bg-[#353535] hover:border-[#353535] transition-all cursor-pointer text-xs"
            >
              {isSignUp ? 'Already a Member? Log In' : 'Sign up for a membership'}
            </button>

            <button
              type="button"
              onClick={handleQuickAccess}
              className="w-full bg-[#1f1f1f] border border-[#c3f400]/40 text-[#c3f400] font-label-caps font-bold uppercase tracking-widest py-2.5 text-center hover:bg-[#c3f400]/10 transition-all cursor-pointer text-xs flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">bolt</span>
              Instant Demo Access (Alex)
            </button>
          </div>
        </form>

        <div className="text-center pt-2 border-t border-[#333333]/60">
          <button
            onClick={() => setCurrentView('home')}
            className="font-label-caps text-[11px] text-[#c4c9ac] hover:text-[#c3f400] uppercase tracking-wider transition-colors cursor-pointer"
          >
            ← Return to Public Homepage
          </button>
        </div>
      </main>

      {/* Recover Password Modal */}
      {showRecoverModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#1A1A1A] border border-[#333333] p-6 shadow-2xl relative">
            <h3 className="font-headline font-bold text-lg text-white italic uppercase mb-2">
              Cipher Recovery
            </h3>
            <p className="font-body-md text-xs text-[#c4c9ac] mb-4">
              Enter your IDENT email to receive encrypted reset credentials.
            </p>

            {recoverSent ? (
              <div className="bg-[#c3f400]/20 border border-[#c3f400] p-4 text-center">
                <span className="material-symbols-outlined text-[#c3f400] text-3xl mb-1">
                  mark_email_read
                </span>
                <p className="font-label-caps text-xs text-[#c3f400] uppercase font-bold">
                  Recovery Dispatch Sent!
                </p>
                <p className="font-body-md text-xs text-[#e2e2e2] mt-1">
                  Check your inbox for reset directives.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRecoverSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-label-caps text-[11px] text-[#c4c9ac] uppercase">
                    Ident Email
                  </label>
                  <input
                    type="email"
                    value={recoverEmail}
                    onChange={(e) => setRecoverEmail(e.target.value)}
                    placeholder="agent@maxxfit.com"
                    className="w-full bg-[#0A0A0A] border border-[#333333] text-white p-2.5 text-sm focus:border-[#c3f400] focus:outline-none"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowRecoverModal(false)}
                    className="font-label-caps text-xs uppercase px-4 py-2 border border-[#333333] text-[#c4c9ac] hover:bg-[#353535]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="font-label-caps text-xs uppercase px-4 py-2 bg-[#c3f400] text-[#161e00] font-bold"
                  >
                    Send Recovery
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
