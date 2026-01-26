import { homeController } from "../controllers/homeController.js";
import { aboutController } from "../controllers/aboutController.js";
import { projectsController } from "../controllers/projectsController.js";
import { contactController } from "../controllers/contactController.js";

const routes = {
  "": homeController,
  "#home": homeController,
  "#about": aboutController,
  "#projects": projectsController,
  "#contact": contactController
};

export function router() {
  let hash = window.location.hash;
  
  // Default to #home if no hash is present
  if (!hash || hash === "") {
    window.location.hash = "#home";
    return;
  }
  
  const controller = routes[hash] || homeController;
  controller();
}
