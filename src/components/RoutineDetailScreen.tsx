import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Reorder } from 'motion/react';
import { Exercise, ExerciseSet } from '../types';

export const RoutineDetailScreen: React.FC = () => {
  const {
    activeRoutine,
    toggleSetCompleted,
    updateSetValues,
    addSetToExercise,
    removeSetFromExercise,
    addExerciseToRoutine,
    removeExerciseFromRoutine,
    completeWorkout,
    setCurrentView,
    setRoutines,
  } = useApp();

  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [restTimer, setRestTimer] = useState(0);
  const [showRestModal, setShowRestModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [newExName, setNewExName] = useState('');
  const [newExNotes, setNewExNotes] = useState('');
  const [showAddExModal, setShowAddExModal] = useState(false);

  // Live Workout Timer ticker
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setWorkoutTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Rest Timer ticker
  useEffect(() => {
    let interval: any = null;
    if (restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer((prev) => prev - 1);
      }, 1000);
    } else if (restTimer === 0 && showRestModal) {
      // play optional rest done feedback
    }
    return () => clearInterval(interval);
  }, [restTimer, showRestModal]);

  if (!activeRoutine) {
    return (
      <div className="pt-28 px-8 text-center min-h-screen bg-[#131313] text-white">
        <p className="font-label-caps text-[#c4c9ac] mb-4">No active routine selected.</p>
        <button
          onClick={() => setCurrentView('dashboard')}
          className="bg-[#c3f400] text-[#161e00] font-label-caps font-bold px-6 py-3 uppercase"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Calculate workout completion percentage
  let totalSets = 0;
  let completedSets = 0;
  let totalVolumeLbs = 0;

  activeRoutine.exercises.forEach((ex) => {
    ex.sets.forEach((st) => {
      totalSets++;
      if (st.completed) {
        completedSets++;
        const wt = typeof st.weightLbs === 'number' ? st.weightLbs : parseFloat(st.weightLbs) || 0;
        const rp = typeof st.reps === 'number' ? st.reps : parseFloat(st.reps) || 0;
        totalVolumeLbs += wt * rp;
      }
    });
  });

  const progressPercentage = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCheckboxClick = (exerciseId: string, setId: string, currentlyCompleted: boolean) => {
    toggleSetCompleted(activeRoutine.id, exerciseId, setId);
    if (!currentlyCompleted) {
      // Trigger 60-second rest timer when checking a set as done!
      setRestTimer(60);
      setShowRestModal(true);
    }
  };

  const handleCompleteWorkout = () => {
    setIsTimerRunning(false);
    completeWorkout(activeRoutine.id);
    setShowCompletionModal(true);
  };

  const handleAddExerciseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExName) return;
    addExerciseToRoutine(activeRoutine.id, newExName, newExNotes);
    setNewExName('');
    setNewExNotes('');
    setShowAddExModal(false);
  };

  // Handler for reordering exercises within this routine
  const handleReorderExercises = (newExercises: Exercise[]) => {
    setRoutines((prev) =>
      prev.map((r) => (r.id === activeRoutine.id ? { ...r, exercises: newExercises } : r))
    );
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e2e2e2] flex flex-col pb-20 selection:bg-[#c3f400] selection:text-[#161e00]">
      {/* Hero Header */}
      <section className="relative w-full h-[38vh] min-h-[300px] flex items-end pb-8 border-b border-[#353535] pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-40 scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('${activeRoutine.bgImage}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/80 to-transparent" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-[#353535] text-white px-2 py-0.5 font-label-caps text-[10px] uppercase border border-[#353535]">
                {activeRoutine.category}
              </span>
              <span className="text-[#c3f400] font-label-caps text-[11px] uppercase flex items-center gap-1 font-bold">
                <span className="material-symbols-outlined text-sm">bolt</span>
                {activeRoutine.badge || 'High Intensity'}
              </span>
              <div className="bg-[#1f1f1f] border border-[#c3f400]/40 text-[#c3f400] font-label-caps text-[11px] px-2.5 py-0.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">timer</span>
                SESSION TIME: {formatTimer(workoutTimer)}
              </div>
            </div>
            <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
              {activeRoutine.title}
            </h1>
            <p className="font-body-md text-xs sm:text-sm text-[#c4c9ac] mt-1 max-w-xl">
              {activeRoutine.description}
            </p>
          </div>

          <div className="flex gap-4 glass-panel p-4 border border-[#353535]">
            <div className="flex flex-col items-end pr-4 border-r border-[#353535]">
              <span className="font-label-caps text-xs text-[#c4c9ac]">Target Duration</span>
              <span className="font-stat-value text-2xl text-[#c3f400] italic">
                {activeRoutine.durationMinutes}<span className="text-sm">m</span>
              </span>
            </div>
            <div className="flex flex-col items-end pl-2">
              <span className="font-label-caps text-xs text-[#c4c9ac]">Volume Intensity</span>
              <span className="font-stat-value text-2xl text-white italic">{activeRoutine.volume}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Progress Bar */}
      <div className="sticky top-20 z-40 bg-[#131313]/95 backdrop-blur-md border-b border-[#353535] py-3 px-4 sm:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <span className="font-label-caps text-xs text-[#c4c9ac] uppercase w-32 hidden sm:inline-block">
            Workout Progress
          </span>
          <div className="flex-grow h-2 bg-[#353535] relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-[#c3f400] neon-glow transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="font-stat-value text-lg font-black text-[#c3f400] italic">
              {progressPercentage}%
            </span>
            <button
              onClick={() => {
                setRestTimer(60);
                setShowRestModal(true);
              }}
              className="font-label-caps text-[10px] bg-[#353535] hover:bg-[#c3f400] hover:text-[#161e00] text-white px-2.5 py-1 uppercase flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xs">hourglass_empty</span>
              Rest Timer
            </button>
          </div>
        </div>
      </div>

      {/* Routine Canvas */}
      <section className="px-4 sm:px-8 py-10 max-w-5xl mx-auto w-full flex-grow">
        <div className="flex justify-between items-center mb-6 border-b border-[#353535] pb-2">
          <span className="font-label-caps text-xs text-[#c4c9ac] uppercase">
            EXERCISES ({activeRoutine.exercises.length}) • REORDER VIA DRAG
          </span>
          <button
            onClick={() => setShowAddExModal(true)}
            className="font-label-caps text-xs text-[#c3f400] hover:underline flex items-center gap-1 cursor-pointer font-bold"
          >
            <span className="material-symbols-outlined text-sm">add</span> Add Exercise
          </button>
        </div>

        {/* Exercises Reorder Group */}
        <Reorder.Group
          axis="y"
          values={activeRoutine.exercises}
          onReorder={handleReorderExercises}
          className="space-y-8"
        >
          {activeRoutine.exercises.map((exercise) => (
            <Reorder.Item key={exercise.id} value={exercise} className="cursor-grab active:cursor-grabbing select-none">
              <article className="bg-[#1b1b1b] border border-[#353535] p-6 flex flex-col gap-4 shadow-xl hover:border-[#c3f400]/30 transition-colors">
                <div className="flex justify-between items-start border-b border-[#353535] pb-3">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#c4c9ac] text-sm mt-1 cursor-grab" title="Drag exercise to reorder">
                      drag_indicator
                    </span>
                    <div>
                      <h2 className="font-headline text-xl sm:text-2xl uppercase italic font-bold text-white">
                        {exercise.name}
                      </h2>
                      <p className="font-body-md text-xs text-[#c4c9ac] mt-0.5">
                        {exercise.notes}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="block font-label-caps text-[10px] text-[#c3f400] uppercase">
                        Target
                      </span>
                      <span className="font-stat-value text-lg italic text-white">
                        {exercise.sets.length} Sets
                      </span>
                    </div>
                    <button
                      onClick={() => removeExerciseFromRoutine(activeRoutine.id, exercise.id)}
                      className="text-[#c4c9ac] hover:text-[#ffb4ab] p-1 cursor-pointer"
                      title="Delete Exercise"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>

                {/* Sets Grid */}
                <div className="overflow-x-auto">
                  <div className="min-w-[400px]">
                    <div className="grid grid-cols-[30px_1fr_1fr_60px_40px] gap-x-4 gap-y-3 items-center">
                      {/* Headers */}
                      <div className="font-label-caps text-[10px] text-[#c4c9ac] pb-1 border-b border-[#353535]">
                        Set
                      </div>
                      <div className="font-label-caps text-[10px] text-[#c4c9ac] pb-1 border-b border-[#353535]">
                        Lbs
                      </div>
                      <div className="font-label-caps text-[10px] text-[#c4c9ac] pb-1 border-b border-[#353535]">
                        Reps
                      </div>
                      <div className="font-label-caps text-[10px] text-[#c4c9ac] pb-1 border-b border-[#353535] text-center">
                        Done
                      </div>
                      <div className="font-label-caps text-[10px] text-[#c4c9ac] pb-1 border-b border-[#353535] text-center">
                        Opt
                      </div>

                      {/* Set Rows */}
                      {exercise.sets.map((set) => (
                        <React.Fragment key={set.id}>
                          <div
                            className={`font-stat-value text-base italic flex items-center ${
                              set.completed
                                ? 'text-[#c3f400]'
                                : 'text-[#c4c9ac]'
                            }`}
                          >
                            {set.setNumber}
                          </div>

                          <div>
                            <input
                              type="number"
                              value={set.weightLbs}
                              onChange={(e) =>
                                updateSetValues(
                                  activeRoutine.id,
                                  exercise.id,
                                  set.id,
                                  'weightLbs',
                                  e.target.value
                                )
                              }
                              placeholder="Weight"
                              className="bg-[#131313] border-b border-[#353535] focus:border-[#c3f400] w-full font-body-md text-sm text-white p-1.5 focus:outline-none focus:ring-0"
                            />
                          </div>

                          <div>
                            <input
                              type="number"
                              value={set.reps}
                              onChange={(e) =>
                                updateSetValues(
                                  activeRoutine.id,
                                  exercise.id,
                                  set.id,
                                  'reps',
                                  e.target.value
                                )
                              }
                              placeholder="Reps"
                              className="bg-[#131313] border-b border-[#353535] focus:border-[#c3f400] w-full font-body-md text-sm text-white p-1.5 focus:outline-none focus:ring-0"
                            />
                          </div>

                          <div className="text-center">
                            <input
                              type="checkbox"
                              checked={set.completed}
                              onChange={() =>
                                handleCheckboxClick(exercise.id, set.id, set.completed)
                              }
                              className="tactical-checkbox appearance-none w-6 h-6 border-2 border-[#353535] bg-[#131313] checked:bg-[#c3f400] checked:border-[#c3f400] cursor-pointer transition-colors relative after:content-[''] after:absolute after:hidden checked:after:block after:left-1.5 after:top-0.5 after:w-2 after:h-3.5 after:border-r-2 after:border-b-2 after:border-[#161e00] after:rotate-45"
                            />
                          </div>

                          <div className="text-center">
                            <button
                              type="button"
                              onClick={() => removeSetFromExercise(activeRoutine.id, exercise.id, set.id)}
                              className="text-[#c4c9ac] hover:text-[#ffb4ab] cursor-pointer"
                              title="Delete Set"
                            >
                              <span className="material-symbols-outlined text-xs">close</span>
                            </button>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-start">
                  <button
                    type="button"
                    onClick={() => addSetToExercise(activeRoutine.id, exercise.id)}
                    className="font-label-caps text-xs text-[#c3f400] border border-[#c3f400]/40 hover:bg-[#c3f400]/10 px-3 py-1.5 uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add Set
                  </button>
                </div>
              </article>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#353535] pt-8">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="font-label-caps text-xs text-[#c4c9ac] hover:text-white uppercase tracking-wider cursor-pointer"
          >
            ← Back to Dashboard
          </button>

          <button
            onClick={handleCompleteWorkout}
            className="w-full sm:w-auto bg-[#c3f400] text-[#161e00] font-headline text-lg py-4 px-8 uppercase italic font-black hover:bg-[#abd600] transition-colors flex items-center justify-center gap-2 neon-glow cursor-pointer"
          >
            Complete Workout <span className="material-symbols-outlined font-bold">check_circle</span>
          </button>
        </div>
      </section>

      {/* Add Exercise Modal */}
      {showAddExModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#1f1f1f] border border-[#353535] p-6 shadow-2xl">
            <h3 className="font-headline font-bold text-lg text-white uppercase italic mb-4">
              Add Exercise to Protocol
            </h3>
            <form onSubmit={handleAddExerciseSubmit} className="flex flex-col gap-4">
              <div>
                <label className="font-label-caps text-xs text-[#c4c9ac] uppercase block mb-1">
                  Exercise Name
                </label>
                <input
                  type="text"
                  value={newExName}
                  onChange={(e) => setNewExName(e.target.value)}
                  placeholder="e.g., Cable Flyes or Overhead Cable Extension"
                  className="w-full bg-[#131313] border border-[#353535] p-2.5 text-sm text-white focus:border-[#c3f400] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="font-label-caps text-xs text-[#c4c9ac] uppercase block mb-1">
                  Form Notes / Cue
                </label>
                <input
                  type="text"
                  value={newExNotes}
                  onChange={(e) => setNewExNotes(e.target.value)}
                  placeholder="e.g., Squeeze at peak contraction for 1 sec."
                  className="w-full bg-[#131313] border border-[#353535] p-2.5 text-sm text-white focus:border-[#c3f400] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddExModal(false)}
                  className="px-4 py-2 border border-[#353535] font-label-caps text-xs text-[#c4c9ac] uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#c3f400] text-[#161e00] font-label-caps text-xs font-bold uppercase"
                >
                  Add Exercise
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rest Timer Modal */}
      {showRestModal && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1f1f1f] border-2 border-[#c3f400] p-4 shadow-2xl flex items-center gap-4 max-w-xs animate-bounce">
          <div className="flex flex-col">
            <span className="font-label-caps text-[10px] text-[#c3f400] uppercase font-bold">
              REST INTERVAL ACTIVE
            </span>
            <span className="font-stat-value text-3xl text-white italic">
              {formatTimer(restTimer)}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setRestTimer((prev) => prev + 30)}
              className="font-label-caps text-[9px] bg-[#353535] text-white px-2 py-1 uppercase"
            >
              +30s
            </button>
            <button
              onClick={() => setShowRestModal(false)}
              className="font-label-caps text-[9px] bg-[#c3f400] text-[#161e00] px-2 py-1 uppercase font-bold"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#1a1a1a] border-2 border-[#c3f400] p-8 shadow-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 chart-gradient" />
            <span className="material-symbols-outlined text-6xl text-[#c3f400] mb-2 animate-pulse">
              workspace_premium
            </span>
            <h2 className="font-headline text-3xl font-black text-white italic uppercase tracking-tight">
              PROTOCOL COMPLETE!
            </h2>
            <p className="font-body-md text-sm text-[#c4c9ac] mt-2">
              Performance data synchronized to profile logs.
            </p>

            <div className="grid grid-cols-3 gap-4 my-6 bg-[#0e0e0e] p-4 border border-[#353535]">
              <div>
                <span className="font-label-caps text-[10px] text-[#c4c9ac] uppercase block">Time</span>
                <span className="font-stat-value text-xl text-[#c3f400] italic">{formatTimer(workoutTimer)}</span>
              </div>
              <div>
                <span className="font-label-caps text-[10px] text-[#c4c9ac] uppercase block">Sets Done</span>
                <span className="font-stat-value text-xl text-white italic">{completedSets}</span>
              </div>
              <div>
                <span className="font-label-caps text-[10px] text-[#c4c9ac] uppercase block">Total Volume</span>
                <span className="font-stat-value text-xl text-[#7df4ff] italic">{totalVolumeLbs.toLocaleString()} lbs</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowCompletionModal(false);
                setCurrentView('dashboard');
              }}
              className="w-full bg-[#c3f400] text-[#161e00] font-headline font-black py-4 uppercase italic tracking-wider text-lg neon-glow cursor-pointer"
            >
              RETURN TO DASHBOARD
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
