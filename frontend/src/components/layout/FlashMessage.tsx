// Libs
import { useState, useEffect } from "react";

// Css
import style from "./flashMessage.module.css";

interface FlashMessageProps {
  message: string;
  type: string;
  isVisible: boolean;
  icon?: React.ReactNode;
}

export default function FlashMessage({
  message,
  type,
  icon,
  isVisible,
}: FlashMessageProps) {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div
        className={`${style.flashMessage} ${
          type === "success" ? style.success : style.error
        } ${visible ? style.visible : ""}`}
      >
        <p>
          {message} {icon ? icon : ""}
        </p>
        <hr className={style.progressBar} />
      </div>
    </>
  );
}
