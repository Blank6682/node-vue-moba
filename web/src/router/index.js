import { createRouter, createWebHistory } from "vue-router";
import Main from '../views/Main.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [{
      path: "/",
      component: () => import("../views/Home.vue")
    }
    ]
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
