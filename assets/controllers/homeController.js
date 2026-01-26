import { homeView } from "../../views/homeView.js";

export function homeController() {
  const app = document.getElementById("app");
  app.innerHTML = homeView();
}
