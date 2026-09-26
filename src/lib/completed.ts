const COMPLETED_KEY = "fitlog-completed";

export function getCompleted(): number[] {
  if (typeof window === "undefined") {
    return [];
  }

  const completed = localStorage.getItem(COMPLETED_KEY);

  if (!completed) {
    return [];
  }

  try {
    return JSON.parse(completed) as number[];
  } catch {
    return [];
  }
}

export function markAsDone(id: number): number[] {
  const currentCompleted = getCompleted();

  if (currentCompleted.includes(id)) {
    return currentCompleted;
  }

  const updatedCompleted = [...currentCompleted, id];

  localStorage.setItem(
    COMPLETED_KEY,
    JSON.stringify(updatedCompleted)
  );

  window.dispatchEvent(new Event("completedUpdated"));

  return updatedCompleted;
}

export function markAsUndone(id: number): number[] {
  const currentCompleted = getCompleted();

  const updatedCompleted = currentCompleted.filter(
    (completedId) => completedId !== id
  );

  localStorage.setItem(
    COMPLETED_KEY,
    JSON.stringify(updatedCompleted)
  );

  window.dispatchEvent(new Event("completedUpdated"));

  return updatedCompleted;
}