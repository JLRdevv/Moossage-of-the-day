// Libs
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

// Css
import styleCss from "./button.module.css";

interface ButtonProps {
  text?: string | React.ReactNode;
  onclick?: () => void;
  icon?: React.ReactNode;
  iconOnHover?: React.ReactNode;
  styleProp?: string;
  disabled?: boolean;
  toggled?: boolean;
  isSubmit?: boolean;
}

export default function Button({
  text,
  onclick,
  icon,
  iconOnHover,
  styleProp,
  disabled,
  toggled,
  isSubmit = false,
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
        type={isSubmit ? "submit" : "button"}
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
