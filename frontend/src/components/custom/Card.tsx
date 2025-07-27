// Css
import style from './Card.module.css';

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