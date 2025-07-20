// Libs
import { v4 as uuidv4 } from "uuid";

export default function getBrowserId() {
  let browserId = localStorage.getItem("browser_uuid");

  if (!browserId) {
    browserId = uuidv4();
    localStorage.setItem("browser_uuid", browserId);
  }

  return browserId;
}
