import type { Workout } from "@/types/fitlog";

const metricLabels = ["Exercises", "Minutes", "Calories"];

interface PlanMetricsProps {
  workouts: Workout[];
}

export default function PlanMetrics({ workouts }: PlanMetricsProps) {
  const values = [
    workouts.length,
    workouts.reduce((total, workout) => total + workout.duration, 0),
    workouts.reduce((total, workout) => total + workout.caloriesBurned, 0),
  ];

  return (
    <div className="metrics-grid">
      {metricLabels.map((metric, index) => (
        <div className="metric-tile" key={metric}>
          <p className="metric-label">{metric}</p>
          <p className="metric-value">{values[index]}</p>
        </div>
      ))}
    </div>
  );
}
