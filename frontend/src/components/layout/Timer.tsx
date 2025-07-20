import { useEffect, useState } from "react";
import style from "./timer.module.css";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);

      const diff = tomorrow.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkDeviceOrientation = () => {
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
      const isMobile = /Mobi|Android/i.test(navigator.userAgent);
      setIsMobileLandscape(isLandscape && isMobile);
    };

    checkDeviceOrientation();

    window.addEventListener("resize", checkDeviceOrientation);
    window.addEventListener("orientationchange", checkDeviceOrientation);

    return () => {
      window.removeEventListener("resize", checkDeviceOrientation);
      window.removeEventListener("orientationchange", checkDeviceOrientation);
    };
  }, []);

  return (
    <div className={style.outerDiv}>
      {!isMobileLandscape ? (
        <>
          <h2 className={style.timerTitle}>Next moossage in:</h2>
          <h1 className={style.timerNumber}>{timeLeft}</h1>
        </>
      ) : (
        <h2 className={style.timerTitle}>Next moossage in: {timeLeft}</h2>
      )}
    </div>
  );
}
