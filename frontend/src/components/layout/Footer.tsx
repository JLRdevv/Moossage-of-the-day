import style from "./footer.module.css";

export default function Footer() {
  return (
    <footer>
      <div className={style.footerDiv}>
        <p>© 2025 Moossage of the Day. All rights reserved.</p>
        <p>
          Made with <span className={style.heartSpan}>❤️</span> by João
        </p>
      </div>
    </footer>
  );
}
