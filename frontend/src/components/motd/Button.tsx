import styleCss from "./button.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

interface ButtonProps {
  text: string;
  onclick: () => void;
  icon?: React.ReactNode;
  iconOnHover?: React.ReactNode;
  styleProp?: string;
  disabled?: boolean;
  toggled?: boolean;
}

export default function Button({
  text,
  onclick,
  icon,
  iconOnHover,
  styleProp,
  disabled,
  toggled,
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <button
        className={`${styleCss.buttonStyle} ${styleProp ?? ""} ${
          disabled ? styleCss.disabled : ""
        } ${toggled ? styleCss.toggled : ""}`}
        onClick={onclick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled}
      >
        {text}{" "}
        {toggled
          ? iconOnHover ?? icon
          : icon && (!isHovered || !iconOnHover)
          ? icon
          : iconOnHover}
      </button>
    </>
  );
}
