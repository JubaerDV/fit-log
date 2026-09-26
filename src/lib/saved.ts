import type { Workout } from "@/types/workout";

const SAVED_KEY = "fitlog-saved";

export function getSaved(): Workout[] {
  if (typeof window === "undefined") {
    return [];
  }

  const savedWorkouts = localStorage.getItem(SAVED_KEY);

  if (!savedWorkouts) {
    return [];
  }

  try {
    return JSON.parse(savedWorkouts) as Workout[];
  } catch {
    return [];
  }
}

export function addToSaved(workout: Workout): Workout[] {
  const currentSaved = getSaved();

  const alreadySaved = currentSaved.some(
    (item) => item.id === workout.id
  );

  if (alreadySaved) {
    return currentSaved;
  }

  const updatedSaved = [...currentSaved, workout];

  localStorage.setItem(SAVED_KEY, JSON.stringify(updatedSaved));

  window.dispatchEvent(new Event("savedUpdated"));

  return updatedSaved;
}

export function removeFromSaved(id: number): Workout[] {
  const currentSaved = getSaved();

  const updatedSaved = currentSaved.filter(
    (workout) => workout.id !== id
  );

  localStorage.setItem(SAVED_KEY, JSON.stringify(updatedSaved));

  window.dispatchEvent(new Event("savedUpdated"));

  return updatedSaved;
}

export function clearSaved(): void {
  localStorage.removeItem(SAVED_KEY);

  window.dispatchEvent(new Event("savedUpdated"));
}