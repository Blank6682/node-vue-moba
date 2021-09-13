import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "tailwindcss/tailwind.css"

const app = createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)


app.mount("#app")

