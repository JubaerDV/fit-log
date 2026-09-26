import type { Workout } from "@/types/workout";

const PLAN_KEY = "fitlog-plan";

export function getPlan(): Workout[] {
  if (typeof window === "undefined") {
    return [];
  }

  const savedPlan = localStorage.getItem(PLAN_KEY);

  if (!savedPlan) {
    return [];
  }

  try {
    return JSON.parse(savedPlan) as Workout[];
  } catch {
    return [];
  }
}

export function addToPlan(workout: Workout): Workout[] {
  const currentPlan = getPlan();

  const alreadyAdded = currentPlan.some(
    (item) => item.id === workout.id
  );

  if (alreadyAdded) {
    return currentPlan;
  }

  const updatedPlan = [...currentPlan, workout];

  localStorage.setItem(PLAN_KEY, JSON.stringify(updatedPlan));

  window.dispatchEvent(new Event("planUpdated"));

  return updatedPlan;
}

export function removeFromPlan(id: number): Workout[] {
  const currentPlan = getPlan();

  const updatedPlan = currentPlan.filter(
    (workout) => workout.id !== id
  );

  localStorage.setItem(PLAN_KEY, JSON.stringify(updatedPlan));

  window.dispatchEvent(new Event("planUpdated"));

  return updatedPlan;
}

export function clearPlan(): void {
  localStorage.removeItem(PLAN_KEY);

  window.dispatchEvent(new Event("planUpdated"));
}