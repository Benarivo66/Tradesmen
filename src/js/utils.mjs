const baseUrl = "https://run.mocky.io/v3/fcc87491-adbc-450f-b71f-a50e3198d397";
const imgUrl = "https://run.mocky.io/v3/8e7c989c-d369-4b68-ba37-52828eb6f1d8";
let currentPage = 1;  
const itemsPerPage = 10; 

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
async function getData(url) {
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

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let product;
  if(urlParams)
  product = urlParams.get(param);

  return product;
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
  tradesmenHref = "tradesmen/tradesmen.html",
  joinHref = "join/join.html",
  aboutHref = "about/about.html",
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
  const aboutLink = qs("#aboutLink");
  const joinLink = qs("#joinLink");
  const twitterIcon = qs("#twitter");
  const instagramIcon = qs("#instagram");
  const youtubeIcon = qs("#youtube");

  if (homeLink) homeLink.href = homeHref;
  if (tradesmenLink) tradesmenLink.href = tradesmenHref;
  if (aboutLink) aboutLink.href = aboutHref;
  if (joinLink) joinLink.href = joinHref;
  if (twitterIcon) twitterIcon.src = twitterSrc;
  if (instagramIcon) instagramIcon.src = instagramSrc;
  if (youtubeIcon) youtubeIcon.src = youtubeSrc;
}

export function changeFormAction(path = "../tradesmen/tradesmen.html") {
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
export function trackVisits() {
  const msToDays = 86400000;
  const lastVisitedElem = qs(".last-visited");
  const currentDayMS = Date.now();
  let lastVisit = getLocalStorage("lastVisit")
    ? parseInt(getLocalStorage("lastVisit"))
    : currentDayMS;
  let count = getLocalStorage("counta")
    ? parseInt(getLocalStorage("counta"))
    : 0;
  const diffInDays = () => (currentDayMS - lastVisit) / msToDays;
  if (count === 0) {
    lastVisitedElem.innerHTML = `<strong>Welcome! Let us know if you have any questions.</strong>`;
  } else if (diffInDays() < 1) {
    lastVisitedElem.innerHTML = `<strong>Back so soon! Awesome!</strong>`;
  } else if (diffInDays() >= 1) {
    if (parseInt(diffInDays().toFixed(0)) === 1)
      lastVisitedElem.innerHTML = `<strong>You last visited ${diffInDays().toFixed(
        0,
      )} day ago.</strong>`;
    else
      lastVisitedElem.innerHTML = `<strong>You last visited ${diffInDays().toFixed(
        0,
      )} days ago.</strong>`;
  }
  count += 1;
  setLocalStorage("lastVisit", currentDayMS);
  setLocalStorage("counta", count);
}
export function wayfinding() {
  const observer = new MutationObserver(() => {
    const currentPag = window.location.pathname.split("/").pop();
    document.querySelectorAll("#animateme span a").forEach((elem) => {
      const endPath = elem.getAttribute("href").split("/").pop();
      if (endPath === currentPag) {
        elem.classList.add("active");
      }
    });
    observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

export async function renderTradesmen(selectedTrade = "") {
  const tradesmen = await getData(baseUrl);
  const imgs = await getData(imgUrl);
  setLocalStorage("tradesmenData", tradesmen);
  setLocalStorage("tradesmenPhotos", imgs);
  const container = qs(".tradesmen-container");
  const paginationContainer = qs(".pagination-container");  

  container.innerHTML = "";
  paginationContainer.innerHTML = ""; 

  const filteredTradesmen = selectedTrade
    ? tradesmen.filter(tradesman =>
        tradesman.trade.toLowerCase() === selectedTrade.toLowerCase())
    : tradesmen;

  const totalPages = Math.ceil(filteredTradesmen.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTradesmen = filteredTradesmen.slice(startIndex, endIndex);

  paginatedTradesmen.forEach((tradesman, index) => {
    const photoIndex = index + 1;
    const card = document.createElement("div");
    const nonImg = document.createElement("div");
    card.setAttribute("class", "tradesman");
    const fullName = document.createElement("p");
    const location = document.createElement("p");
    const trade = document.createElement("p");
    const img = document.createElement("img");
    img.setAttribute("src", `${imgs[index][photoIndex]}`);
    const button = document.createElement("button");
    button.innerText = "See more";
    button.addEventListener("click", () => {
      container.innerHTML = "";
      const tradesmanHTML = `
      <div class="details">
        <img src=${imgs[index][photoIndex]} alt="${tradesman.fullName}">
        <p>Name: ${tradesman.fullName}</p>
        <p>Trade: ${tradesman.trade}</p>
        <p>Location: ${tradesman.location}</p>
        <p>Phone: ${tradesman.phone}</p>
        <p>Experience: ${tradesman.yearsExperience} years</p>
        <p>Rating: ${tradesman.rating}</p>
        <p>Age: ${tradesman.age}</p>
        <p>Gender: ${tradesman.gender}</p>
        <p>Special Skills: ${tradesman.specialSkills.join(", ")}</p>
        <p>Hobbies: ${tradesman.hobbies.join(", ")}</p>
        <a href="tradesmen.html">Back to Tradesmen List<a/>
      </div>
      `;
      renderWithTemplate(tradesmanHTML, container);
    });
    button.setAttribute("class", "detailsButton");
    fullName.innerHTML = `Name: ${tradesman.fullName}`;
    location.innerHTML = `Location: ${tradesman.location}`;
    trade.innerHTML = `Trade: ${tradesman.trade}`;
    img.alt = tradesman.fullName;
    nonImg.append(fullName, trade, location, button);
    card.append(img, nonImg);
    container.appendChild(card);
  });
  renderPaginationControls(totalPages, paginationContainer);
}

function renderPaginationControls(totalPages, container) {
  const prevButton = document.createElement("button");
  prevButton.innerText = "Previous";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    currentPage -= 1;
    renderTradesmen();  
  });

  const nextButton = document.createElement("button");
  nextButton.innerText = "Next";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => {
    currentPage += 1;
    renderTradesmen();
  });
  const pageNumberDisplay = document.createElement("span");
  pageNumberDisplay.innerText = `Page ${currentPage} of ${totalPages}`;
  container.appendChild(prevButton);
  container.appendChild(pageNumberDisplay);
  container.appendChild(nextButton);
}

