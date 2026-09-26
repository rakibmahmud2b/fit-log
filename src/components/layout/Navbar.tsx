"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bookmark } from "lucide-react";
import { useFitLog } from "@/context/FitLogProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, saved } = useFitLog();

  return (
    <header className={`site-header${pathname === "/my-plan" ? " site-header--compact" : ""}`}>
      <nav aria-label="Main navigation" className="nav-wrap mx-auto max-w-7xl px-6">
        <Link aria-label="FitLog home" className="brand-lockup" href="/">
          <Image alt="" className="brand-mark-image" height={35} src="/images/fitlog-logo.png" width={35} />
          <span>FITLOG</span>
        </Link>
        <div className="nav-main">
          <Link aria-current={pathname === "/" ? "page" : undefined} className="nav-link" href="/#library">
            Workout
          </Link>
          <Link aria-current={pathname === "/my-plan" ? "page" : undefined} className="nav-link" href="/my-plan">
            My Plan
          </Link>
        </div>
        <div className="nav-status">
          <Link aria-label={`Today's plan, ${todayPlan.length} exercises`} className="count-badge count-badge--plan" href="/my-plan">
            <span>Plan</span><span className="count-number">{todayPlan.length}</span>
          </Link>
          <Link aria-label={`Saved workouts, ${saved.length} exercises`} className="count-badge count-badge--saved" href="/my-plan">
            <Bookmark aria-hidden="true" size={14} /><span>Saved</span><span className="count-number">{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
