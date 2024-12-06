const url = "https://run.mocky.io/v3/224d2f42-33d8-4dab-88ba-0ff2426e10a2";
function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("Bad Response");
  }
}
function convertToJson(res) {
  const jsonRes = res.json();
  if (res.ok) {
    return jsonRes;
  } else {
    throw { name: "servicesError", message: jsonRes };
  }
}
async function getData() {
  try {
    const response = await fetch(url);
    const data = await convertToJson(response);
    return data;
  } catch (error) {
    throw { errorMsg: error.message };
  }
}
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);

  return product;
}
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterBegin",
  clear = false,
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
export function renderWithTemplate(
  template,
  parentElement,
  position = "afterBegin",
  data,
  callback,
) {
  parentElement.insertAdjacentHTML(position, template);
  if (callback) callback(data);
}

async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

export async function loadHeaderFooter(
  homeHref = "index.html",
  tradesmenHref = "tradesmen/index.html",
  joinHref = "join/index.html",
  proximityHref = "proximity/index.html",
  twitterSrc = "",
  instagramSrc = "",
  youtubeSrc = "",
) {
  const headerTemp = await loadTemplate("../partials/header.html");
  const header = qs("header");
  const footerTemp = await loadTemplate("../partials/footer.html");
  const footer = qs("footer");

  renderWithTemplate(headerTemp.innerHTML, header);
  renderWithTemplate(footerTemp.innerHTML, footer);

  const homeLink = qs("#homeLink");
  const tradesmenLink = qs("#tradesmenLink");
  const proximityLink = qs("#proximityLink");
  const joinLink = qs("#joinLink");
  const twitterIcon = qs("#twitter");
  const instagramIcon = qs("#instagram");
  const youtubeIcon = qs("#youtube");

  if (homeLink) homeLink.href = homeHref;
  if (tradesmenLink) tradesmenLink.href = tradesmenHref;
  if (proximityLink) proximityLink.href = proximityHref;
  if (joinLink) joinLink.href = joinHref;
  if (twitterIcon) twitterIcon.src = twitterSrc;
  if (instagramIcon) instagramIcon.src = instagramSrc;
  if (youtubeIcon) youtubeIcon.src = youtubeSrc;
}

export function changeFormAction(path = "../product-listing/index.html") {
  const observer = new MutationObserver(() => {
    const searchForm = document.forms.searchForm;
    if (searchForm) {
      searchForm.setAttribute("action", path);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

export function activateHamburger() {
  const observer = new MutationObserver(() => {
    const menu = qs("#menu");
    const animateme = qs("#animateme");
    if (menu && animateme)
      menu.addEventListener("click", () => {
        animateme.classList.toggle("open");
        menu.classList.toggle("open");
      });
    observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
export async function renderTradesmen(){
  let count = 0;
  const tradesmen = await getData();
  setLocalStorage("tradesmenData", tradesmen);
  const container = qs(".tradesmen-container");
  container.innerHTML = "";
  tradesmen.forEach(tradesman => {
    count += 1;
    const card = document.createElement("div");
    const nonImg = document.createElement("div");
    card.setAttribute("class", "tradesman");
    const fullName = document.createElement("p");
    const location = document.createElement("p");
    const trade = document.createElement("p");
    const img = document.createElement("img");
    img.setAttribute("src", `../images/photos/tm-${count}.avif`);
    const button = document.createElement("button");
    button.innerText = "See more";
    button.addEventListener("click", () => {
      container.innerHTML = "";
      const tradesmanHTML = `
      <div class="details">
        <img src="../images/photos/tm-${count}.avif" alt="${tradesman.fullName}">
        <p>Name: ${tradesman.fullName}</p>
        <p>Trade: ${tradesman.trade}</p>
        <p>Location: ${tradesman.location}</p>
        <p>Phone: ${tradesman.phone}</p>
        <p>Experience: ${tradesman.yearsExperience} years</p>
        <p>Rating: ${tradesman.rating}</p>
        <a href="index.html">Back to Tradesmen List<a/>
        </div>
      `;
      renderWithTemplate(tradesmanHTML, container);
    })
    button.setAttribute("class", "detailsButton");
    fullName.innerHTML = `Name: ${tradesman.fullName}`;
    location.innerHTML = `Location: ${tradesman.location}`;
    trade.innerHTML = `Trade: ${tradesman.trade}`;
    img.alt = tradesman.fullName;
    nonImg.append(fullName, trade, location, button);
    card.append(img, nonImg);
    container.appendChild(card);
  });
}


