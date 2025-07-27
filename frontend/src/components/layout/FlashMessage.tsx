import { useState, useEffect } from "react";
import style from "./flashMessage.module.css";

interface FlashMessageProps {
  message: string;
  type: string;
  isVisible: boolean;
  icon?: React.ReactNode;
  onClose?: () => void;
}

export default function FlashMessage({
  message,
  type,
  icon,
  isVisible,
  onClose,
}: FlashMessageProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      const timeout = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`${style.flashMessage} ${type === "success" ? style.success : style.error
        } ${visible ? style.visible : ""}`}
    >
      <p className={style.flashMessageP}>
        {icon} {message}
      </p>
      <hr className={style.progressBar} />
    </div>
  );
}

