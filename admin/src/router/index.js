import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      //分类
      {
        path: "/category",
        component: () => import("../views/category/CategoryList.vue"),
      },
      {
        path: "/category/edit/:id",
        props: true,
        component: () => import("../views/category/CategoryAdd.vue"),
      },
      {
        path: "/category/create",
        component: () => import("../views/category/CategoryAdd.vue"),
      },
      //英雄
      {
        path: "/hero",
        component: () => import("../views/hero/HeroList.vue"),
      },
      {
        path: "/hero/edit/:id",
        props: true,
        component: () => import("../views/hero/HeroAdd.vue"),
      },
      {
        path: "/hero/create",
        component: () => import("../views/hero/HeroAdd.vue"),
      },
    ]
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
