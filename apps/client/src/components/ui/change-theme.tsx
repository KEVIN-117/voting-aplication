"use client"

import { Moon, Sun, SunMoon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { ReactNode, useState } from 'react';


export function ModeToggle() {
  const { setTheme } = useTheme()
  const [themeIcon, setThemeIcon] = useState<{
    theme: string,
    icon: ReactNode
  }>(
    {theme: "system", icon: <SunMoon />}
  )
  const handleThemeChange = (theme: string) => {
    setTheme(theme)
    switch (theme) {
      case "light":
        setThemeIcon({ theme, icon: <Sun /> })
        break
      case "dark":
        setThemeIcon({ theme, icon: <Moon /> })
        break
      case "system":
        setThemeIcon({ theme, icon: <SunMoon /> })
        break
    }
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {themeIcon?.icon || <Sun />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          <Sun />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          <Moon />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("system")}>
          <SunMoon />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
