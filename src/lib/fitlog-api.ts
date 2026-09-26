import type { Workout } from "@/types/fitlog";

const FITLOG_API_URL = "https://api.abcz.workers.dev/api/fitlog";

async function fetchFitLogJson(url: string): Promise<unknown> {
  const response = await fetch(url, { next: { revalidate: 3600 } });

  if (!response.ok) {
    throw new Error(`FitLog API request failed with status ${response.status}`);
  }

  return response.json();
}

function isWorkout(value: unknown): value is Workout {
  if (typeof value !== "object" || value === null) return false;

  const workout = value as Partial<Workout>;
  return (
    typeof workout.id === "number" &&
    typeof workout.name === "string" &&
    typeof workout.image === "string" &&
    Array.isArray(workout.muscleGroups) &&
    typeof workout.equipment === "string" &&
    typeof workout.difficulty === "string" &&
    typeof workout.duration === "number" &&
    typeof workout.caloriesBurned === "number" &&
    typeof workout.sets === "number" &&
    typeof workout.reps === "string" &&
    typeof workout.rating === "number" &&
    typeof workout.description === "string" &&
    Array.isArray(workout.instructions)
  );
}

function readWorkoutList(data: unknown): Workout[] {
  const list = Array.isArray(data)
    ? data
    : typeof data === "object" && data !== null && "value" in data
      ? data.value
      : null;

  return Array.isArray(list) ? list.filter(isWorkout) : [];
}

export async function getWorkouts(): Promise<Workout[]> {
  const data = await fetchFitLogJson(FITLOG_API_URL);
  return readWorkoutList(data);
}

export async function getWorkout(id: string): Promise<Workout | null> {
  const data = await fetchFitLogJson(`${FITLOG_API_URL}/${encodeURIComponent(id)}`);
  const workouts = readWorkoutList(data);

  if (workouts.length > 0) {
    return workouts.find((workout) => String(workout.id) === id) ?? null;
  }

  const value = typeof data === "object" && data !== null && "value" in data ? data.value : data;

  return isWorkout(value) ? value : null;
}
