"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { getSiteCopyValue, type SiteCopy } from "@/lib/site-copy"

export function ThemeToggleButton({ copy }: { copy: SiteCopy }) {
  const { theme, setTheme, resolvedTheme } = useTheme()

  // Use resolvedTheme to determine the currently active theme (light or dark)
  // This handles the 'system' preference correctly.
  const isDarkMode = resolvedTheme === "dark"

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={getSiteCopyValue(copy, 'a11y_theme_toggle') || undefined}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      {getSiteCopyValue(copy, 'a11y_theme_toggle') && (
        <span className="sr-only">{getSiteCopyValue(copy, 'a11y_theme_toggle')}</span>
      )}
    </Button>
  )
}
