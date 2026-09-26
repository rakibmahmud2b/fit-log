import WorkoutDetails from "@/components/workouts/WorkoutDetails";
import { notFound } from "next/navigation";
import { getWorkout } from "@/lib/fitlog-api";
import type { Workout } from "@/types/fitlog";

interface WorkoutPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = await params;
  let workout: Workout | null;

  try {
    workout = await getWorkout(id);
  } catch {
    notFound();
  }

  if (!workout) notFound();

  return <WorkoutDetails workout={workout} />;
}
