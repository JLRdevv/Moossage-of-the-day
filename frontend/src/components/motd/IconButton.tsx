// Lib
import { useState } from "react";

// Css
import style from "./iconButton.module.css";

interface IconButtonProps {
  onClick?: () => void;
  icon : React.ReactNode;
  iconOnHover: React.ReactNode;
  color?: string;
  colorOnHover?: string;
  preset?: "close" | "delete" | "edit" | "save";
}

export default function IconButton({ onClick, icon, iconOnHover, color, colorOnHover, preset }: IconButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={style.iconButton + (preset ? ` ${style[preset]}` : "")}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ color: isHovered && colorOnHover ? colorOnHover : color ?? "inherit" }}
    >
      {isHovered ? iconOnHover : icon}
    </button>
  );
}
