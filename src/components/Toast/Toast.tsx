"use client";

interface ToastProps {
  message: string;
  type?: "success" | "error";
}

export default function Toast({
  message,
  type = "success",
}: ToastProps) {
  return (
    <div
      className={`fixed right-5 top-5 z-50 rounded-xl px-5 py-4 text-sm font-bold shadow-lg ${
        type === "success"
          ? "bg-black text-[#ccff00]"
          : "bg-red-600 text-white"
      }`}
    >
      {message}
    </div>
  );
}