"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      className="relative grid h-10 w-10 place-items-center rounded-full border border-current/15 text-current/80 transition hover:text-gold"
    >
      {mounted && current === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
