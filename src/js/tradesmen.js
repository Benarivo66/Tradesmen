import {
  loadHeaderFooter,
  activateHamburger,
  renderTradesmen,
  wayfinding,
  qs,
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
renderTradesmen();
qs("#tradeOption").addEventListener("change", (event) => {
  renderTradesmen(event.target.value);
});
wayfinding();
