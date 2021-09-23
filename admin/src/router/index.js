import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";

const routes = [
  // {
  //   path: "",
  //   redirect: "/login"
  // },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/login.vue")
  },
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
      //广告
      {
        path: "/ad",
        component: () => import("../views/ad/AdList.vue"),
      },
      {
        path: "/ad/edit/:id",
        props: true,
        component: () => import("../views/ad/AdCreate.vue"),
      },
      {
        path: "/ad/create",
        component: () => import("../views/ad/AdCreate.vue"),
      },
<<<<<<< HEAD
      //管理员
=======
      //广告
>>>>>>> 5f755bb8cb446f8ac723f0ca0beb7285dd0454cc
      {
        path: "/user",
        component: () => import("../views/user/UserList.vue"),
      },
      {
        path: "/user/edit/:id",
        props: true,
        component: () => import("../views/user/UserCreate.vue"),
      },
      {
        path: "/user/create",
        component: () => import("../views/user/UserCreate.vue"),
      },
    ]
  },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


//刷新页面，重新设置token
if (sessionStorage.getItem("token")) {
  store.commit("login", sessionStorage.getItem("token"))
}

<<<<<<< HEAD
//路由守卫
=======
// //路由守卫
>>>>>>> 5f755bb8cb446f8ac723f0ca0beb7285dd0454cc
// router.beforeEach((to, form, next) => {
//   //登录则清除token
//   if (to.path == "/login") {
//     store.commit("logout", sessionStorage.removeItem("token"))
//     next()
//   } else {
//     const token = sessionStorage.getItem("token")
//     if (!token) {
//       next({
//         path: "/login",
//         query: {
//           redirect: to.fullPath
//         }
//       })
//     }
//   }
//   next()
// })

export default router;
