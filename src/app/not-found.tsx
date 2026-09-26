import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
      <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm md:p-12">
        <div className="text-7xl font-black text-[#ccff00]">
          404
        </div>

        <h1 className="mt-5 text-3xl font-black uppercase text-gray-900">
          Workout Not Found
        </h1>

        <p className="mt-4 leading-7 text-gray-500">
          The workout or page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-lg bg-black px-6 py-3 text-sm font-black uppercase text-white transition hover:bg-[#ccff00] hover:text-black"
        >
          Back to Workouts
        </Link>
      </div>
    </main>
  );
}