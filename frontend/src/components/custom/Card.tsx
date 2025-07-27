// Css
import style from './card.module.css';

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className={style.card}>
      {children}
    </div>
  );
}