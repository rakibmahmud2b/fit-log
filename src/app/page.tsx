import Hero from "@/components/workouts/Hero";
import WorkoutLibrary from "@/components/workouts/WorkoutLibrary";
import { getWorkouts } from "@/lib/fitlog-api";
import type { Workout } from "@/types/fitlog";

export default async function Home() {
  let workouts: Workout[] = [];
  let hasError = false;

  try {
    workouts = await getWorkouts();
  } catch {
    hasError = true;
  }

  return (
    <>
      <Hero />
      <WorkoutLibrary hasError={hasError} workouts={workouts} />
    </>
  );
}
