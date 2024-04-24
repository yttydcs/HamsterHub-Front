import { createApp } from 'vue'
import App from './App.vue'
import {create,NButton} from "naive-ui";
import router from "@/route/router";

const naive = create();

const app = createApp(App)
app.use(router).use(naive).mount('#app')



// // 指定全局引入的组件
// const  naive = create({
//     components:[NButton]
// })
//
// // 全局引入
// App.use(naive)
