
import MainLogin from "@/view/login/MainLogin.vue";
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import MainPage from "@/view/MainPage.vue";
import MainLayout from "@/view/file/MainLayout.vue";
import MainSetting from "@/view/setting/MainSetting.vue";
import ShareLayout from "@/view/share/ShareLayout.vue";
import SharePage from "@/view/share/SharePage.vue";
import MainDetail from "@/view/detail/MainDetail.vue";
import Test from "@/view/test/test.vue"
import loginData from "@/common/loginData";
import TaskLayout from "@/view/task/TaskLayout.vue";
import UpLoadTask from "@/view/task/UpLoadTask.vue";

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
                component: MainLogin,
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
                path: 'task',
                component: TaskLayout,
                redirect: '/task/upload',
                meta:{needToken:true},
                children:[
                    {
                        path: 'upload',
                        component: UpLoadTask,
                        meta:{needToken:true}
                    },

                ]
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