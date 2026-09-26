import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={logo}
                alt="FitLog Logo"
                width={42}
                height={42}
              />

              <span className="text-xl font-black tracking-[0.12em]">
                FITLOG
              </span>
            </Link>

            <p className="mt-5 max-w-sm leading-7 text-white/60">
              Build better workout habits, track your exercises, and create
              your personal fitness plan with FitLog.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-[#ccff00]">
              Quick Links
            </h2>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/"
                className="text-white/60 transition hover:text-white"
              >
                Workouts
              </Link>

              <Link
                href="/my-plan"
                className="text-white/60 transition hover:text-white"
              >
                My Plan
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-[#ccff00]">
              FitLog
            </h2>

            <p className="mt-5 leading-7 text-white/60">
              Your simple workout companion for discovering exercises and
              organizing your training plan.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} FitLog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}