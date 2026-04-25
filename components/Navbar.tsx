"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full px-4 pt-4 md:px-8">
        <div className="mx-auto flex max-w-full items-center justify-between rounded-2xl bg-transparent px-4 py-3">
          {/* Left: Logo / Name */}
          <Link
            href="/"
            className="text-sm font-medium tracking-[0.18em] text-black mix-blend-difference uppercase md:text-base"
          >
            Mubashir
          </Link>

          {/* Right: Hamburger */}
          <button
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/90 transition-all duration-300 hover:bg-slate-900/60 cursor-pointer"
          >
            <div className="relative h-5 w-5">
              {/* Top bar (right aligned, short) */}
              <motion.span
                animate={
                  isOpen
                    ? {
                        top: "50%",
                        left: "50%",
                        width: "100%",
                        rotate: 45,
                        x: "-50%",
                        y: "-50%",
                      }
                    : {
                        top: "15%",
                        left: "100%",
                        width: "60%",
                        rotate: 0,
                        x: "-100%",
                        y: "0%",
                      }
                }
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="absolute block h-[2px] rounded-full bg-white origin-center"
              />

              {/* Middle bar (full, centered) */}
              <motion.span
                animate={
                  isOpen
                    ? {
                        opacity: 0,
                        scaleX: 0,
                      }
                    : {
                        opacity: 1,
                        scaleX: 1,
                      }
                }
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 top-1/2 block h-[2px] w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-white origin-center"
              />

              {/* Bottom bar (left aligned, short) */}
              <motion.span
                animate={
                  isOpen
                    ? {
                        top: "50%",
                        left: "50%",
                        width: "100%",
                        rotate: -45,
                        x: "-50%",
                        y: "-50%",
                      }
                    : {
                        top: "85%",
                        left: "0%",
                        width: "60%",
                        rotate: 0,
                        x: "0%",
                        y: "-100%",
                      }
                }
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="absolute block h-[2px] rounded-full bg-white origin-center"
              />
            </div>
          </button>
        </div>
      </header>

      {/* Dropdown / floating panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-4 top-20 z-50 w-[360px] rounded-3xl bg-slate-900 p-3 shadow-2xl backdrop-blur-2xl md:right-8"
            >
              <nav className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.05 * index,
                      duration: 0.25,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className=" group flex items-center hover:bg-white/50 rounded-2xl">
                      <div className="scale-0 text-white group-hover:scale-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-2 w-12">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="48" height="48" fill="white" fillOpacity="0.01"></rect> <path d="M41.9999 24H5.99992" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M30 12L42 24L30 36" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> </g>
                        </svg>
                        </div>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="rounded-2xl px-4 py-3 text-3xl text-white/75 transition-all duration-200 hover:text-white group-hover:scale-110 group-hover:translate-x-2 flex"
                      >
                        {item.name}
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}