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
        component: () => import("../views/category/CategoryCreate.vue"),
      },
      {
        path: "/category/create",
        component: () => import("../views/category/CategoryCreate.vue"),
      },
      //装备
      {
        path: "/equipment",
        component: () => import("../views/equipment/EquipmentList.vue"),
      },
      {
        path: "/equipment/edit/:id",
        props: true,
        component: () => import("../views/equipment/EquipmentCreate.vue"),
      },
      {
        path: "/equipment/create",
        component: () => import("../views/equipment/EquipmentCreate.vue"),
      },
      //英雄
      {
        path: "/hero",
        component: () => import("../views/hero/HeroList.vue"),
      },
      {
        path: "/hero/edit/:id",
        props: true,
        component: () => import("../views/hero/HeroCreate.vue"),
      },
      {
        path: "/hero/create",
        component: () => import("../views/hero/HeroCreate.vue"),
      },
      //新闻资讯
      {
        path: "/news",
        component: () => import("../views/news/NewsList.vue"),
      },
      {
        path: "/news/edit/:id",
        props: true,
        component: () => import("../views/news/NewsCreate.vue"),
      },
      {
        path: "/news/create",
        component: () => import("../views/news/NewsCreate.vue"),
      },
    ]
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
