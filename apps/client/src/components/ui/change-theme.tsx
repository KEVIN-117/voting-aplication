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

  const menuItems = [
    {
      icon: <Sun />,
      text: "Light",
      onClick: () => handleThemeChange("light")
    },
    {
      icon: <Moon />,
      text: "Dark",
      onClick: () => handleThemeChange("dark")
    },
    {
      icon: <SunMoon />,
      text: "System",
      onClick: () => handleThemeChange("system")
    }
  ]


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={"rounded-full"}>
        <Button variant="outline" size="icon">
          {themeIcon?.icon || <Sun />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"border-none flex gap-5"} align="center">
        {menuItems.map((item, index) => {
          return(
            <DropDownItem key={index} icon={item.icon} text={item.text} onClick={item.onClick} />
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


function DropDownItem({icon, text, onClick}: {icon: ReactNode, text: string, onClick: () => void}) {
  return(
    <DropdownMenuItem
      className={"hover:border hover:border-slate-600 transition delay-75 duration-100 ease-in-out flex justify-between items-center"}
      onClick={onClick}>
      {icon}
      {text}
    </DropdownMenuItem>
  )
}
