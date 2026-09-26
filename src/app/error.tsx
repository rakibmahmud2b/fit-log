"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="error-page mx-auto max-w-7xl px-6">
      <p className="eyebrow">Something went wrong</p>
      <h1>We lost the rep.</h1>
      <p>The workout data could not be loaded right now.</p>
      <button className="button-primary" onClick={() => reset()} type="button">Try again</button>
    </section>
  );
}