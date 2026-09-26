"use client";

import { useEffect, useState } from "react";

import Hero from "@/components/Hero/Hero";
import WorkoutCard from "@/components/WorkoutCard/WorkoutCard";
import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/types/workout";

type SortOption = "duration" | "calories" | "rating";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] =
    useState<SortOption>("duration");

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

  const filteredWorkouts = workouts.filter((workout) => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return true;
    }

    const nameMatch = workout.name
      .toLowerCase()
      .includes(query);

    const equipmentMatch = workout.equipment
      .toLowerCase()
      .includes(query);

    const muscleMatch = workout.muscleGroups.some((muscle) =>
      muscle.toLowerCase().includes(query)
    );

    return nameMatch || equipmentMatch || muscleMatch;
  });

  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
    if (sortOption === "duration") {
      return a.duration - b.duration;
    }

    if (sortOption === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    return b.rating - a.rating;
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-3 sm:px-5 md:px-8">
        <div className="overflow-hidden rounded-b-3xl bg-black">
          <Hero />
        </div>
      </section>

      <div className="h-5 bg-black sm:h-6" />

      <section className="bg-black px-3 sm:px-5 md:px-8">
        <div
          id="library"
          className="min-h-screen rounded-3xl bg-black px-4 py-12 sm:px-6 sm:py-14 md:px-10 md:py-16 lg:px-12"
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
                    Twelve lifts covering every major muscle group.
                  </p>
                </div>

                <div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto">
                  <div className="w-full sm:w-72">
                    <label
                      htmlFor="search"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-400 sm:text-sm"
                    >
                      Search
                    </label>

                    <input
                      id="search"
                      type="search"
                      value={search}
                      onChange={(event) =>
                        setSearch(event.target.value)
                      }
                      placeholder="Search workouts..."
                      className="w-full rounded-xl border border-gray-700 bg-[#080808] px-4 py-3 text-sm font-bold text-white outline-none transition placeholder:text-gray-600 focus:border-[#ccff00]"
                    />
                  </div>

                  <div className="w-full sm:w-56">
                    <label
                      htmlFor="sort"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-400 sm:text-sm"
                    >
                      Sort By
                    </label>

                    <div className="relative">
                      <select
                        id="sort"
                        value={sortOption}
                        onChange={(event) =>
                          setSortOption(
                            event.target.value as SortOption
                          )
                        }
                        className="w-full appearance-none rounded-xl border border-gray-700 bg-[#080808] px-4 py-3 pr-10 text-sm font-bold text-white outline-none transition focus:border-[#ccff00]"
                      >
                        <option value="duration">
                          Duration
                        </option>

                        <option value="calories">
                          Calories
                        </option>

                        <option value="rating">
                          Rating
                        </option>
                      </select>

                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        ⌄
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {error ? (
              <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-[#080808] px-5 text-center">
                <div>
                  <p className="text-lg font-bold text-red-400">
                    {error}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Please refresh the page and try again.
                  </p>
                </div>
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
              <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-[#080808] px-5 text-center">
                <div>
                  <p className="text-lg font-bold text-gray-300">
                    No workouts found
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Try another workout name, muscle group, or equipment.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}