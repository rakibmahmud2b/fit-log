"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const footerVariant = pathname === "/my-plan" ? "site-footer--plan" : pathname.startsWith("/workouts/") ? "site-footer--detail" : "";

  return (
    <footer className={`site-footer ${footerVariant} px-6`}>
      <div className="footer-inner mx-auto max-w-7xl">
        <p className="brand-lockup"><Image alt="" className="brand-mark-image" height={35} src="/images/fitlog-logo.png" width={35} /><span>FITLOG</span></p>
        <p className="footer-copy">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
