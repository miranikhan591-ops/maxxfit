import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ViewState, UserProfile, WorkoutRoutine, ScheduleItem, WorkoutHistoryLog } from '../types';
import { INITIAL_USER, INITIAL_ROUTINES, INITIAL_SCHEDULE } from '../data/initialData';

interface AppContextType {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  routines: WorkoutRoutine[];
  setRoutines: React.Dispatch<React.SetStateAction<WorkoutRoutine[]>>;
  schedule: ScheduleItem[];
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleItem[]>>;
  activeRoutineId: string;
  setActiveRoutineId: (id: string) => void;
  activeRoutine: WorkoutRoutine | null;
  historyLogs: WorkoutHistoryLog[];
  // Actions
  login: (email: string, name?: string) => void;
  logout: () => void;
  toggleSetCompleted: (routineId: string, exerciseId: string, setId: string) => void;
  updateSetValues: (routineId: string, exerciseId: string, setId: string, field: 'weightLbs' | 'reps', value: number | string) => void;
  addSetToExercise: (routineId: string, exerciseId: string) => void;
  removeSetFromExercise: (routineId: string, exerciseId: string, setId: string) => void;
  addExerciseToRoutine: (routineId: string, name: string, notes?: string) => void;
  removeExerciseFromRoutine: (routineId: string, exerciseId: string) => void;
  addNewRoutine: (routine: Omit<WorkoutRoutine, 'id'>) => string;
  completeWorkout: (routineId: string) => void;
  addScheduleItem: (item: Omit<ScheduleItem, 'id'>) => void;
  deleteScheduleItem: (id: string) => void;
  resetToDefaults: () => void;
  isLoggedIn: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_USER = 'maxxfit_user_v1';
const LOCAL_STORAGE_KEY_ROUTINES = 'maxxfit_routines_v1';
const LOCAL_STORAGE_KEY_SCHEDULE = 'maxxfit_schedule_v1';
const LOCAL_STORAGE_KEY_ACTIVE_ROUTINE = 'maxxfit_active_routine_v1';
const LOCAL_STORAGE_KEY_LOGS = 'maxxfit_history_logs_v1';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [routines, setRoutines] = useState<WorkoutRoutine[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ROUTINES);
      return saved ? JSON.parse(saved) : INITIAL_ROUTINES;
    } catch {
      return INITIAL_ROUTINES;
    }
  });

  const [schedule, setSchedule] = useState<ScheduleItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SCHEDULE);
      return saved ? JSON.parse(saved) : INITIAL_SCHEDULE;
    } catch {
      return INITIAL_SCHEDULE;
    }
  });

  const [activeRoutineId, setActiveRoutineId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ACTIVE_ROUTINE);
      return saved || 'rtn_chest_triceps';
    } catch {
      return 'rtn_chest_triceps';
    }
  });

  const [historyLogs, setHistoryLogs] = useState<WorkoutHistoryLog[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_LOGS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'log_1',
          routineTitle: 'Summer Shred',
          completedAt: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
          durationMinutes: 45,
          setsCompleted: 12,
          totalVolumeLbs: 8400,
          caloriesEarned: 520,
        },
        {
          id: 'log_2',
          routineTitle: 'Chest & Triceps Power',
          completedAt: new Date(Date.now() - 86400000 * 4).toLocaleDateString(),
          durationMinutes: 58,
          setsCompleted: 14,
          totalVolumeLbs: 14200,
          caloriesEarned: 640,
        },
      ];
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_ROUTINES, JSON.stringify(routines));
  }, [routines]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_SCHEDULE, JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_ACTIVE_ROUTINE, activeRoutineId);
  }, [activeRoutineId]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_LOGS, JSON.stringify(historyLogs));
  }, [historyLogs]);

  // Real-time multi-tab synchronization listener
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY_ROUTINES && e.newValue) {
        setRoutines(JSON.parse(e.newValue));
      }
      if (e.key === LOCAL_STORAGE_KEY_SCHEDULE && e.newValue) {
        setSchedule(JSON.parse(e.newValue));
      }
      if (e.key === LOCAL_STORAGE_KEY_USER && e.newValue) {
        setUser(JSON.parse(e.newValue));
      }
      if (e.key === LOCAL_STORAGE_KEY_ACTIVE_ROUTINE && e.newValue) {
        setActiveRoutineId(e.newValue);
      }
      if (e.key === LOCAL_STORAGE_KEY_LOGS && e.newValue) {
        setHistoryLogs(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const activeRoutine = routines.find((r) => r.id === activeRoutineId) || routines[0] || null;

  const login = (email: string, name?: string) => {
    const extractedName = name || (email.includes('@') ? email.split('@')[0] : 'Athlete');
    const formattedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
    
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: formattedName,
      email,
      caloriesBurned: 2450,
      workoutStreak: 12,
      activeMinutesWeek: 340,
      membershipStatus: 'Active Protocol',
    };
    setUser(newUser);
    setCurrentView('dashboard');
  };

  const logout = () => {
    setUser(null);
    setCurrentView('login');
  };

  const toggleSetCompleted = (routineId: string, exerciseId: string, setId: string) => {
    setRoutines((prev) =>
      prev.map((routine) => {
        if (routine.id !== routineId) return routine;
        return {
          ...routine,
          exercises: routine.exercises.map((ex) => {
            if (ex.id !== exerciseId) return ex;
            return {
              ...ex,
              sets: ex.sets.map((st) => (st.id === setId ? { ...st, completed: !st.completed } : st)),
            };
          }),
        };
      })
    );
  };

  const updateSetValues = (
    routineId: string,
    exerciseId: string,
    setId: string,
    field: 'weightLbs' | 'reps',
    value: number | string
  ) => {
    setRoutines((prev) =>
      prev.map((routine) => {
        if (routine.id !== routineId) return routine;
        return {
          ...routine,
          exercises: routine.exercises.map((ex) => {
            if (ex.id !== exerciseId) return ex;
            return {
              ...ex,
              sets: ex.sets.map((st) => (st.id === setId ? { ...st, [field]: value } : st)),
            };
          }),
        };
      })
    );
  };

  const addSetToExercise = (routineId: string, exerciseId: string) => {
    setRoutines((prev) =>
      prev.map((routine) => {
        if (routine.id !== routineId) return routine;
        return {
          ...routine,
          exercises: routine.exercises.map((ex) => {
            if (ex.id !== exerciseId) return ex;
            const nextSetNum = ex.sets.length + 1;
            const lastSet = ex.sets[ex.sets.length - 1];
            const newSet = {
              id: `set_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
              setNumber: nextSetNum,
              weightLbs: lastSet ? lastSet.weightLbs : 135,
              reps: lastSet ? lastSet.reps : 10,
              completed: false,
            };
            return {
              ...ex,
              targetSets: ex.targetSets + 1,
              sets: [...ex.sets, newSet],
            };
          }),
        };
      })
    );
  };

  const removeSetFromExercise = (routineId: string, exerciseId: string, setId: string) => {
    setRoutines((prev) =>
      prev.map((routine) => {
        if (routine.id !== routineId) return routine;
        return {
          ...routine,
          exercises: routine.exercises.map((ex) => {
            if (ex.id !== exerciseId) return ex;
            const updatedSets = ex.sets
              .filter((st) => st.id !== setId)
              .map((st, idx) => ({ ...st, setNumber: idx + 1 }));
            return {
              ...ex,
              targetSets: updatedSets.length,
              sets: updatedSets,
            };
          }),
        };
      })
    );
  };

  const addExerciseToRoutine = (routineId: string, name: string, notes?: string) => {
    setRoutines((prev) =>
      prev.map((routine) => {
        if (routine.id !== routineId) return routine;
        const newExercise = {
          id: `ex_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          name,
          notes: notes || 'Maintain strict form.',
          targetSets: 3,
          sets: [
            { id: `set_${Date.now()}_1`, setNumber: 1, weightLbs: 100, reps: 10, completed: false },
            { id: `set_${Date.now()}_2`, setNumber: 2, weightLbs: 100, reps: 10, completed: false },
            { id: `set_${Date.now()}_3`, setNumber: 3, weightLbs: 100, reps: 10, completed: false },
          ],
        };
        return {
          ...routine,
          exercises: [...routine.exercises, newExercise],
        };
      })
    );
  };

  const removeExerciseFromRoutine = (routineId: string, exerciseId: string) => {
    setRoutines((prev) =>
      prev.map((routine) => {
        if (routine.id !== routineId) return routine;
        return {
          ...routine,
          exercises: routine.exercises.filter((ex) => ex.id !== exerciseId),
        };
      })
    );
  };

  const addNewRoutine = (newRtn: Omit<WorkoutRoutine, 'id'>) => {
    const newId = `rtn_${Date.now()}`;
    const fullRoutine: WorkoutRoutine = {
      ...newRtn,
      id: newId,
    };
    setRoutines((prev) => [fullRoutine, ...prev]);
    return newId;
  };

  const completeWorkout = (routineId: string) => {
    const routine = routines.find((r) => r.id === routineId);
    if (!routine) return;

    let totalVolume = 0;
    let completedSetsCount = 0;

    routine.exercises.forEach((ex) => {
      ex.sets.forEach((st) => {
        if (st.completed) {
          completedSetsCount++;
          const wt = typeof st.weightLbs === 'number' ? st.weightLbs : parseFloat(st.weightLbs) || 0;
          const rp = typeof st.reps === 'number' ? st.reps : parseFloat(st.reps) || 0;
          totalVolume += wt * rp;
        }
      });
    });

    const caloriesEarned = Math.round(routine.durationMinutes * 9.5 + (completedSetsCount * 15));

    // Update user stats
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        caloriesBurned: prev.caloriesBurned + caloriesEarned,
        workoutStreak: prev.workoutStreak + 1,
        activeMinutesWeek: prev.activeMinutesWeek + routine.durationMinutes,
      };
    });

    // Create log
    const newLog: WorkoutHistoryLog = {
      id: `log_${Date.now()}`,
      routineTitle: routine.title,
      completedAt: new Date().toLocaleDateString(),
      durationMinutes: routine.durationMinutes,
      setsCompleted: completedSetsCount,
      totalVolumeLbs: totalVolume,
      caloriesEarned,
    };

    setHistoryLogs((prev) => [newLog, ...prev]);
  };

  const addScheduleItem = (item: Omit<ScheduleItem, 'id'>) => {
    const newItem: ScheduleItem = {
      ...item,
      id: `sch_${Date.now()}`,
    };
    setSchedule((prev) => [newItem, ...prev]);
  };

  const deleteScheduleItem = (id: string) => {
    setSchedule((prev) => prev.filter((s) => s.id !== id));
  };

  const resetToDefaults = () => {
    setUser(INITIAL_USER);
    setRoutines(INITIAL_ROUTINES);
    setSchedule(INITIAL_SCHEDULE);
    setActiveRoutineId('rtn_chest_triceps');
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        user,
        setUser,
        routines,
        setRoutines,
        schedule,
        setSchedule,
        activeRoutineId,
        setActiveRoutineId,
        activeRoutine,
        historyLogs,
        login,
        logout,
        toggleSetCompleted,
        updateSetValues,
        addSetToExercise,
        removeSetFromExercise,
        addExerciseToRoutine,
        removeExerciseFromRoutine,
        addNewRoutine,
        completeWorkout,
        addScheduleItem,
        deleteScheduleItem,
        resetToDefaults,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
