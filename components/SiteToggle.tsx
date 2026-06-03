"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import LabsTransition from "../components/LabTransition";

export default function SiteToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const [showLabsTransition, setShowLabsTransition] = useState(false);

  const isLabs = pathname.startsWith("/labs");

  const goToLabs = () => {
    if (isLabs) return;

    setShowLabsTransition(true);

    window.setTimeout(() => {
      router.push("/labs");
    }, 3200);
  };

  return (
    <>
      <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
        <div
          className={`flex rounded-full p-1 shadow-sm backdrop-blur-md ${
            isLabs
              ? "border border-white/10 bg-white/10"
              : "border border-black/10 bg-white/70"
          }`}
        >
          <Link
            href="/"
            className={`rounded-full px-5 py-2 text-sm transition ${
              !isLabs
                ? "bg-black text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            Home
          </Link>

          <button
            type="button"
            onClick={goToLabs}
            className={`rounded-full px-5 py-2 text-sm transition ${
              isLabs
                ? "bg-white text-black"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            Labs
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showLabsTransition && <LabsTransition />}
      </AnimatePresence>
    </>
  );
}