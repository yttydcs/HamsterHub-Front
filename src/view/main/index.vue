<template>
    <n-layout position="absolute" style="top: 64px; bottom: 64px;height: 100%" has-sider>
      <n-layout-sider
          :native-scrollbar="false"
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :collapsed="collapsed"
          show-trigger = "bar"
          @collapse="collapsed = true"
          @expand="collapsed = false"
      >
        <div class="menuBox">
          <n-menu
              :collapsed="collapsed"
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuOptions"
              class="menu-left"
              :on-update:value="handleMenuSelect"
          />
        </div>

        <div class="DeviceUsageBox" v-if="showDevice">
          <DeviceUsage
            v-show="curStrategy.total!=='' && curStrategy.total!==0"
            :title = "curStrategy.title"
            :free = "curStrategy.free"
            :total = "curStrategy.total"
            :mini = "collapsed"
            @click="()=>{collapsed = !collapsed}"
          />
        </div>

      </n-layout-sider>
      <n-layout class="main-layout" :native-scrollbar="true">
        <router-view></router-view>
      </n-layout>
    </n-layout>


</template>

<script setup>
import {NLayout, NLayoutSider, NMenu, NIcon, useLoadingBar} from "naive-ui";
import {h, onMounted, reactive, ref, watch, defineComponent} from "vue";
import { ShareSocialOutline, FolderOpenOutline,} from "@vicons/ionicons5";
import { TaskListSquareRtl24Regular, Rss24Regular } from "@vicons/fluent";
import DeviceUsage from "@/components/common/DeviceUsage.vue";
import curLang from "@/common/lang";
import strategy from "@/api/strategy";
import {useRoute, useRouter} from "vue-router";

defineComponent({
  name: 'MainIndex',
});

const menuOptions = reactive(
    [
    {
      label: curLang.lang.leftMenu.file,
      href: '',
      key: 'file',
      icon: renderIcon(FolderOpenOutline),
      ignoreChildren:true, // 标记切换语言时忽略子菜单
    },
    {
      label: curLang.lang.leftMenu.share,
      href: '/share',
      key: 'share',
      icon: renderIcon(ShareSocialOutline),
    },{
      label: curLang.lang.leftMenu.task,
      href: '',
      key: 'task',
      icon: renderIcon(TaskListSquareRtl24Regular),
      children: [
        {
          label: curLang.lang.leftMenu.upload,
          href: '',
          key: 'upload',
        },
        {
          label: curLang.lang.leftMenu.download,
          href: '',
          key: 'download',
        },
      ],
      },{
      label: curLang.lang.leftMenu.rssMenu,
      href: '',
      key: 'rssMenu',
      icon: renderIcon(Rss24Regular),
      children: [
        {
          label: curLang.lang.leftMenu.rss,
          href: '',
          key: 'rss',
        },
        {
          label: curLang.lang.leftMenu.rssTask,
          href: '',
          key: 'rssTask',
        },
      ],
    },
  ]
);

const route = useRoute();
const router = useRouter();
const collapsed = ref(false);
const curRoot = ref("");
const showDevice = ref(false);
const showRoot = ref("");
const curStrategy = reactive({title:"",free:"",total:""});
const strategys = reactive([]);
const loading = useLoadingBar();

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

// 获取可用的根目录
async function fetchRoot(){
  loading.start();
  try{
    let res = await strategy.query()

    let arr = res.data

    if(arr===undefined || arr.length<=0){
      return
    }

    menuOptions[0].children = []
    strategys.length = 0

    for (let i = 0; i < arr.length; i++) {
      menuOptions[0].children.push({
        label: arr[i].name,
        key: 'root-'+arr[i].root,
        data: arr[i].root,
        index: i
      })

      // 缓存 strategy
      strategys.push(arr[i]);
    }
    loading.finish();
  }catch (e) {
    loading.error();
  }
}

async function switchToRoot(root){
  loading.start()
  await router.push("/" + root);
  curRoot.value = root
  loading.finish()
}

async function setDeviceUsage(index,ob=null){
  let aim
  if(ob === null){
    if(index >= strategys.length){
      return
    }
    aim = strategys[index]
  }else{
    aim = ob
  }

  try {

    let strategySize = (await strategy.getStrategySize(aim.root)).data


    curStrategy.title = aim.name;
    curStrategy.free = strategySize.usable;
    curStrategy.total = strategySize.total;
  }catch (e) {
    // 隐藏剩余空间组件
    curStrategy.total = 0
  }

}

function handleMenuSelect(key,ob){
  if(key.substr(0,4)==="root"){
    switchToRoot(ob.data);
    showDevice.value = true;
  }else{
    router.push("/" + key);
    showDevice.value = false;
  }

}

function handleRoute(rootName){
  if(rootName === showRoot.value){
    return;
  }
  let index = null
  for (let i = 0; i < strategys.length; i++) {
    if(strategys[i].root === rootName){
      index = i;
    }
  }

  if(index!==null){
    setDeviceUsage(index);
    showRoot.value = rootName ;
    showDevice.value = true;
  }
}

function checkUrl(path){
  let url = path.split("/");

  // 初始状态自动导航到第一个策略
  if(url.length <=1 || (url.length ===2 && url[1]==="")){
    if(strategys.length > 0){
      router.push("/"+strategys[0].root)
    }
    return
  }

  let root = url[1];

  handleRoute(root)
}


onMounted(async () => {
  await fetchRoot()
  let path = router.currentRoute.value.fullPath
  checkUrl(path);
});


// 响应路由变化
watch(route, (newRoute) => {
  checkUrl(newRoute.fullPath);
});

// 响应语言变化
watch(curLang, () => {
  function setLangData(Option) {
    for (let i = 0; i < Option.length; i++) {
      if ("label" in Option[i]){
        Option[i].label =curLang.lang.leftMenu[Option[i].key];
      }

      // 如果还有子菜单就继续
      if("children" in Option[i] && !Option[i].ignoreChildren){
        setLangData(Option[i].children);
      }
    }
  }
  setLangData(menuOptions);
});
</script>

<style scoped>
.menu-left{
  text-align: left;
}

.DeviceUsageBox{
  padding: 10px;
}

.menuBox{
  height: calc(100vh - 130px);
  overflow-y: auto;
}

.main-layout{
  padding:0 12px 24px 12px;
  height: calc( 100% - 40px)
}
</style>
