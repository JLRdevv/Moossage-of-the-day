// Lib
import { Link } from "react-router-dom";
import { useState } from "react";

// Components
import About from "./aboutPopUp";

// CSS
import style from "./navbar.module.css";

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(true)



  function handleAbout() {
    setIsHidden(false);
  }

  function handleCloseAbout() {
    setIsHidden(true);
  }

  return (
    <>
      <nav>
        <p>Moossage of the day!</p>
        <div className={style.navLinks}>
          <span className={style.navLink} onClick={handleAbout}>About</span>
          <div className={style.navDivider} />
          <span className={style.navLink}><Link to={"custom"}>Custom</Link></span>
          <span className={style.navLink}><Link to={"motd"}>Motd</Link></span>
        </div>
      </nav>
      <About hidden={isHidden} onClose={handleCloseAbout} />
    </>
  );
}
