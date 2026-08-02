import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ProgramsScreen: React.FC = () => {
  const { routines, setActiveRoutineId, setCurrentView } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const categories = ['ALL', 'High Intensity', 'Powerlifting', 'Strength', 'Recovery'];

  const filteredRoutines = selectedFilter === 'ALL'
    ? routines
    : routines.filter((r) => r.category.toLowerCase() === selectedFilter.toLowerCase());

  const handleStartProtocol = (id: string) => {
    setActiveRoutineId(id);
    setCurrentView('routine_detail');
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full min-h-screen bg-[#131313] text-[#e2e2e2]">
      <div className="mb-8 border-b border-[#353535] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-label-caps text-xs text-[#c3f400] uppercase tracking-widest block mb-1">
            FACILITY CURRICULUM
          </span>
          <h1 className="font-headline text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tight">
            Training Protocols
          </h1>
          <p className="font-body-md text-sm text-[#c4c9ac] mt-2">
            Engineered strength, power, and metabolic conditioning programs.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`font-label-caps text-xs uppercase px-3 py-1.5 transition-all cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-[#c3f400] text-[#161e00] font-bold'
                  : 'bg-[#1f1f1f] text-[#c4c9ac] border border-[#353535] hover:border-[#c3f400]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoutines.map((routine) => (
          <div
            key={routine.id}
            className="bg-[#1f1f1f] border border-[#353535] overflow-hidden flex flex-col hover:border-[#c3f400] transition-all group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={routine.bgImage}
                alt={routine.title}
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f] via-transparent to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="bg-[#c3f400] text-[#161e00] font-label-caps text-[10px] px-2 py-1 uppercase font-bold">
                  {routine.category}
                </span>
              </div>
            </div>

            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-headline text-2xl font-bold text-white italic uppercase mb-2">
                  {routine.title}
                </h3>
                <p className="font-body-md text-xs text-[#c4c9ac] line-clamp-2 leading-relaxed mb-4">
                  {routine.description}
                </p>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-2 p-3 bg-[#131313] border border-[#353535] mb-4 text-xs font-label-caps">
                  <div>
                    <span className="text-[#c4c9ac] block text-[9px] uppercase">Duration</span>
                    <span className="text-white font-bold">{routine.durationMinutes} Mins</span>
                  </div>
                  <div>
                    <span className="text-[#c4c9ac] block text-[9px] uppercase">Exercises</span>
                    <span className="text-[#7df4ff] font-bold">{routine.exercises.length} Exercises</span>
                  </div>
                </div>

                <button
                  onClick={() => handleStartProtocol(routine.id)}
                  className="w-full bg-[#c3f400] text-[#161e00] font-label-caps font-bold text-xs py-3 uppercase tracking-wider hover:bg-[#abd600] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  Start Protocol <span className="material-symbols-outlined text-sm">play_arrow</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
