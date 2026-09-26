import Image from "next/image";

import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#111111] text-white">
      <div className="mx-auto flex min-h-[100px] max-w-7xl flex-col items-center justify-between gap-5 px-4 py-6 sm:px-5 md:flex-row md:px-8">
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt="FITLOG Logo"
            width={40}
            height={40}
            className="h-9 w-9"
          />

          <span className="text-lg font-black tracking-[0.1em]">
            FITLOG
          </span>
        </div>

        <p className="text-center text-xs font-medium text-gray-500 sm:text-sm">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}