import { qs } from "./utils.mjs";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class Alert {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  async renderElement() {
    const alerts = await this.getData();
    const section = document.createElement("section");
    const main = qs(".join-container");
    section.setAttribute("class", "alert-list");
    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.innerHTML = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      p.style.padding = "1rem";
      section.appendChild(p);
    });
    main.appendChild(section);
  }
}
