
import Image from "next/image";
import Link from "next/link";

import banner from "@/assets/banner.png";

export default function Hero() {
  return (
    <section className="bg-[#111111] text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:px-8 md:py-20">
        
        <div>
          <p className="mb-4 text-sm font-bold tracking-[0.2em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="max-w-2xl text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/65 md:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="mt-8 inline-flex items-center gap-3 bg-[#ccff00] px-6 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:bg-white"
          >
            Browse Workouts
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="relative overflow-hidden">
          <Image
            src={banner}
            alt="FitLog workout banner"
            className="h-auto w-full object-cover"
            priority
          />
        </div>

      </div>
    </section>
  );
}