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
  const hash = window.location.hash;
  const controller = routes[hash] || homeController;
  controller();
}
