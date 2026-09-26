import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-wrap">
      <div className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">WORKOUT LIBRARY</p>
          <h1 className="display-font hero-title">TRAIN WITH INTENT.<br /><em>LOG EVERY SET.</em></h1>
          <p className="hero-copy-text">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <Link className="button-primary hero-cta" href="#library">
            <ArrowDownRight aria-hidden="true" size={18} /> Browse workouts
          </Link>
        </div>
        <div className="hero-visual">
          <Image
            alt="FitLog workout library banner"
            fill
            loading="eager"
            sizes="334px"
            src="/images/fitlog-banner.png"
          />
        </div>
      </div>
    </section>
  );
}
