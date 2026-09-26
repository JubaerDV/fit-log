"use client";

import { useState } from "react";

import {
  getCompleted,
  markAsDone,
  markAsUndone,
} from "@/lib/completed";

interface MarkAsDoneButtonProps {
  workoutId: number;
}

export default function MarkAsDoneButton({
  workoutId,
}: MarkAsDoneButtonProps) {
  const [completed, setCompleted] = useState(() =>
    getCompleted().includes(workoutId)
  );

  const handleToggle = () => {
    if (completed) {
      markAsUndone(workoutId);
      setCompleted(false);
    } else {
      markAsDone(workoutId);
      setCompleted(true);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`w-full rounded-lg px-4 py-3 text-sm font-black uppercase transition ${
        completed
          ? "bg-gray-200 text-gray-500"
          : "bg-[#ccff00] text-black hover:bg-black hover:text-[#ccff00]"
      }`}
    >
      {completed ? "✓ Completed" : "Mark as Done"}
    </button>
  );
}