import { aboutView } from "../../views/aboutView.js";

export function aboutController() {
  const app = document.getElementById("app");
  app.innerHTML = aboutView();
}
