"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import EmptyPlan from "@/components/plan/EmptyPlan";
import PlanMetrics from "@/components/plan/PlanMetrics";
import PlanTabs from "@/components/plan/PlanTabs";
import PlanWorkoutCard from "@/components/plan/PlanWorkoutCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useFitLog } from "@/context/FitLogProvider";
import type { PlanTab, WorkoutSort } from "@/types/fitlog";

export default function PlanDashboard() {
  const { todayPlan, saved, doneIds, hydrated, markDone, removeWorkout } = useFitLog();
  const [activeTab, setActiveTab] = useState<PlanTab>("plan");
  const [sortBy, setSortBy] = useState<WorkoutSort>("duration");
  const isSavedTab = activeTab === "saved";
  const items = isSavedTab ? saved : todayPlan;
  const sortedItems = [...items].sort((first, second) => {
    if (sortBy === "calories") return second.caloriesBurned - first.caloriesBurned;
    if (sortBy === "rating") return second.rating - first.rating;
    return first.duration - second.duration;
  });

  return (
    <section className="plan-page mx-auto max-w-7xl px-6">
      <div className="plan-heading-row">
        <h1 className="display-font plan-title">MY PLAN</h1>
        <p className="plan-lede">Cap of five lifts for today. Finish them, then load more.</p>
      </div>
      <PlanMetrics workouts={todayPlan} />
      <div className="plan-toolbar">
        <PlanTabs activeTab={activeTab} onChange={setActiveTab} />
        <div className="plan-list-tools">
          <label className="sort-control">
            <span className="plan-sort-label">Sort By</span>
            <select
              aria-label="Sort workouts"
              onChange={(event) => {
                const value = event.target.value;
                if (value === "duration" || value === "calories" || value === "rating") setSortBy(value);
              }}
              value={sortBy}
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown aria-hidden="true" size={15} />
          </label>
        </div>
      </div>
      {!hydrated ? (
        <LoadingSpinner label="Loading workouts..." />
      ) : (
        <>
          {sortedItems.length === 0 ? (
            <EmptyPlan saved={isSavedTab} />
          ) : (
            <div className="plan-list">
              {sortedItems.map((workout) => (
                <PlanWorkoutCard
                  done={doneIds.includes(workout.id)}
                  key={workout.id}
                  onDone={() => markDone(workout.id)}
                  onRemove={() => removeWorkout(workout.id, isSavedTab ? "saved" : "todayPlan")}
                  saved={isSavedTab}
                  workout={workout}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}