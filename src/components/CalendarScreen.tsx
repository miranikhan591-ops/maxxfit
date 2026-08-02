import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Reorder } from 'motion/react';

export const CalendarScreen: React.FC = () => {
  const { schedule, setSchedule, deleteScheduleItem, addScheduleItem, routines, setActiveRoutineId, setCurrentView } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [timeLabel, setTimeLabel] = useState('Friday • 18:00');
  const [title, setTitle] = useState('CHEST & TRICEPS POWER');
  const [subtitle, setSubtitle] = useState('Zone 3 • 60 Min');
  const [type, setType] = useState<'Workout' | 'Recovery' | 'Mobility' | 'HIIT'>('Workout');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addScheduleItem({
      timeLabel,
      title,
      subtitle,
      type,
    });
    setShowAddModal(false);
  };

  const handleLaunchRoutine = (routineId?: string) => {
    const found = routines.find((r) => r.id === routineId) || routines[0];
    if (found) {
      setActiveRoutineId(found.id);
      setCurrentView('routine_detail');
    }
  };

  const daysOfWeek = ['MON 23', 'TUE 24', 'WED 25', 'THU 26', 'FRI 27', 'SAT 28', 'SUN 29'];

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full min-h-screen bg-[#131313] text-[#e2e2e2]">
      <div className="mb-8 border-b border-[#353535] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-label-caps text-xs text-[#7df4ff] uppercase tracking-widest block mb-1">
            PERFORMANCE TIMELINE
          </span>
          <h1 className="font-headline text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tight">
            Schedule Calendar
          </h1>
          <p className="font-body-md text-sm text-[#c4c9ac] mt-2">
            Organize training sessions, active recovery, and metabolic conditioning. Drag to adjust priority.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="font-label-caps bg-[#c3f400] text-[#161e00] px-6 py-3 text-xs uppercase font-bold tracking-wider hover:bg-[#abd600] transition-colors flex items-center gap-2 cursor-pointer w-max"
        >
          <span className="material-symbols-outlined text-base">add_circle</span>
          Schedule Event
        </button>
      </div>

      {/* Week Grid Header */}
      <div className="grid grid-cols-7 gap-2 mb-6 hidden md:grid">
        {daysOfWeek.map((day, idx) => (
          <div
            key={day}
            className={`p-3 text-center border font-label-caps text-xs ${
              idx === 0
                ? 'bg-[#c3f400]/10 border-[#c3f400] text-[#c3f400] font-bold'
                : 'bg-[#1f1f1f] border-[#353535] text-[#c4c9ac]'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Reorderable List */}
      <div className="bg-[#1f1f1f] border border-[#353535] p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4 border-b border-[#353535] pb-2">
          <span className="font-label-caps text-xs text-[#c4c9ac] uppercase">
            UPCOMING SESSIONS ({schedule.length}) • DRAG TO REORDER
          </span>
          <span className="font-label-caps text-[10px] text-[#7df4ff]">REALTIME SYNC ACTIVE</span>
        </div>

        <Reorder.Group axis="y" values={schedule} onReorder={setSchedule} className="space-y-3">
          {schedule.map((item) => (
            <Reorder.Item key={item.id} value={item} className="cursor-grab active:cursor-grabbing select-none">
              <div className="p-4 bg-[#131313] border border-[#353535] hover:border-[#7df4ff] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#c4c9ac] text-sm">drag_indicator</span>
                  <div>
                    <span className="font-label-caps text-xs text-[#c3f400] font-bold block">{item.timeLabel}</span>
                    <h3 className="font-headline text-lg font-bold text-white uppercase italic">{item.title}</h3>
                    <p className="font-body-md text-xs text-[#c4c9ac]">{item.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="font-label-caps text-[10px] bg-[#353535] text-white px-2 py-1 uppercase">
                    {item.type || 'Workout'}
                  </span>
                  <button
                    onClick={() => handleLaunchRoutine(item.routineId)}
                    className="bg-[#c3f400] text-[#161e00] font-label-caps text-xs font-bold px-4 py-2 uppercase flex items-center gap-1 cursor-pointer hover:bg-[#abd600]"
                  >
                    <span className="material-symbols-outlined text-sm">play_arrow</span> Start
                  </button>
                  <button
                    onClick={() => deleteScheduleItem(item.id)}
                    className="text-[#c4c9ac] hover:text-[#ffb4ab] p-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#1f1f1f] border border-[#353535] p-6 shadow-2xl">
            <h3 className="font-headline font-bold text-lg text-white uppercase italic mb-4">
              Schedule Performance Session
            </h3>
            <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
              <div>
                <label className="font-label-caps text-xs text-[#c4c9ac] uppercase block mb-1">Time & Day</label>
                <input
                  type="text"
                  value={timeLabel}
                  onChange={(e) => setTimeLabel(e.target.value)}
                  placeholder="e.g. Friday • 18:00"
                  className="w-full bg-[#131313] border border-[#353535] p-2.5 text-sm text-white focus:border-[#c3f400] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="font-label-caps text-xs text-[#c4c9ac] uppercase block mb-1">Session Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. CHEST & TRICEPS POWER"
                  className="w-full bg-[#131313] border border-[#353535] p-2.5 text-sm text-white focus:border-[#c3f400] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="font-label-caps text-xs text-[#c4c9ac] uppercase block mb-1">Subtitle / Zone</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Zone 3 • 60 Min"
                  className="w-full bg-[#131313] border border-[#353535] p-2.5 text-sm text-white focus:border-[#c3f400] focus:outline-none"
                />
              </div>
              <div>
                <label className="font-label-caps text-xs text-[#c4c9ac] uppercase block mb-1">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-[#131313] border border-[#353535] p-2.5 text-sm text-white focus:border-[#c3f400] focus:outline-none"
                >
                  <option value="Workout">Workout</option>
                  <option value="Powerlifting">Powerlifting</option>
                  <option value="HIIT">HIIT</option>
                  <option value="Mobility">Mobility</option>
                  <option value="Recovery">Recovery</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#353535] font-label-caps text-xs text-[#c4c9ac] uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#c3f400] text-[#161e00] font-label-caps text-xs font-bold uppercase"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
