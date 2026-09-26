import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase">404</p>
      <h1 className="mt-3 text-4xl font-bold">Workout not found</h1>
      <p className="mt-3">That page or workout does not exist.</p>
      <Link className="mt-6 underline" href="/">
        Back to workouts
      </Link>
    </section>
  );
}
