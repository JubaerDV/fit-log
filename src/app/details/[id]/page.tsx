import Image from "next/image";
import Link from "next/link";

import AddToPlanButton from "@/components/WorkoutCard/AddToPlanButton";
import SaveForLaterButton from "@/components/WorkoutCard/SaveForLaterButton";
import { getWorkout } from "@/lib/api";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;

  const workout = await getWorkout(Number(id));

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-5 md:px-8 md:py-14">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-gray-400 transition hover:text-[#ccff00]"
        >
          ← Back to Workouts
        </Link>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-2xl">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[320px] bg-[#0b0b0b] sm:min-h-[450px] md:min-h-[650px]">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col p-5 sm:p-7 md:p-10">
              <h1 className="text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                {workout.name}
              </h1>

              <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                {workout.description}
              </p>

              <div className="mt-7">
                <h2 className="text-xs font-black uppercase tracking-[0.15em] text-gray-500">
                  Muscle Groups
                </h2>

                <div className="mt-3 flex flex-wrap gap-2">
                  {workout.muscleGroups.map((muscle) => (
                    <span
                      key={muscle}
                      className="rounded-lg bg-[#ccff00] px-3 py-2 text-sm font-semibold text-black"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-4 border-y border-white/10 py-6 sm:grid-cols-4">
                <div>
                  <p className="text-xs font-bold uppercase text-gray-500">
                    Duration
                  </p>

                  <p className="mt-1 font-black text-white">
                    {workout.duration} min
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase text-gray-500">
                    Calories
                  </p>

                  <p className="mt-1 font-black text-white">
                    {workout.caloriesBurned} kcal
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase text-gray-500">
                    Sets
                  </p>

                  <p className="mt-1 font-black text-white">
                    {workout.sets}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase text-gray-500">
                    Reps
                  </p>

                  <p className="mt-1 font-black text-white">
                    {workout.reps}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase text-gray-500">
                  Equipment
                </p>

                <p className="mt-1 font-bold text-gray-200">
                  {workout.equipment}
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <AddToPlanButton workout={workout} />

                <SaveForLaterButton workout={workout} />
              </div>

              <div className="mt-8 border-t border-white/10 pt-7">
                <h2 className="text-2xl font-black uppercase text-white">
                  Instructions
                </h2>

                <ol className="mt-5 space-y-4">
                  {workout.instructions.map(
                    (instruction, index) => (
                      <li
                        key={instruction}
                        className="flex gap-4"
                      >
                        <span className="shrink-0 pt-1 text-sm font-black text-white">
                          {index + 1}.
                        </span>

                        <p className="text-sm leading-6 text-gray-400">
                          {instruction}
                        </p>
                      </li>
                    )
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}