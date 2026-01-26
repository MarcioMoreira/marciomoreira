import { projectsView } from "../../views/projectsView.js";
import { getProjects } from "../../services/dataService.js";

export function projectsController() {
  const app = document.getElementById("app");
  const projects = getProjects();
  app.innerHTML = projectsView(projects);
}
