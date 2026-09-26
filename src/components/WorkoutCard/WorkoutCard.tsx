import Image from "next/image";
import Link from "next/link";

import type { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  return (
    <Link
      href={`/details/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-lg transition duration-300 hover:-translate-y-1 hover:border-white/20"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0b0b0b]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <h2 className="text-xl font-black uppercase text-white">
          {workout.name}
        </h2>

        <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Full Body
        </p>

        <div className="mt-5 grid grid-cols-3 border-t border-white/5 pt-4">
          <span className="flex items-center justify-center gap-1.5 border-r border-white/5 text-xs font-bold text-gray-300">
            <span className="text-sm text-gray-300">◷</span>
            {workout.duration} min
          </span>

          <span className="flex items-center justify-center gap-1.5 border-r border-white/5 text-xs font-bold text-gray-300">
            <span className="text-sm text-gray-300">◉</span>
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center justify-center gap-1.5 text-xs font-bold text-gray-300">
            <span className="text-sm text-gray-300">★</span>
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}