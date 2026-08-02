import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Reorder } from 'motion/react';
import { WorkoutRoutine, ScheduleItem } from '../types';

export const DashboardScreen: React.FC<{ onOpenNewRoutine: () => void }> = ({ onOpenNewRoutine }) => {
  const {
    user,
    routines,
    setRoutines,
    schedule,
    setSchedule,
    setActiveRoutineId,
    setCurrentView,
    deleteScheduleItem,
    addScheduleItem,
    historyLogs,
  } = useApp();

  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [schTime, setSchTime] = useState('Tomorrow • 18:00');
  const [schTitle, setSchTitle] = useState('LEGS & ABS DESTRUCTION');
  const [schSub, setSchSub] = useState('Zone 4 • 50 Min');
  const [schType, setSchType] = useState<'Workout' | 'Recovery' | 'Mobility' | 'HIIT'>('Workout');

  const handleSelectRoutine = (routineId: string) => {
    setActiveRoutineId(routineId);
    setCurrentView('routine_detail');
  };

  const handleAddScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schTitle) return;
    addScheduleItem({
      timeLabel: schTime,
      title: schTitle,
      subtitle: schSub,
      type: schType,
    });
    setShowAddScheduleModal(false);
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full min-h-screen bg-[#0e0e0e] text-[#e2e2e2]">
      {/* Header */}
      <header className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#353535] pb-6">
        <div>
          <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl text-white uppercase italic tracking-tight font-black">
            Hello, <span className="text-[#c3f400] neon-text-glow">{user?.name || 'Alex'}</span>
          </h1>
          <p className="font-body-md text-sm text-[#c4c9ac] mt-2">
            Ready to push your limits today? Multi-device real-time sync active.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onOpenNewRoutine}
            className="font-label-caps bg-[#1f1f1f] border border-[#c3f400] text-[#c3f400] hover:bg-[#c3f400]/10 px-4 py-2.5 rounded-none text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            New Routine
          </button>
          <button
            onClick={() => setCurrentView('calendar')}
            className="font-label-caps bg-[#353535] text-white hover:bg-[#474746] px-4 py-2.5 rounded-none text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            Calendar
          </button>
        </div>
      </header>

      {/* Stats Overview (Bento Grid) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Calorie Card */}
        <div className="bg-[#1f1f1f] border border-[#353535] rounded-none p-6 relative overflow-hidden group hover:border-[#c3f400]/40 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-caps text-xs text-[#c4c9ac] uppercase tracking-wider">
              Calories Burned
            </span>
            <span className="material-symbols-outlined text-[#c3f400]">local_fire_department</span>
          </div>
          <div className="font-stat-value text-3xl sm:text-4xl text-white mb-2 italic">
            {user?.caloriesBurned.toLocaleString()}{' '}
            <span className="text-sm font-normal text-[#c4c9ac] not-italic">kcal</span>
          </div>
          {/* Neon Accent Chart */}
          <div className="w-full bg-[#353535] h-2 rounded-none mt-4 overflow-hidden">
            <div
              className="h-full chart-gradient rounded-none transition-all duration-1000"
              style={{ width: `${Math.min(100, (user?.caloriesBurned || 2450) / 3000 * 100)}%` }}
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#c3f400]/5 rounded-full blur-2xl group-hover:bg-[#c3f400]/10 transition-all pointer-events-none" />
        </div>

        {/* Streak Card */}
        <div className="bg-[#1f1f1f] border border-[#353535] rounded-none p-6 relative overflow-hidden group hover:border-[#7df4ff]/40 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-caps text-xs text-[#c4c9ac] uppercase tracking-wider">
              Workout Streak
            </span>
            <span className="material-symbols-outlined text-[#7df4ff]">bolt</span>
          </div>
          <div className="font-stat-value text-3xl sm:text-4xl text-white mb-2 italic">
            {user?.workoutStreak}{' '}
            <span className="text-sm font-normal text-[#c4c9ac] not-italic">Days</span>
          </div>
          {/* Segmented Streak Bar */}
          <div className="w-full bg-[#353535] h-2 rounded-none mt-4 overflow-hidden flex gap-1">
            <div className="h-full bg-[#7df4ff] w-1/5" />
            <div className="h-full bg-[#7df4ff] w-1/5" />
            <div className="h-full bg-[#7df4ff] w-1/5" />
            <div className="h-full bg-[#7df4ff] w-1/5" />
            <div className="h-full bg-[#7df4ff]/30 w-1/5 animate-pulse" />
          </div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#7df4ff]/5 rounded-full blur-2xl group-hover:bg-[#7df4ff]/10 transition-all pointer-events-none" />
        </div>

        {/* Active Minutes Card */}
        <div className="bg-[#1f1f1f] border border-[#353535] rounded-none p-6 relative overflow-hidden group hover:border-[#c3f400]/40 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-caps text-xs text-[#c4c9ac] uppercase tracking-wider">
              Active Minutes
            </span>
            <span className="material-symbols-outlined text-[#c3f400]">timer</span>
          </div>
          <div className="font-stat-value text-3xl sm:text-4xl text-white mb-2 italic">
            {user?.activeMinutesWeek}{' '}
            <span className="text-sm font-normal text-[#c4c9ac] not-italic">min / week</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-[#353535] h-2 rounded-none mt-4 overflow-hidden">
            <div
              className="h-full bg-[#c3f400] rounded-none transition-all duration-1000"
              style={{ width: `${Math.min(100, (user?.activeMinutesWeek || 340) / 400 * 100)}%` }}
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#c3f400]/5 rounded-full blur-2xl group-hover:bg-[#c3f400]/10 transition-all pointer-events-none" />
        </div>
      </section>

      {/* Asymmetric Layout: Routines & Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: My Routines (8 cols) */}
        <section className="lg:col-span-8 flex flex-col">
          <div className="flex justify-between items-end mb-6 border-b border-[#353535] pb-2">
            <div className="flex items-center gap-2">
              <h2 className="font-headline text-2xl text-white uppercase italic font-bold">
                My Routines
              </h2>
              <span className="font-label-caps text-[10px] text-[#c3f400] bg-[#c3f400]/10 px-2 py-0.5 border border-[#c3f400]/30 uppercase">
                Drag to Reorder
              </span>
            </div>
            <button
              onClick={() => setCurrentView('programs')}
              className="font-label-caps text-xs text-[#c3f400] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Reorderable List of Routines */}
          <Reorder.Group
            axis="y"
            values={routines}
            onReorder={setRoutines}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {routines.map((routine) => (
              <Reorder.Item key={routine.id} value={routine} className="cursor-grab active:cursor-grabbing select-none">
                <div
                  onClick={() => handleSelectRoutine(routine.id)}
                  className="group relative rounded-none overflow-hidden border border-[#353535] bg-[#1f1f1f] aspect-video md:aspect-auto md:h-64 cursor-pointer hover:border-[#c3f400] transition-all"
                >
                  <img
                    alt={routine.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
                    src={routine.bgImage}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent" />
                  <div className="absolute top-3 right-3 z-20 bg-[#0e0e0e]/80 p-1.5 border border-[#353535] text-[#c4c9ac] opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-sm">drag_indicator</span>
                  </div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                    <span
                      className={`inline-block font-label-caps text-[10px] px-2 py-1 rounded-none uppercase tracking-wider mb-2 w-max font-bold ${
                        routine.badgeType === 'primary'
                          ? 'bg-[#c3f400] text-[#161e00]'
                          : routine.badgeType === 'cyan'
                          ? 'bg-[#7df4ff] text-[#002022]'
                          : 'bg-[#353535] text-[#e2e2e2] border border-[#353535]'
                      }`}
                    >
                      {routine.badge || routine.category}
                    </span>
                    <h3 className="font-headline text-2xl text-white font-bold italic uppercase tracking-tight">
                      {routine.title}
                    </h3>
                    <p className="font-body-md text-xs text-[#c4c9ac] mt-1 line-clamp-1">
                      {routine.weekInfo || routine.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#353535]/60 text-[11px] font-label-caps text-[#c4c9ac]">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-[#c3f400]">schedule</span>
                        {routine.durationMinutes}m
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-[#7df4ff]">fitness_center</span>
                        {routine.exercises.length} Exercises
                      </span>
                    </div>
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>

          {/* Quick Stats or Recent History */}
          <div className="mt-8 bg-[#1f1f1f] border border-[#353535] p-6">
            <h3 className="font-headline text-lg text-white italic uppercase font-bold mb-4 flex items-center justify-between">
              <span>Recent Workout Completion Log</span>
              <span className="material-symbols-outlined text-[#c3f400]">verified</span>
            </h3>

            {historyLogs.length === 0 ? (
              <p className="font-body-md text-xs text-[#c4c9ac]">No workouts logged yet. Complete a routine to log data!</p>
            ) : (
              <div className="space-y-3">
                {historyLogs.slice(0, 3).map((log) => (
                  <div key={log.id} className="flex justify-between items-center p-3 bg-[#131313] border border-[#353535] text-xs">
                    <div>
                      <span className="font-headline font-bold text-white uppercase italic block">{log.routineTitle}</span>
                      <span className="font-label-caps text-[10px] text-[#c4c9ac]">{log.completedAt} • {log.durationMinutes} mins</span>
                    </div>
                    <div className="text-right">
                      <span className="font-label-caps text-[#c3f400] font-bold block">+{log.caloriesEarned} kcal</span>
                      <span className="font-label-caps text-[10px] text-[#7df4ff]">{log.totalVolumeLbs.toLocaleString()} lbs total</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Right Column: Schedule (4 cols) */}
        <section className="lg:col-span-4 flex flex-col">
          <div className="flex justify-between items-end mb-6 border-b border-[#353535] pb-2">
            <div className="flex items-center gap-2">
              <h2 className="font-headline text-2xl text-white uppercase italic font-bold">
                Schedule
              </h2>
              <span className="font-label-caps text-[10px] text-[#7df4ff] bg-[#7df4ff]/10 px-2 py-0.5 border border-[#7df4ff]/30 uppercase">
                Drag to Reorder
              </span>
            </div>
            <button
              onClick={() => setShowAddScheduleModal(true)}
              className="material-symbols-outlined text-[#c3f400] hover:text-white cursor-pointer"
              title="Add Schedule Event"
            >
              add_circle
            </button>
          </div>

          <div className="bg-[#1f1f1f] border border-[#353535] rounded-none p-2 flex-grow">
            <Reorder.Group axis="y" values={schedule} onReorder={setSchedule} className="flex flex-col">
              {schedule.map((item) => (
                <Reorder.Item key={item.id} value={item} className="cursor-grab active:cursor-grabbing select-none">
                  <div className={`p-4 border-b border-[#353535] relative overflow-hidden transition-colors ${
                    item.isNext ? 'bg-[#353535]/30' : 'hover:bg-[#353535]/20'
                  }`}>
                    {/* Left Accent Bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                      item.isNext ? 'bg-[#c3f400]' : 'bg-[#7df4ff]'
                    }`} />
                    <div className="flex justify-between items-start pl-3">
                      <div className="flex-grow">
                        <span className="font-label-caps text-[11px] text-[#c3f400] block mb-1">
                          {item.timeLabel}
                        </span>
                        <strong className="font-body-md text-white block font-bold uppercase tracking-wide text-sm">
                          {item.title}
                        </strong>
                        <span className="font-body-md text-[#c4c9ac] text-xs">
                          {item.subtitle}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 ml-2">
                        <button
                          onClick={() => {
                            const foundRtn = routines.find((r) => r.id === item.routineId) || routines[0];
                            if (foundRtn) handleSelectRoutine(foundRtn.id);
                          }}
                          className="w-8 h-8 rounded-full border border-[#c3f400] text-[#c3f400] flex items-center justify-center hover:bg-[#c3f400] hover:text-[#161e00] transition-colors cursor-pointer"
                          title="Start Session"
                        >
                          <span className="material-symbols-outlined text-lg">play_arrow</span>
                        </button>
                        <button
                          onClick={() => deleteScheduleItem(item.id)}
                          className="w-8 h-8 text-[#c4c9ac] hover:text-[#ffb4ab] flex items-center justify-center cursor-pointer"
                          title="Remove Event"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>

            <div className="mt-4 px-4 pb-2">
              <button
                onClick={() => setCurrentView('calendar')}
                className="w-full py-3 border border-[#353535] text-white font-label-caps text-xs uppercase hover:bg-[#353535] transition-colors cursor-pointer tracking-wider"
              >
                View Full Calendar
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Add Schedule Modal */}
      {showAddScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#1f1f1f] border border-[#353535] p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b border-[#353535] pb-2">
              <h3 className="font-headline font-bold text-lg text-white uppercase italic">
                Schedule Session
              </h3>
              <button onClick={() => setShowAddScheduleModal(false)} className="text-[#c4c9ac] hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddScheduleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="font-label-caps text-xs text-[#c4c9ac] uppercase block mb-1">Time & Date</label>
                <input
                  type="text"
                  value={schTime}
                  onChange={(e) => setSchTime(e.target.value)}
                  placeholder="Tomorrow • 18:00"
                  className="w-full bg-[#131313] border border-[#353535] p-2.5 text-sm text-white focus:border-[#c3f400] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-label-caps text-xs text-[#c4c9ac] uppercase block mb-1">Session Title</label>
                <input
                  type="text"
                  value={schTitle}
                  onChange={(e) => setSchTitle(e.target.value)}
                  placeholder="LEGS & ABS DESTRUCTION"
                  className="w-full bg-[#131313] border border-[#353535] p-2.5 text-sm text-white focus:border-[#c3f400] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-label-caps text-xs text-[#c4c9ac] uppercase block mb-1">Subtitle / Zone</label>
                <input
                  type="text"
                  value={schSub}
                  onChange={(e) => setSchSub(e.target.value)}
                  placeholder="Zone 4 • 50 Min"
                  className="w-full bg-[#131313] border border-[#353535] p-2.5 text-sm text-white focus:border-[#c3f400] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-label-caps text-xs text-[#c4c9ac] uppercase block mb-1">Type</label>
                <select
                  value={schType}
                  onChange={(e) => setSchType(e.target.value as any)}
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
                  onClick={() => setShowAddScheduleModal(false)}
                  className="px-4 py-2 border border-[#353535] font-label-caps text-xs text-[#c4c9ac] uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#c3f400] text-[#161e00] font-label-caps text-xs font-bold uppercase"
                >
                  Save Schedule Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
