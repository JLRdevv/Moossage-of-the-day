// Css
import style from "./container.module.css";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <>
      <div className={style.containerDiv}>{children}</div>
    </>
  );
}
