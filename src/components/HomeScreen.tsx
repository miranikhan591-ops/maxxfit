import React from 'react';
import { useApp } from '../context/AppContext';

export const HomeScreen: React.FC = () => {
  const { setCurrentView, setActiveRoutineId, isLoggedIn } = useApp();

  const handleStartTrial = () => {
    if (!isLoggedIn) {
      setCurrentView('login');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleSelectProgram = (routineId: string) => {
    setActiveRoutineId(routineId);
    setCurrentView('routine_detail');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#131313] text-[#e2e2e2]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-[#353535] pt-20">
        <div className="absolute inset-0 z-0">
          <div
            className="bg-cover bg-center w-full h-full opacity-40 scale-105 transition-transform duration-1000"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuClPbFEnvDhK45SahF5B3p_-t_B94W-uVsWwdNLp6K0PE6_bd5cOc_G6CNyexxXV90mCTkqR8DYWio28ZgseEpUOv0RI-Sy8fXF-ZKLH0ssohSKLFsyW7OBRyx2m80R9jhB1EnP3yglpnAcwJ3dWN8Twm50ZsMC2I87Qr1mUMyYs54-TJAIW1S3qmSn6bHqmRzToAh_3x5NN1lyHDYn2kf25ool0fdDSNPwTYuPrtweqTwHHLVQudYL')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/80 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-6 py-12">
          <div className="inline-flex items-center gap-2 bg-[#1f1f1f] border border-[#c3f400]/40 px-3 py-1 rounded-none text-[#c3f400] font-label-caps text-xs uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-[#c3f400] animate-ping" />
            INDUSTRIAL FITNESS FACILITY • ONLINE PROTOCOL
          </div>

          <h1 className="font-headline text-5xl sm:text-7xl md:text-[96px] md:leading-[96px] font-black text-[#c3f400] italic uppercase neon-text-glow tracking-tight">
            PUSH YOUR LIMITS
          </h1>

          <p className="font-body-md text-base sm:text-lg text-[#e2e2e2] max-w-2xl mx-auto opacity-90 leading-relaxed">
            Professional-grade training equipment, elite coaching, and an environment engineered for peak performance. Stop exercising. Start training.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <button
              onClick={handleStartTrial}
              className="bg-[#c3f400] text-[#161e00] font-label-caps text-sm font-black px-8 py-4 uppercase tracking-wider hover:bg-[#abd600] transition-colors neon-glow cursor-pointer"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => setCurrentView('programs')}
              className="bg-transparent border border-[#353535] text-white font-label-caps text-sm font-bold px-8 py-4 uppercase tracking-wider hover:bg-[#353535] transition-colors cursor-pointer"
            >
              View Programs
            </button>
          </div>
        </div>
      </section>

      {/* Features Section (Bento Grid) */}
      <section className="py-16 px-6 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-[#c3f400] italic uppercase tracking-tight">
              The Maxx Standard
            </h2>
            <p className="font-body-md text-sm text-[#c4c9ac] mt-1">
              Engineering biomechanical perfection and uncompromising physical conditioning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-[#1f1f1f] border border-[#353535] p-8 hover:border-[#c3f400]/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-[#c3f400] transition-all duration-300" />
              <span className="material-symbols-outlined text-4xl text-[#c3f400] mb-4 block group-hover:scale-110 transition-transform">
                sports_martial_arts
              </span>
              <h3 className="font-headline text-2xl font-bold text-white mb-2 uppercase italic">
                Elite Trainers
              </h3>
              <p className="font-body-md text-sm text-[#c4c9ac] leading-relaxed">
                Access to industry-leading professionals who push you beyond your perceived boundaries with precise programming.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#1f1f1f] border border-[#353535] p-8 hover:border-[#c3f400]/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-[#c3f400] transition-all duration-300" />
              <span className="material-symbols-outlined text-4xl text-[#c3f400] mb-4 block group-hover:scale-110 transition-transform">
                fitness_center
              </span>
              <h3 className="font-headline text-2xl font-bold text-white mb-2 uppercase italic">
                Advanced Gear
              </h3>
              <p className="font-body-md text-sm text-[#c4c9ac] leading-relaxed">
                Tactical-grade equipment engineered for biomechanical perfection and heavy compound load endurance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#1f1f1f] border border-[#353535] p-8 hover:border-[#c3f400]/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-[#c3f400] transition-all duration-300" />
              <span className="material-symbols-outlined text-4xl text-[#c3f400] mb-4 block group-hover:scale-110 transition-transform">
                schedule
              </span>
              <h3 className="font-headline text-2xl font-bold text-white mb-2 uppercase italic">
                24/7 Access
              </h3>
              <p className="font-body-md text-sm text-[#c4c9ac] leading-relaxed">
                Train on your schedule. Secure, round-the-clock biometric access to facility and digital routine trackers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 px-6 bg-[#131313]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 border-b border-[#353535] pb-4">
            <div>
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-white italic uppercase tracking-tight">
                Training Protocols
              </h2>
              <p className="font-body-md text-sm text-[#c4c9ac] mt-1">
                Select an active protocol to inspect routines and log sets.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('programs')}
              className="font-label-caps text-xs text-[#c3f400] hover:underline hidden sm:block uppercase tracking-wider cursor-pointer"
            >
              View All Protocols →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Program 1 */}
            <div
              onClick={() => handleSelectProgram('rtn_maxx_hiit')}
              className="relative h-80 overflow-hidden group border border-[#353535] cursor-pointer hover:border-[#c3f400] transition-all"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD00xJ2A_Ijos2sO0KMHntzcWJqclMxJrK83RvhCO-Sntc3DQX3-E6ZptMiaNfhj8-d1jyDOLl534cZC8ivs98DzEtwBIGCYRlDz4PFDH5PnksIoza3adLUGvzq0s2b907KImvXK8OEoBnja3FilZzqbJvjusm0QDN6KLF8_mSkhc5gMbOS1iJ3PArHR3egX95qDkD3d23zFWk3XC1dy-7yP_H-zlq13_ZPLhXzjKnFGwTrSBwJs8Uu')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/50 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="w-1 bg-[#c3f400] h-8 absolute left-0 bottom-6" />
                <div className="pl-4">
                  <span className="bg-[#c3f400] text-[#161e00] font-label-caps text-[10px] px-2 py-1 uppercase font-bold inline-block mb-2">
                    High Intensity
                  </span>
                  <h3 className="font-headline text-2xl text-white font-bold italic uppercase">
                    Maxx HIIT
                  </h3>
                  <p className="font-body-md text-sm text-[#c4c9ac] line-clamp-2 mt-1">
                    45 minutes of absolute metabolic conditioning to strip fat and build endurance.
                  </p>
                </div>
              </div>
            </div>

            {/* Program 2 */}
            <div
              onClick={() => handleSelectProgram('rtn_iron_forge')}
              className="relative h-80 overflow-hidden group border border-[#353535] cursor-pointer hover:border-[#7df4ff] transition-all"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBop6hGsMsq1WvcCG__0mWhMm68K9A8hJL819-L1WXWuVbHxHkosv5poGYuF7tqQMZIXMsAMF1MGYB6ildeEKTt1iX106eiXC9gN2hldau166bP4DLeFnXG9G-FRcfgdFedGNtPAF4HByTNKX9OqBFOStObHnsnFtxx9Cuahdg1DSZRb3QyfR8h4NFG4nRXm5oLhZliGiADD5DrhMYIJkw-21xHaEB58zJkMKTjWAlbWU099NSn2LWO')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/50 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="w-1 bg-[#7df4ff] h-8 absolute left-0 bottom-6" />
                <div className="pl-4">
                  <span className="bg-[#7df4ff] text-[#002022] font-label-caps text-[10px] px-2 py-1 uppercase font-bold inline-block mb-2">
                    Powerlifting
                  </span>
                  <h3 className="font-headline text-2xl text-white font-bold italic uppercase">
                    Iron Forge
                  </h3>
                  <p className="font-body-md text-sm text-[#c4c9ac] line-clamp-2 mt-1">
                    Pure strength protocol focusing on the main compound lifts for maximum power output.
                  </p>
                </div>
              </div>
            </div>

            {/* Program 3 */}
            <div
              onClick={() => handleSelectProgram('rtn_tactical_mobility')}
              className="relative h-80 overflow-hidden group border border-[#353535] cursor-pointer hover:border-[#353535] transition-all lg:col-span-1 md:col-span-2"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDxa892bIErjJxCYDrlP7RUVSB6BM6tMqdW4gW2apbbaMCpezw8YxiMWEkbxaCFV1UPwW84VFDSl1ClUEd5HfPQmfRYJQ6zjWDZFpl1uPcjaOKe663-iqYNl1_glq-lxsGbxlfU_RK5BmxC2kPVFoZxI81JntbgiNRSP6nSmY08SZNW60Y0LZVHwStq1tKA08r6vcTRznPf91VkIaOnYJpQghgkzKb3dFUJYKMMopHil2yXSna6JQJf')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/50 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="w-1 bg-[#c4c9ac] h-8 absolute left-0 bottom-6" />
                <div className="pl-4">
                  <span className="bg-[#353535] text-white font-label-caps text-[10px] px-2 py-1 uppercase font-bold inline-block mb-2">
                    Recovery
                  </span>
                  <h3 className="font-headline text-2xl text-white font-bold italic uppercase">
                    Tactical Mobility
                  </h3>
                  <p className="font-body-md text-sm text-[#c4c9ac] line-clamp-2 mt-1">
                    Active recovery, deep tissue mechanics, and joint health to keep you in the fight.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
