import { populateStart } from "./start-page.js";

function pageLoad() {
  document.addEventListener("DOMContentLoaded", () => {
    populateStart();
  });
}

export { pageLoad };