import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import type { Workout } from "@/types/fitlog";

interface WorkoutCardProps {
  workout: Workout;
  index?: number;
}

export default function WorkoutCard({ workout, index = 0 }: WorkoutCardProps) {
  return (
    <Link aria-label={`View details for ${workout.name}`} className="workout-card" href={`/workouts/${workout.id}`}>
      <div className="workout-card-image">
        <Image
          alt={`${workout.name} illustration`}
          fill
          loading={index < 3 ? "eager" : "lazy"}
          sizes="(max-width: 640px) 48vw, (max-width: 900px) 48vw, 32vw"
          src={workout.image}
        />
      </div>
      <div className="workout-card-body">
        <div className="muscle-tags">
          {workout.muscleGroups.slice(0, 2).map((group) => (
            <span className="tag-pill" key={group}>{group}</span>
          ))}
        </div>
        <h3 className="workout-card-title">{workout.name}</h3>
        <p className="equipment-line">{workout.equipment}</p>
        <div aria-label={`${workout.duration} minutes, ${workout.caloriesBurned} calories, rated ${workout.rating}`} className="stats-row">
          <span className="stat-item"><Clock3 aria-hidden="true" size={14} />{workout.duration} min</span>
          <span className="stat-item"><Flame aria-hidden="true" size={14} />{workout.caloriesBurned} kcal</span>
          <span className="stat-item"><Star aria-hidden="true" size={14} />{workout.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
