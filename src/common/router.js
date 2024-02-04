
import mainLogin from "@/view/login/MainLogin.vue";
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import MainPage from "@/view/MainPage.vue";
import MainLayout from "@/view/main/MainLayout.vue";
import MainSetting from "@/view/setting/MainSetting.vue";
import ShareLayout from "@/view/share/ShareLayout.vue";
import SharePage from "@/view/share/SharePage.vue";
import MainDetail from "@/view/detail/MainDetail.vue";
import Test from "@/view/test/test.vue"


// 构建路由
const routes = [
    {
        path: '/',
        component: MainPage,
        children:[
            {
                path: '',
                component: MainLayout
            },
            {
                path: 'login',
                component: mainLogin
            },
            {
                path: 'setting',
                component: MainSetting
            },
            {
                path: 'share',
                component: ShareLayout
            },
            {
                path: 's/:ticket',
                component: SharePage
            },
            {
                path: 'detail',
                component: MainDetail
            },
            {
                path: 'test',
                component: Test
            },
            {
                path: '/:file*',
                component: MainLayout
            },


        ]


    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router