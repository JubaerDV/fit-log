"use client";

import { useEffect, useState } from "react";

import type { Workout } from "@/types/workout";
import { addToPlan, getPlan } from "@/lib/plan";
import Toast from "@/components/Toast/Toast";

interface AddToPlanButtonProps {
  workout: Workout;
}

export default function AddToPlanButton({
  workout,
}: AddToPlanButtonProps) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setPlan(getPlan());
    setIsReady(true);
  }, []);

  const added = isReady && plan.some((item) => item.id === workout.id);
  const planFull = isReady && plan.length >= 5 && !added;

  const showMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const handleAdd = () => {
    const currentPlan = getPlan();

    if (currentPlan.some((item) => item.id === workout.id)) {
      setPlan(currentPlan);
      showMessage("Already added to Today's Plan");
      return;
    }

    if (currentPlan.length >= 5) {
      setPlan(currentPlan);
      showMessage("Today's Plan is full. Maximum 5 workouts.");
      return;
    }

    addToPlan(workout);

    const updatedPlan = getPlan();

    setPlan(updatedPlan);
    showMessage("Added to Today's Plan");
  };

  return (
    <>
      <button
        type="button"
        onClick={handleAdd}
        disabled={!isReady || planFull}
        className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
          !isReady
            ? "cursor-wait bg-gray-700 text-gray-400"
            : planFull
              ? "cursor-not-allowed bg-gray-700 text-gray-400"
              : added
                ? "bg-[#1a1a1a] text-[#ccff00]"
                : "bg-[#ccff00] text-black hover:bg-white"
        }`}
      >
        {!isReady
          ? "Loading..."
          : added
            ? "Added to Today's Plan"
            : planFull
              ? "Plan Full — 5/5"
              : "+ Add to Today's Plan"}
      </button>

      {showToast && <Toast message={toastMessage} />}
    </>
  );
}