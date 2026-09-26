import Image from "next/image";
import Link from "next/link";
import { Check, ExternalLink, Flame, Star, X } from "lucide-react";
import type { Workout } from "@/types/fitlog";

interface PlanWorkoutCardProps {
  workout: Workout;
  done: boolean;
  saved: boolean;
  onDone: () => void;
  onRemove: () => void;
}

export default function PlanWorkoutCard({ workout, done, saved, onDone, onRemove }: PlanWorkoutCardProps) {
  return (
    <article className="plan-card">
      <div className="plan-card-image">
        <Image alt={`${workout.name} thumbnail`} fill sizes="118px" src={workout.image} />
      </div>
      <div>
        <h3 className="plan-card-title">{workout.name}</h3>
        <p className="equipment-line">{workout.equipment}</p>
        <div className="stats-row">
          <span className="stat-item"><span>{workout.duration} min</span></span>
          <span className="stat-item"><Flame aria-hidden="true" size={13} />{workout.caloriesBurned} kcal</span>
          <span className="stat-item"><Star aria-hidden="true" size={13} />{workout.rating.toFixed(1)}</span>
        </div>
        {done && <p className="plan-card-done">Completed for today</p>}
      </div>
      <div className="plan-card-actions">
        <Link aria-label={`View ${workout.name} details`} className="button-quiet plan-detail-button" href={`/workouts/${workout.id}`}>
          <ExternalLink aria-hidden="true" size={14} /> View Details
        </Link>
        {!saved && (
          <button aria-label={done ? `${workout.name} is done` : `Mark ${workout.name} as done`} className="button-quiet plan-done-button" disabled={done} onClick={onDone} type="button">
            <Check aria-hidden="true" size={14} /> {done ? "Done" : "Mark as Done"}
          </button>
        )}
        <button aria-label={`Remove ${workout.name}`} className="icon-button" onClick={onRemove} title={saved ? "Remove saved workout" : "Remove from plan"} type="button">
          <X aria-hidden="true" size={17} />
        </button>
      </div>
    </article>
  );
}
