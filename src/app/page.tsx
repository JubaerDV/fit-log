"use client";

import { useEffect, useState } from "react";

import Hero from "@/components/Hero/Hero";
import WorkoutCard from "@/components/WorkoutCard/WorkoutCard";
import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/types/workout";

type SortOption =
  | "default"
  | "duration-asc"
  | "calories-asc"
  | "rating-desc";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState("");

  const [sortOption, setSortOption] =
    useState<SortOption>("default");

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } catch {
        setError("Unable to load workouts. Please try again.");
      }
    };

    loadWorkouts();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortOption === "duration-asc") {
      return a.duration - b.duration;
    }

    if (sortOption === "calories-asc") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    if (sortOption === "rating-desc") {
      return b.rating - a.rating;
    }

    return 0;
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />

      <section
        id="library"
        className="bg-black px-4 py-12 sm:px-5 sm:py-14 md:px-8 md:py-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 md:mb-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 sm:text-sm">
              Explore Exercises
            </p>

            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                  The Library
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-400 sm:text-base">
                  Choose from our collection of workouts and build your
                  training plan one exercise at a time.
                </p>
              </div>

              <div className="w-full md:w-64">
                <label
                  htmlFor="sort"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-400 sm:text-sm"
                >
                  Sort Workouts
                </label>

                <select
                  id="sort"
                  value={sortOption}
                  onChange={(event) =>
                    setSortOption(
                      event.target.value as SortOption
                    )
                  }
                  className="w-full rounded-xl border border-gray-700 bg-[#151515] px-4 py-3 text-sm font-bold text-white outline-none transition focus:border-[#ccff00]"
                >
                  <option value="default">Default</option>
                  <option value="duration-asc">
                    Duration: Low → High
                  </option>
                  <option value="calories-asc">
                    Calories: Low → High
                  </option>
                  <option value="rating-desc">
                    Rating: High → Low
                  </option>
                </select>
              </div>
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-500/20 bg-[#111111] px-5 py-16 text-center">
              <p className="text-lg font-bold text-red-400">
                {error}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Please refresh the page and try again.
              </p>
            </div>
          ) : sortedWorkouts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {sortedWorkouts.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-700 bg-[#111111] px-5 py-16 text-center">
              <p className="text-lg font-bold text-gray-400">
                Loading workouts...
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}