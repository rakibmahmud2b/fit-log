import Image from "next/image";
import { Clock3, Flame, Star } from "lucide-react";
import type { ReactNode } from "react";
import WorkoutActions from "@/components/workouts/WorkoutActions";
import type { Workout } from "@/types/fitlog";

export default function WorkoutDetails({ workout }: { workout: Workout }) {
  return (
    <section className="detail-layout mx-auto max-w-7xl px-6">
      <div className="detail-media-sticky">
        <div className="detail-media">
          <Image alt={`${workout.name} exercise demonstration`} fill loading="eager" sizes="(max-width: 640px) 100vw, 48vw" src={workout.image} />
        </div>
      </div>
      <div className="detail-copy">
        <h1 className="display-font detail-title">{workout.name}</h1>
        <p className="detail-description">{workout.description}</p>
        <div className="muscle-tags">
          {workout.muscleGroups.map((group) => <span className="tag-pill" key={group}>{group}</span>)}
        </div>

        <h2 className="detail-section-title">KEY SPECS</h2>
        <div className="spec-grid">
          <Spec label="Equipment" value={workout.equipment} />
          <Spec label="Difficulty" value={workout.difficulty} />
          <Spec label="Sets" value={`${workout.sets} sets`} />
          <Spec label="Reps" value={workout.reps} />
          <Spec label="Duration" value={<><Clock3 aria-hidden="true" size={15} /> {workout.duration} min</>} />
          <Spec label="Calories" value={<><Flame aria-hidden="true" size={15} /> {workout.caloriesBurned} kcal</>} />
          <Spec label="Rating" value={<><Star aria-hidden="true" size={15} /> {workout.rating.toFixed(1)}</>} />
        </div>

        <h2 className="detail-section-title">INSTRUCTIONS</h2>
        <ol className="instruction-list">
          {workout.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}
        </ol>
        <WorkoutActions workout={workout} />
      </div>
    </section>
  );
}

interface SpecProps {
  label: string;
  value: ReactNode;
}

function Spec({ label, value }: SpecProps) {
  return (
    <div className="spec-cell">
      <p className="spec-label">{label}</p>
      <p className="spec-value flex items-center gap-2">{value}</p>
    </div>
  );
}
