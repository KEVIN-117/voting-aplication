"use client"
import { useCycle, motion } from "framer-motion"
import { useRef } from "react"
import { useDimensions } from '../../../../hooks/useDimensions';
import { Navigation } from './Navigation';
import { MenuToggle } from './ToggleMenu';
import style from "../navbar.module.css"
import { clsx } from 'clsx';
const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

export function MenuMobile(){
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)
  console.log(isOpen);
  return(
    <motion.nav
      className={`${style.mobile_nav}`}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div className={`dark:bg-slate-900 bg-slate-50 ${style.background} ${isOpen ? "block" : ""}`} variants={sidebar} />
      <Navigation />
      <MenuToggle toggle={()=> {
        console.log(isOpen);
        toggleOpen()
      }} />
    </motion.nav>
  )
}
