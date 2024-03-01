
import mainLogin from "@/view/login/MainLogin.vue";
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import MainPage from "@/view/MainPage.vue";
import MainLayout from "@/view/main/MainLayout.vue";
import MainSetting from "@/view/setting/MainSetting.vue";
import ShareLayout from "@/view/share/ShareLayout.vue";
import SharePage from "@/view/share/SharePage.vue";
import MainDetail from "@/view/detail/MainDetail.vue";
import Test from "@/view/test/test.vue"
import loginData from "@/common/loginData";


// 构建路由
const routes = [
    {
        path: '/',
        component: MainPage,
        children:[
            {
                path: '',
                component: MainLayout,
                meta:{needToken:true}
            },
            {
                path: 'login',
                component: mainLogin,
                meta:{needToken:false}
            },
            {
                path: 'setting',
                component: MainSetting,
                meta:{needToken:false}
            },
            {
                path: 'share',
                component: ShareLayout,
                meta:{needToken:true}
            },
            {
                path: 's/:ticket',
                component: SharePage,
                meta:{needToken:false}
            },
            {
                path: 'detail',
                component: MainDetail,
                meta:{needToken:true}
            },
            {
                path: 'test',
                component: Test,
                meta:{needToken:false}
            },
            {
                path: '/:file*',
                component: MainLayout,
                meta:{needToken:true}
            },


        ]


    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})


// 全局路由管理
router.beforeEach((to, from, next) => {
    //如果路由需要跳转
    if (to.meta.needToken) {
        // 检查登陆状态
        if (loginData.loginState) {
            next()  //放行
        } else {

            window.$notification["error"]({
                title:"您尚未登陆",
                description:"已经为您导航至登陆页面",
                duration:3000
            })

            next("/login")
        }
    } else {
        // 无需登陆则放行
        next()
    }
})

export default router