"use client";

import { useEffect, useState } from "react";

import type { Workout } from "@/types/workout";
import {
  addToSaved,
  getSaved,
} from "@/lib/saved";
import Toast from "@/components/Toast/Toast";

interface SaveForLaterButtonProps {
  workout: Workout;
}

export default function SaveForLaterButton({
  workout,
}: SaveForLaterButtonProps) {
  const [saved, setSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setSaved(
      getSaved().some((item) => item.id === workout.id)
    );
  }, [workout.id]);

  const handleSave = () => {
    if (saved) {
      setToastMessage("Already saved for later");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2500);

      return;
    }

    addToSaved(workout);
    setSaved(true);
    setToastMessage("Saved for later");
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleSave}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-black px-4 py-3 text-sm font-bold text-white transition hover:border-[#ccff00] hover:bg-[#ccff00] hover:text-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={saved ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 3.75A1.75 1.75 0 0 1 7.75 2h8.5A1.75 1.75 0 0 1 18 3.75v17.5l-6-3.75-6 3.75V3.75Z"
          />
        </svg>

        <span>{saved ? "Saved" : "Save for later"}</span>
      </button>

      {showToast && <Toast message={toastMessage} />}
    </>
  );
}