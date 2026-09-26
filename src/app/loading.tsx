export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-5 text-white">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />

        <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
          Loading FITLOG
        </p>
      </div>
    </main>
  );
}