import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-5 text-white">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#111111] p-8 text-center shadow-2xl md:p-12">
        <div className="text-7xl font-black text-[#ccff00]">
          404
        </div>

        <h1 className="mt-5 text-3xl font-black uppercase text-white">
          Workout Not Found
        </h1>

        <p className="mt-4 leading-7 text-gray-400">
          The workout or page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-white"
        >
          Back to Workouts
        </Link>
      </div>
    </main>
  );
}