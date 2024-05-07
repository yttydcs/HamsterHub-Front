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
          />
        </div>

      </n-layout-sider>
      <n-layout class="main-layout" :native-scrollbar="true">
        <router-view></router-view>
      </n-layout>
    </n-layout>


</template>

<script>
import {NLayout, NLayoutSider, NMenu, NIcon, useLoadingBar} from "naive-ui";
import {h, reactive, ref, watch} from "vue";
import {
  HomeOutline,
  ShareSocialOutline,
  FileTrayFullOutline,
  DocumentTextOutline,
  FolderOpenOutline,
  AddCircleOutline,
  FlagOutline,
  BookmarkOutline, CloudUploadOutline, CloudDownloadOutline
} from "@vicons/ionicons5";
import { Recycle } from "@vicons/tabler";
import {Collections24Regular, TaskListSquareRtl24Regular} from "@vicons/fluent";
import FileExplorer from "@/components/explorer/FileExplorer.vue";
import DeviceUsage from "@/components/common/DeviceUsage.vue";

import curLang from "@/common/lang";
import strategy from "@/api/strategy";
import fileService from "@/service/hamster/file"
import fileMenu from "@/service/hamster/fileMenu"
import {fileContextMenuOption} from "@/common/fileContextMenuOption";


const MenuOption = reactive(
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
      },



      // {
    //   label: curLang.lang.leftMenuFavorite,
    //   href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199',
    //   key: 'favorite',
    //   icon: renderIcon(Collections24Regular),
    // },{
    //   label: curLang.lang.leftMenuRecycle,
    //   href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199',
    //   key: 'recycle',
    //   icon: renderIcon(Recycle),
    // },{
    //   label: curLang.lang.leftMenuShortcut,
    //   key: 'shortcut',
    //   icon: renderIcon(BookmarkOutline),
    //   children: [
    //     {
    //       label: curLang.lang.leftMenuAdd,
    //       href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199',
    //       key: 'add',
    //       icon: renderIcon(AddCircleOutline),
    //     }
    //   ]
    // },
  ]
)


function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export default {
  name: 'mainLayout',
  components: {
    NLayout,
    NLayoutSider,
    NMenu,
    DeviceUsage,
  },
  methods:{
    // 获取可用的根目录
    async fetchRoot(){
      this.loading.start();
      try{
        let res = await strategy.query()

        let arr = res.data

        if(arr===undefined || arr.length<=0){
          return
        }

        MenuOption[0].children = []
        this.strategy.length = 0

        for (let i = 0; i < arr.length; i++) {
          MenuOption[0].children.push({
            label: arr[i].name,
            key: 'root-'+arr[i].root,
            data: arr[i].root,
            index: i
          })

          // 缓存 strategy
          this.strategy.push(arr[i]);
        }
        this.loading.finish();
      }catch (e) {
        this.loading.error();
      }
    },
    async switchToRoot(root){
      this.loading.start()
      this.$router.push("/"+root);
      this.curRoot = root
      this.loading.finish()
    },
    async setDeviceUsage(index,ob=null){
      let aim
      if(ob === null){
        if(index >= this.strategy.length){
          return
        }
        aim = this.strategy[index]
      }else{
        aim = ob
      }

      let strategySize = (await strategy.getStrategySize(aim.id)).data

      this.curStrategy.title = aim.name;
      this.curStrategy.free = strategySize.usable;
      this.curStrategy.total = strategySize.total;
    },
    handleMenuSelect(key,ob){
      if(key.substr(0,4)==="root"){
        this.switchToRoot(ob.data);
        this.showDevice = true;
      }else{
        this.$router.push("/" + key);
        this.showDevice = false;
      }

    },
    handleRoute(rootName){
      if(rootName === this.showRoot){
        return;
      }
      let index = null
      for (let i = 0; i < this.strategy.length; i++) {
        if(this.strategy[i].root === rootName){
          index = i;
        }
      }

      if(index!==null){
        this.setDeviceUsage(index);
        this.showRoot = rootName ;
        this.showDevice = true;
      }
    },
    checkUrl(path){
      let url = path.split("/");

      // 初始状态自动导航到第一个策略
      if(url.length <=1 || (url.length ===2 && url[1]==="")){
        if(this.strategy.length > 0){
          this.$router.push("/"+this.strategy[0].root)
        }
        return
      }

      let root = url[1];

      this.handleRoute(root)
    }
  },
  async mounted() {
    await this.fetchRoot()
    let path = this.$router.currentRoute.value.fullPath
    this.checkUrl(path);
  },
  // activated() {
  //   this.fetchRoot()
  // },
  watch: {
    // 响应路由变化
    $route(to, from) {
      this.checkUrl(to.fullPath);
    }
  },
  setup(){
    // 响应语言变化
    watch(curLang, () => {
      function setLangData(Option) {
        for (let i = 0; i < Option.length; i++) {
          if ("label" in Option[i]){
            Option[i].label =curLang.lang.leftMenu[Option[i].key] ;
          }

          // 如果还有子菜单就继续
          if("children" in Option[i] && !Option[i].ignoreChildren){
            setLangData(Option[i].children);
          }
        }
      }
      setLangData(MenuOption)
    });

    return{
      collapsed: ref(false),
      menuOptions: MenuOption,
      curRoot:ref(""),
      showDevice:ref(false),
      showRoot:ref(""),
      curStrategy:reactive({title:"",free:"",total:""}),
      strategy:reactive([]),
      curLang,
      fileMenu,
      fileService,
      loading:useLoadingBar(),
    }
  }
}
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
