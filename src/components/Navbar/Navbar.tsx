"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import logo from "@/assets/logo.png";
import { getPlan } from "@/lib/plan";
import { getSaved } from "@/lib/saved";

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const updateCounts = () => {
      setPlanCount(getPlan().length);
      setSavedCount(getSaved().length);
    };

    updateCounts();

    window.addEventListener("planUpdated", updateCounts);
    window.addEventListener("savedUpdated", updateCounts);

    return () => {
      window.removeEventListener("planUpdated", updateCounts);
      window.removeEventListener("savedUpdated", updateCounts);
    };
  }, []);

  const isWorkoutActive =
    pathname === "/" || pathname.startsWith("/details");

  const isMyPlanActive = pathname.startsWith("/my-plan");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111111] text-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-[70px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-5 md:min-h-[76px] md:px-8"
      >
        <Link
          href="/"
          aria-label="FITLOG home"
          className="flex shrink-0 items-center gap-2 sm:gap-3"
        >
          <Image
            src={logo}
            alt="FITLOG Logo"
            width={42}
            height={42}
            priority
            className="h-9 w-9 sm:h-10 sm:w-10"
          />

          <span className="text-lg font-black tracking-[0.1em] sm:text-xl">
            FITLOG
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          <Link
            href="/"
            aria-current={isWorkoutActive ? "page" : undefined}
            className={`py-7 text-sm font-bold uppercase tracking-wider transition ${
              isWorkoutActive
                ? "text-[#ccff00]"
                : "text-white/70 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            aria-current={isMyPlanActive ? "page" : undefined}
            className={`py-7 text-sm font-bold uppercase tracking-wider transition ${
              isMyPlanActive
                ? "text-[#ccff00]"
                : "text-white/70 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/my-plan"
            aria-label={`Today's plan with ${planCount} workouts`}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-white transition hover:text-[#ccff00] sm:text-sm"
          >
            <span>Plan</span>
            <span className="flex h-7 min-w-7 items-center justify-center rounded-lg bg-[#ccff00] px-2 text-xs font-black text-black">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            aria-label={`Saved workouts with ${savedCount} workouts`}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-white transition hover:text-[#ccff00] sm:text-sm"
          >
            <span>Saved</span>
            <span className="flex h-7 min-w-7 items-center justify-center rounded-lg border border-white/40 px-2 text-xs font-black text-white">
              {savedCount}
            </span>
          </Link>
        </div>
      </nav>

      <div
        className="flex border-t border-white/10 md:hidden"
        aria-label="Mobile navigation"
      >
        <Link
          href="/"
          aria-current={isWorkoutActive ? "page" : undefined}
          className={`flex flex-1 items-center justify-center py-3 text-xs font-black uppercase tracking-wider ${
            isWorkoutActive
              ? "bg-[#ccff00] text-black"
              : "text-white/60"
          }`}
        >
          Workout
        </Link>

        <Link
          href="/my-plan"
          aria-current={isMyPlanActive ? "page" : undefined}
          className={`flex flex-1 items-center justify-center py-3 text-xs font-black uppercase tracking-wider ${
            isMyPlanActive
              ? "bg-[#ccff00] text-black"
              : "text-white/60"
          }`}
        >
          My Plan
        </Link>
      </div>
    </header>
  );
}