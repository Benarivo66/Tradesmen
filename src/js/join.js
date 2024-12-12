import {
  loadHeaderFooter,
  activateHamburger,
  qs,
  wayfinding,
  changeFormAction
} from "./utils.mjs";
import Alert from "./Alert";
loadHeaderFooter(
  "../index.html",
  "../tradesmen/tradesmen.html",
  "../join/join.html",
  "../about/about.html",
  "../images/twitter.svg",
  "../images/instagram.svg",
  "../images/youtube.svg",
);
activateHamburger();
wayfinding();
changeFormAction();
const hiddenInput = qs(`input[type="hidden"]`);
const d = new Date();
const isoDate = d.toISOString();
hiddenInput.value = isoDate;

const alert = new Alert("alerts");
setTimeout(() => {
  alert.renderElement();
}, 300);
