import {
  loadHeaderFooter,
  activateHamburger,
  renderTradesmen,
  wayfinding,
  qs,
  getParams,
  changeFormAction
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
changeFormAction("tradesmen.html")
wayfinding();
const selectedTrade = getParams("trade");
renderTradesmen(selectedTrade);
qs("#tradeOption").addEventListener("change", (event) => {
  renderTradesmen(event.target.value);
});
