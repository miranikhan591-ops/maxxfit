export type ViewState = 'home' | 'dashboard' | 'programs' | 'routine_detail' | 'login' | 'calendar';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  caloriesBurned: number;
  workoutStreak: number;
  activeMinutesWeek: number;
  membershipStatus: 'Active Protocol' | 'Elite Member' | 'Trial';
}

export interface ExerciseSet {
  id: string;
  setNumber: number;
  weightLbs: number | string;
  reps: number | string;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  notes?: string;
  targetSets: number;
  sets: ExerciseSet[];
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  category: string;
  weekInfo?: string;
  description: string;
  bgImage: string;
  badge?: 'Active Program' | 'On Deck' | 'High Intensity' | 'Powerlifting' | 'Recovery' | 'Strength';
  badgeType?: 'primary' | 'secondary' | 'cyan';
  durationMinutes: number;
  volume: 'High' | 'Medium' | 'Low' | 'Maxx';
  exercises: Exercise[];
}

export interface ScheduleItem {
  id: string;
  timeLabel: string; // e.g. "Today • 18:00"
  title: string; // e.g. "UPPER BODY POWER"
  subtitle: string; // e.g. "Zone 2 • 45 Min"
  isNext?: boolean;
  routineId?: string;
  type?: 'Workout' | 'Recovery' | 'Mobility' | 'HIIT' | 'Powerlifting' | 'Strength';
}

export interface WorkoutHistoryLog {
  id: string;
  routineTitle: string;
  completedAt: string;
  durationMinutes: number;
  setsCompleted: number;
  totalVolumeLbs: number;
  caloriesEarned: number;
}
