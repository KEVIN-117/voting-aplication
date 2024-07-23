import { motion } from "framer-motion"
import style from "../navbar.module.css"
function Path(props: any){
  return (
    <motion.path
      className={"flex dark:stroke-slate-400 stroke-slate-900 justify-center items-center"}
      fill={"rgba(255, 255, 0)"}
      strokeWidth={"3"}
      strokeLinecap={"round"}
      {...props}
    />
  )
}


export function MenuToggle({toggle} : {toggle: any}){
  return(
    <button className={`${style.menu_button}  p-4`} onClick={toggle}>
      <svg className={"flex justify-center items-center"} width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" }
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 }
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" }
          }}
        />
      </svg>
    </button>
  )
}
