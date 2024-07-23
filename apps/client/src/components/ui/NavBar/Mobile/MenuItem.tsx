import { motion } from 'framer-motion';
import { navigation, Navigation } from '../utils';
import { DisclosureButton, DisclosurePanel } from '@headlessui/react';
import styleModules from "../navbar.module.css"
import Link from 'next/link';

const variantsItem = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = ({ i, label }: {i: number, label:Navigation}) => {
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <DisclosureButton
      as={motion.li}
      className={styleModules.menu_li}
      variants={variantsItem}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        key={label.name}
        href={label.href}
        aria-current={label.current ? 'page' : undefined}
        className={`${styleModules.text_placeholder}`}
        style={style}
      >
        {label.name}
      </Link>
    </DisclosureButton>
  );
};
