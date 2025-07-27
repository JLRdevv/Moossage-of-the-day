// Lib
import { type ReactNode } from "react";

// Css
import styles from "./Tooltip.module.css";

type TooltipProps = {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
};


export default function Tooltip({
  text,
  position = "top",
  children,
}: TooltipProps) {
  return (
    <div className={`${styles.tooltipContainer}`}>
      {children}
      <pre className={`${styles.tooltipText} ${styles[position]}`}>
        {text}
      </pre>
    </div>
  );
}
