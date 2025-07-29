import { useEffect, useState } from "react";

export function useIsDesktop(breakpoint: number = 640) {
  // Tailwind's default "sm" = 640px
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= breakpoint);

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);

  return isDesktop;
}