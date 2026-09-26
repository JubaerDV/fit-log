"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Toast from "@/components/Toast/Toast";
import { getPlan, removeFromPlan } from "@/lib/plan";
import { getSaved, removeFromSaved } from "@/lib/saved";
import { getCompleted, markAsDone } from "@/lib/completed";
import type { Workout } from "@/types/workout";

type Tab = "plan" | "saved";

type SortOption =
  | "default"
  | "duration-asc"
  | "calories-asc"
  | "rating-desc";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [toast, setToast] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [sortOption, setSortOption] =
    useState<SortOption>("default");

  useEffect(() => {
    const loadData = () => {
      setPlan(getPlan());
      setSaved(getSaved());
      setCompleted(getCompleted());
      setHydrated(true);
    };

    loadData();

    const updateData = () => {
      setPlan(getPlan());
      setSaved(getSaved());
      setCompleted(getCompleted());
    };

    window.addEventListener("planUpdated", updateData);
    window.addEventListener("savedUpdated", updateData);
    window.addEventListener("completedUpdated", updateData);

    return () => {
      window.removeEventListener("planUpdated", updateData);
      window.removeEventListener("savedUpdated", updateData);
      window.removeEventListener("completedUpdated", updateData);
    };
  }, []);

  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const handleRemovePlan = (id: number) => {
    removeFromPlan(id);
    setPlan(getPlan());
    showToast("Removed from Today's Plan");
  };

  const handleRemoveSaved = (id: number) => {
    removeFromSaved(id);
    setSaved(getSaved());
    showToast("Removed from Saved");
  };

  const handleMarkAsDone = (id: number) => {
    if (completed.includes(id)) {
      showToast("Workout is already marked as done");
      return;
    }

    markAsDone(id);
    setCompleted(getCompleted());
    showToast("Workout marked as done");
  };

  const currentWorkouts =
    activeTab === "plan" ? plan : saved;

  const sortedWorkouts = [...currentWorkouts].sort(
    (a, b) => {
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
    }
  );

  const activeWorkouts =
    activeTab === "plan" ? plan : saved;

  const totalMinutes = activeWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = activeWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const totalCompleted =
    activeTab === "plan" ? completed.length : 0;

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-black px-4 py-10 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-[#111111]" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 sm:text-sm">
            Your Training
          </p>

          <h1 className="text-3xl font-black uppercase text-white sm:text-4xl md:text-5xl">
            My Plan
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
            Manage your workouts, track your progress, and
            complete your training plan.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-[#111111] p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Exercises
            </p>

            <p className="mt-2 text-2xl font-black text-white sm:text-3xl">
              {activeWorkouts.length}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111111] p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Minutes
            </p>

            <p className="mt-2 text-2xl font-black text-white sm:text-3xl">
              {totalMinutes}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111111] p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Calories
            </p>

            <p className="mt-2 text-2xl font-black text-white sm:text-3xl">
              {totalCalories}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111111] p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Completed
            </p>

            <p className="mt-2 text-2xl font-black text-white sm:text-3xl">
              {totalCompleted}
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-fit items-center gap-1 rounded-2xl border border-white/10 bg-black p-1">
            <button
              type="button"
              onClick={() => setActiveTab("plan")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === "plan"
                  ? "bg-[#1a1a1a] text-[#ccff00]"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Today's plan
              <span className="ml-1.5 text-xs">
                {plan.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === "saved"
                  ? "bg-[#1a1a1a] text-[#ccff00]"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Saved
              <span className="ml-1.5 text-xs">
                {saved.length}
              </span>
            </button>
          </div>

          {currentWorkouts.length > 0 && (
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort"
                className="text-sm font-semibold text-gray-400"
              >
                Sort by
              </label>

              <select
                id="sort"
                value={sortOption}
                onChange={(event) =>
                  setSortOption(
                    event.target.value as SortOption
                  )
                }
                className="rounded-xl border border-gray-700 bg-[#151515] px-3 py-2 text-xs font-semibold text-white outline-none transition focus:border-[#ccff00]"
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
          )}
        </div>

        {sortedWorkouts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#111111] px-5 py-16 text-center sm:py-20">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black text-2xl text-gray-500">
              {activeTab === "plan" ? "+" : "☆"}
            </div>

            <h2 className="mt-5 text-xl font-black uppercase text-white">
              {activeTab === "plan"
                ? "Your plan is empty"
                : "No saved workouts"}
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              {activeTab === "plan"
                ? "Add workouts from the library to build your training plan."
                : "Save workouts for later and find them here."}
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex rounded-full bg-[#ccff00] px-6 py-2.5 text-sm font-black uppercase text-black transition hover:bg-white"
            >
              Browse Workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedWorkouts.map((workout) => {
              const isDone = completed.includes(workout.id);

              return (
                <div
                  key={workout.id}
                  className={`overflow-hidden rounded-2xl border bg-[#111111] transition ${
                    activeTab === "plan" && isDone
                      ? "border-[#ccff00]/30"
                      : "border-white/10"
                  }`}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-56 w-full shrink-0 overflow-hidden md:h-44 md:w-64 lg:w-72">
                      <img
                        src={workout.image}
                        alt={workout.name}
                        className={`h-full w-full object-cover ${
                          activeTab === "plan" && isDone
                            ? "opacity-60"
                            : ""
                        }`}
                      />

                      {activeTab === "plan" && isDone && (
                        <div className="absolute left-4 top-4 rounded-full bg-[#ccff00] px-3 py-1 text-xs font-black text-black">
                          Done
                        </div>
                      )}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-center p-5 md:flex-row md:items-center md:p-6">
                      <div className="min-w-0 flex-1">
                        <h2
                          className={`text-xl font-black sm:text-2xl ${
                            activeTab === "plan" && isDone
                              ? "text-gray-500"
                              : "text-white"
                          }`}
                        >
                          {workout.name}
                        </h2>

                        <p className="mt-2 text-sm font-semibold text-gray-500">
                          Full Body
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                          <span className="text-xs font-bold text-gray-300">
                            <span className="mr-1.5 text-[#ccff00]">
                              ◷
                            </span>
                            {workout.duration} min
                          </span>

                          <span className="text-xs font-bold text-gray-300">
                            <span className="mr-1.5 text-[#00d9ff]">
                              ◉
                            </span>
                            {workout.caloriesBurned} kcal
                          </span>

                          <span className="text-xs font-bold text-gray-300">
                            <span className="mr-1.5 text-[#ffb800]">
                              ★
                            </span>
                            {workout.rating}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 flex shrink-0 items-center gap-2 md:ml-6 md:mt-0">
                        <Link
                          href={`/details/${workout.id}`}
                          className="rounded-full border border-white/15 bg-black px-4 py-2 text-xs font-semibold text-white transition hover:border-[#ccff00] hover:bg-[#ccff00] hover:text-black"
                        >
                          View Details
                        </Link>

                        {activeTab === "plan" && (
                          <button
                            type="button"
                            onClick={() =>
                              handleMarkAsDone(workout.id)
                            }
                            className={`flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition ${
                              isDone
                                ? "border border-white/15 bg-black text-gray-400 hover:border-white/30 hover:text-white"
                                : "bg-[#ccff00] text-black hover:bg-white"
                            }`}
                          >
                            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px] font-black">
                              ✓
                            </span>

                            <span>
                              {isDone
                                ? "Done"
                                : "Mark as Done"}
                            </span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            activeTab === "plan"
                              ? handleRemovePlan(workout.id)
                              : handleRemoveSaved(workout.id)
                          }
                          aria-label={`Remove ${workout.name}`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black text-lg font-light text-gray-500 transition hover:border-red-500/30 hover:text-red-400"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {toast && <Toast message={toast} />}
    </main>
  );
}