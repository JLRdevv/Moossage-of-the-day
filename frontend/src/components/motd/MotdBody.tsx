// Libs
import { SyncLoader } from "react-spinners";
import { useState, useEffect } from "react";

// Utils
import formatDate from "../../utils/DateFormater";
import getBrowserId from "../../utils/GetBrowserUUID";

// Components
import Button from "../motd/Button";
import FlashMessage from "../layout/FlashMessage";
import Like from "./Like";
import Timer from "../layout/Timer";

// Css
import style from "./MotdBody.module.css";


interface MotdBodyProps {
  message: string | null;
  loading: boolean;
  error: string | null;
  date: string | null;
  weekDay: string | null;
  motdId: number;
}

export default function MotdBody({
  message,
  loading,
  error,
  date,
  weekDay,
  motdId,
}: MotdBodyProps) {
  if (!date) {
    date = "No date available";
  }
  date = formatDate(date);

  function handleRetry() {
    window.location.reload();
  }

  const [BrowserUuid, setBrowserUuid] = useState("");

  useEffect(() => {
    const uuid = getBrowserId();
    setBrowserUuid(uuid);
  }, []);

  const [flashmessage, setFlashMessage] = useState("");
  const [type, setType] = useState<string>("");
  const [icon, setIcon] = useState<React.ReactNode>(
    <i className="bi bi-check-circle-fill"></i>
  );
  const [isVisible, setIsVisible] = useState(false);

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setFlashMessage("Link copied to clipboard!");
    setType("success");
    setIcon(<i className="bi bi-clipboard-check-fill"></i>);
    setIsVisible(true);
  }

  function handleCopy() {
    navigator.clipboard.writeText(message || "");
    setFlashMessage("Moossage copied to clipboard!");
    setType("success");
    setIcon(<i className="bi bi-clipboard-check-fill"></i>);
    setIsVisible(true);
  }

  return (
    <>
    <div className={style.timerDiv}>
      <Timer/>
    </div>
    <div className={style.motdBody}>
      {loading ? (
        <h1 className={style.loadingTitle}>Loading...</h1>
      ) : (
        <>
          <h1 className={style.dateTitle}>{date}</h1>
          <h2 className={style.weekDayTitle}>{weekDay}</h2>
        </>
      )}

      <hr></hr>
      {loading ? (
        <div className={style.loaderDiv}>
          <SyncLoader color="white" size={10} margin={2} />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <pre>{message}</pre>
      )}
      <hr></hr>
      <div className={style.actionsDiv}>
        {error ? (
          <Button
            text="Retry"
            onclick={handleRetry}
            icon={<i className="bi bi-arrow-clockwise"></i>}
          />
        ) : !loading ? (
          <>
            <div className={style.likeDiv}>
              <Like motdId={motdId} userUuid={BrowserUuid} />
            </div>
            <div className={style.buttonsDiv}>
              <Button
                text="Share"
                onclick={handleShare}
                icon={<i className="bi bi-share"></i>}
                iconOnHover={<i className="bi bi-share-fill"></i>}
              />
              <Button
                text="Copy"
                onclick={handleCopy}
                icon={<i className="bi bi-clipboard"></i>}
                iconOnHover={<i className="bi bi-clipboard-check-fill"></i>}
              />
            </div>
          </>
        ) : (
          <Button
            text="Share"
            onclick={handleRetry}
            icon={<i className="bi bi-share"></i>}
            iconOnHover={<i className="bi bi-share-fill"></i>}
            disabled={true}
          />
        )}
      </div>
      <FlashMessage
        key={Date.now()}
        message={flashmessage}
        type={type}
        icon={icon}
        isVisible={isVisible}
      />
    </div>
    </>
  );
}
