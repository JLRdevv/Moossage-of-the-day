import style from "./overlay.module.css";

interface OverlayProps {
  onClick?: () => void;
}

export default function Overlay({ onClick }: OverlayProps) {
  return (
    <div className={style.overlay} onClick={onClick} />
  );
}