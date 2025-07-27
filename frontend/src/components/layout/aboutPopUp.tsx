// Components
import Tooltip from "./Tooltip";
import IconButton from "../motd/IconButton";
import Overlay from "./Overlay";

// Css
import style from "./aboutPopUp.module.css";

interface AboutProps {
  hidden: boolean;
  onClose: () => void;
}

function About({ hidden, onClose }: AboutProps) {
  if (hidden) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <div className={`${style.outerDiv} ${hidden ? style.hidden : ""}`}>
        <IconButton
          icon={<i className="bi bi-x-circle" />}
          iconOnHover={<i className="bi bi-x-circle-fill" />}
          onClick={onClose}
          colorOnHover="red"
          preset="close"
        />
        <h1 className={style.title}>About this app</h1>
        <p className={style.paragraph}>
          <b>Moossage of the Day</b> was a silly project idea I had while watching
          an online course about Node.js. In it, the instructor used the command<br />
          <span className={style.codeSnippet}>npx cowsay "something"</span> while demonstrating how npx works
          and it made{" "}
          <Tooltip
            text={` ______
< Mooo >
 ------
     \\   ^__^
      \\  (oo)\\_______
         (__)\\       )\\/\\
             ||----w |
             ||     ||`}
            position="top"
          >
            <span className={style.tooltipTrigger}>this</span>
          </Tooltip>{" "}
          cow that says anything you want!
          <br /><br />
          I laughed so hard at that moment that I thought, "I have to make a
          project with this library." And so I did. This website is basically a
          mix of various concepts and technologies I learned from that course,
          combined with this silly cow.
          <br /><br />I just hope it makes you laugh as much as it made me!
        </p>
        <p className={style.myLinks}>
          Find me on:
        </p>
        <div className={style.iconContainer}>
          <IconButton
            icon={<i className="bi bi-github" />}
            iconOnHover={<i className="bi bi-github" />}
            onClick={() => window.open("https://github.com/JLRdevv", "_blank")}
            colorOnHover="#333"
          />
          <IconButton
            icon={<i className="bi bi-linkedin" />}
            iconOnHover={<i className="bi bi-linkedin" />}
            onClick={() =>
              window.open("https://www.linkedin.com/in/jlrads", "_blank")
            }
            colorOnHover="#0077b5"
          />
        </div>

      </div>
    </>
  );
}

export default About;
