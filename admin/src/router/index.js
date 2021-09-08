import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/category",
        component: () =>
          import("../views/category/CategoryList.vue"),
      },
      {
        path: "/category/:id",
        name: "category",
        component: () =>
          import("../views/category/CategoryAdd.vue"),
      },
    ]
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
