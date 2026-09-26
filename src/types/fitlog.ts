export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export interface FitLogState {
  todayPlan: Workout[];
  saved: Workout[];
  doneIds: number[];
}

export type PlanCollection = "todayPlan" | "saved";
export type PlanTab = "plan" | "saved";
export type WorkoutSort = "duration" | "calories" | "rating";
export type ToastKind = "success" | "info" | "error";

export interface ToastNotification {
  id: number;
  message: string;
  type: ToastKind;
}

export interface ToastContextValue {
  showToast: (message: string, type?: ToastKind) => void;
}

export interface FitLogContextValue extends FitLogState {
  hydrated: boolean;
  addToPlan: (workout: Workout) => boolean;
  saveWorkout: (workout: Workout) => boolean;
  removeWorkout: (id: number, collection?: PlanCollection) => void;
  markDone: (id: number) => void;
}