// Css
import style from "./footer.module.css";

export default function Footer() {
  return (
    <footer>
      <div className={style.footerDiv}>
        <p className={style.pFooter} >© 2025 Moossage of the Day.</p>
        <p className={style.pFooter}>
          Made with <span className={style.heartSpan}>❤️</span> by <a href="https://github.com/JLRdevv" target="_blank" rel="noopener noreferrer" className={style.nameSpan}>João Lucas</a>
        </p>
      </div>
    </footer>
  );
}
