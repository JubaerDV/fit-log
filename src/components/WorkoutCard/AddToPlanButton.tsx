"use client";

import { useState } from "react";

import type { Workout } from "@/types/workout";
import { addToPlan, getPlan } from "@/lib/plan";
import Toast from "@/components/Toast/Toast";

interface AddToPlanButtonProps {
  workout: Workout;
}

export default function AddToPlanButton({
  workout,
}: AddToPlanButtonProps) {
  const [added, setAdded] = useState(() =>
    getPlan().some((item) => item.id === workout.id)
  );

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleAdd = () => {
    if (added) {
      setToastMessage("Already added to Today's Plan");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2500);

      return;
    }

    addToPlan(workout);
    setAdded(true);
    setToastMessage("Added to Today's Plan");
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleAdd}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-4 py-3 text-sm font-bold text-black transition hover:bg-white"
      >
        {added ? "Added to Today's Plan" : "+ Add to Today's Plan"}
      </button>

      {showToast && <Toast message={toastMessage} />}
    </>
  );
}