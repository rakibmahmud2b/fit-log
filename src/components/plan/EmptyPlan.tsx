import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function EmptyPlan({ saved = false }) {
  return (
    <div className="empty-state">
      <h2>{saved ? "NO SAVED LIFTS" : "NOTHING HERE YET"}</h2>
      <p>{saved ? "Save a movement from the library and it will be waiting here." : "Browse the library and add a lift to get today moving."}</p>
      <Link className="button-primary" href="/#library">
        Go to workouts <ArrowUpRight aria-hidden="true" size={16} />
      </Link>
    </div>
  );
}
