import WorkoutCard from "@/components/workouts/WorkoutCard";
import type { Workout } from "@/types/fitlog";

interface WorkoutLibraryProps {
  workouts: Workout[];
  hasError: boolean;
}

export default function WorkoutLibrary({ workouts, hasError }: WorkoutLibraryProps) {
  return (
    <section className="section-rule" id="library">
      <div className="library-section mx-auto max-w-7xl px-6">
        <div className="section-heading-row">
          <h2 className="display-font section-title">THE LIBRARY</h2>
          <p className="section-subtitle">Twelve lifts covering every major muscle group.</p>
        </div>
        <div className="workout-grid">
          {workouts.map((workout, index) => (
            <WorkoutCard index={index} key={workout.id} workout={workout} />
          ))}
          {hasError && <p className="load-error">We couldn&apos;t load the workout library. Try refreshing the page.</p>}
          {!hasError && workouts.length === 0 && <p className="empty-results">No workouts are available right now.</p>}
        </div>
      </div>
    </section>
  );
}
