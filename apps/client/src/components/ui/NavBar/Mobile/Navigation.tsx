import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { navigation } from '../utils'
import style from "../navbar.module.css"
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const variantsContainer = {
  open: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2
    }
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

export function Navigation() {
  return (
    <motion.ul className={`${style.menu_ul}`} variants={variantsContainer}>
      {navigation.map((item, index) => (
        <MenuItem i={index} label={item} key={item.name} />
      ))}
    </motion.ul>
  )
}
