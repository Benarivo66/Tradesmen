import { loadHeaderFooter, activateHamburger, renderTradesmen } from "./utils.mjs";
loadHeaderFooter(
  "../index.html",
  "index.html",
  "../join/index.html",
  "../proximity/index.html",
  "../images/twitter.svg",
  "../images/instagram.svg",
  "../images/youtube.svg"
);
activateHamburger();
renderTradesmen();

