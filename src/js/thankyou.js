import { loadHeaderFooter, activateHamburger, qs, changeFormAction } from "./utils.mjs";
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
changeFormAction();
setTimeout(() => {
  qs("#trademanIcon").classList.add("animateIcon");
}, 348);
function renderThankYouPage() {
  const observer = new MutationObserver(() => {
    const showInfo = qs("#results");
    const url = window.location.href;
    const everything = url.split("?");
    let formData = everything[1].split("&");
    let result = null;
    function show(field) {
      formData.forEach((elem) => {
        if (elem.startsWith(field)) {
          result = elem.split("=")[1].replace("%40", "@");
        }
      });
      return result;
    }
    const timestamp = show("timestamp").split("T");
    const timepart = timestamp[1].split("%3A");
    showInfo.innerHTML = `
<p>First Name: ${show("first-name")}</p>
<p>Last Name: ${show("last-name")}</p>
<p>Email: ${show("email")}</p>
<p>Phone: ${show("telephone")}</p>
<p>Trade: ${show("trade").replace(/\+/g, " ")}</p>
<p>Timestamp: ${timestamp[0]} ${timepart[0]}:${timepart[1]}</p>
`;
    observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

renderThankYouPage();
