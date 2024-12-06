import { loadHeaderFooter, activateHamburger, qs } from "./utils.mjs";
import Alert from "./Alert";
loadHeaderFooter(
  "../index.html",
  "../tradesmen/index.html",
  "../join/index.html",
  "../proximity/index.html",
  "../images/twitter.svg",
  "../images/instagram.svg",
  "../images/youtube.svg"
);
activateHamburger();
const hiddenInput = qs(`input[type="hidden"]`);
const d = new Date();
const isoDate = d.toISOString();
hiddenInput.value = isoDate;

const alert = new Alert("alerts");
alert.renderElement();

