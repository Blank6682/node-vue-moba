import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/categorie",
        component: () =>
          import("../views/categorie/CategorieList.vue"),
      },
      {
        path: "/categorie/add",
        component: () =>
          import("../views/categorie/CategorieAdd.vue"),
      },
    ]
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
