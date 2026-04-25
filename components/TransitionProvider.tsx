"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

type TransitionContextType = {
  isRouteTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextType>({
  isRouteTransitioning: false,
});

export function TransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const [isRouteTransitioning, setIsRouteTransitioning] = useState(false);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      setIsRouteTransitioning(true);

      const timer = window.setTimeout(() => {
        setIsRouteTransitioning(false);
      }, 700); // should match overlay timing

      prevPath.current = pathname;

      return () => window.clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ isRouteTransitioning }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransitionState() {
  return useContext(TransitionContext);
}