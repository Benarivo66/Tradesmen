import {
  loadHeaderFooter,
  activateHamburger,
  wayfinding,
  changeFormAction,
} from "./utils.mjs";
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
