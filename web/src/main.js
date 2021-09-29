import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/style/style.scss"
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper.scss'

createApp(App)
    .use(store)
    .use(router)
    .use(VueAwesomeSwiper)
    .mount("#app");
