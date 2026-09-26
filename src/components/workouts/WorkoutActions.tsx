"use client";

import { Bookmark, Check, Plus } from "lucide-react";
import { useFitLog } from "@/context/FitLogProvider";
import type { Workout } from "@/types/fitlog";

export default function WorkoutActions({ workout }: { workout: Workout }) {
  const { todayPlan, saved, addToPlan, saveWorkout } = useFitLog();
  const isPlanned = todayPlan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);
  const planIsFull = todayPlan.length >= 5;

  return (
    <div className="detail-actions">
      <button
        className="button-primary"
        disabled={isPlanned || (planIsFull && !isPlanned)}
        onClick={() => addToPlan(workout)}
        type="button"
      >
        {isPlanned ? <Check aria-hidden="true" size={17} /> : <Plus aria-hidden="true" size={17} />}
        {isPlanned ? "In today's plan" : "Add to today's plan"}
      </button>
      <button className="button-secondary" disabled={isSaved} onClick={() => saveWorkout(workout)} type="button">
        <Bookmark aria-hidden="true" size={16} /> {isSaved ? "Saved for later" : "Save for later"}
      </button>
    </div>
  );
}
