"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Contact", href: "/contact" },
];

type NavbarProps = {
  animateIn?: boolean;
};

function CornerBrackets() {
  return (
    <>
      <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-black/55" />
      <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-black/55" />
    </>
  );
}

export default function Navbar({ animateIn = true }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [routeReady, setRouteReady] = useState(false);
  const pathname = usePathname();

  const isLabs = pathname.startsWith("/labs");

  useEffect(() => {
    setIsOpen(false);
    setRouteReady(false);

    const timer = window.setTimeout(() => {
      setRouteReady(true);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  const shouldShow = animateIn && routeReady;

  if (isLabs) return null;

  return (
    <>
      <motion.header
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.95,
            filter: "blur(14px)",
        }}
        animate={
          shouldShow
            ? {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }
            : {
                opacity: 0,
                y: 40,
                scale: 0.95,
                filter: "blur(14px)",
              }
        }
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="fixed bottom-5 left-1/2 z-[9999] w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 sm:bottom-6"
      >
        <div className="relative">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-full left-1/2 mb-7 w-[min(calc(100vw-2rem),560px)] -translate-x-1/2"
              >
                <div className="bg-white px-4 py-5 shadow-[0_28px_90px_rgba(0,0,0,0.10)] sm:px-7 sm:py-7">
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item, index) => {
                      const isActive =
                        pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(item.href));

                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.05 * index,
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="group relative flex items-center gap-4 overflow-hidden px-4 py-4 text-3xl font-medium leading-none tracking-[-0.045em] text-black sm:px-6 sm:py-5 sm:text-5xl md:text-6xl"
                          >
                            <span
                              className={`pointer-events-none absolute inset-y-0 left-0 z-0 w-full origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                isActive
                                  ? "scale-x-100 bg-black/[0.08]"
                                  : "bg-black/[0.025] group-hover:scale-x-100"
                              }`}
                            />

                            <span
                              className={`pointer-events-none absolute inset-0 z-10 transition-all duration-300 ${
                                isActive
                                  ? "opacity-100"
                                  : "opacity-0 scale-[0.97] group-hover:opacity-100 group-hover:scale-100"
                              }`}
                            >
                              <CornerBrackets />
                            </span>

                            <span
                              className={`relative z-20 overflow-hidden text-2xl transition-all duration-300 sm:text-4xl ${
                                isActive
                                  ? "w-10 opacity-100"
                                  : "w-0 opacity-0 group-hover:w-10 group-hover:opacity-100"
                              }`}
                            >
                              →
                            </span>

                            <span className="relative z-20 transition-transform duration-300 group-hover:translate-x-1">
                              {item.name}
                            </span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between rounded-full border border-black/25 bg-white/75 px-5 py-3 shadow-[0_16px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold uppercase tracking-[0.28em] text-black sm:text-sm"
            >
              Mubashir
            </Link>

            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full"
            >
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative block h-5 w-5"
              >
                <motion.span
                  animate={
                    isOpen
                      ? { y: 9, width: "100%", x: 0 }
                      : { y: 4, width: "100%", x: 0 }
                  }
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-0 h-[2px] rounded-full bg-black"
                />

                <motion.span
                  animate={
                    isOpen
                      ? { rotate: 90, y: 9, width: "100%", x: 0 }
                      : { rotate: 0, y: 14, width: "55%", x: 9 }
                  }
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-0 h-[2px] rounded-full bg-black"
                />
              </motion.span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.button
            aria-label="Close menu"
            className="fixed inset-0 z-[9998] cursor-default bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}