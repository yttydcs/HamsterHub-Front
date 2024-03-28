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

        <div class="DeviceUsageBox" v-show="!collapsed">
          <DeviceUsage
              v-show="curStrategy.total!=='' && curStrategy.total!==0"
            :title = "curStrategy.title"
            :free = "curStrategy.free"
            :total = "curStrategy.total"
          />

        </div>

      </n-layout-sider>
      <n-layout style="padding:0 12px 24px 12px;height: 100%" :native-scrollbar="true">
        <FileExplorer
            ref="explorer"
            :file-menu ="fileMenu"
            :file-service="fileService"
        />
      </n-layout>
    </n-layout>


</template>

<script>
import {NLayout, NLayoutSider, NMenu, NIcon, useLoadingBar} from "naive-ui";
import {h, reactive, ref, watch} from "vue";
import { HomeOutline,
  ShareSocialOutline,
  FileTrayFullOutline,
  DocumentTextOutline,
  FolderOpenOutline,
  AddCircleOutline,
  FlagOutline,
  BookmarkOutline
  } from "@vicons/ionicons5";
import { Recycle } from "@vicons/tabler";
import { Collections24Regular } from "@vicons/fluent";
import FileExplorer from "@/components/explorer/FileExplorer.vue";
import DeviceUsage from "@/components/common/DeviceUsage.vue";

import curLang from "@/common/lang";
import strategy from "@/api/strategy";
import fileService from "@/service/hamster/file"
import fileMenu from "@/service/hamster/fileMenu"


const MenuOption = reactive(
    [
    {
      label: curLang.lang.leftMenuFile,
      href: '',
      key: 'file',
      icon: renderIcon(FolderOpenOutline),
    },
    //   {
    //   label: curLang.lang.leftMenuShare,
    //   href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199',
    //   key: 'share',
    //   icon: renderIcon(ShareSocialOutline),
    // },{
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
    FileExplorer,
    DeviceUsage,
  },
  methods:{
    // 获取可用的根目录
    fetchRoot(){
      let that = this
      this.loading.start();
      strategy.query().then(res =>{
        let arr = res.data

        if(arr===undefined || arr.length<=0){
          that.curRoot = ""
          return
        }

        let fileListRoot = fileService.getFileListObject().root
        // 检查当前root是否存在
        for (let i = 0; i < arr.length; i++) {
          if(arr[i].root === fileListRoot){
            that.curRoot = fileListRoot
            break;
          }
        }

        // 首次进入设置第一个位选中
        if(that.curRoot === ""){
          that.switchToRoot(arr[0].root)
          // 重新获取root
          fileListRoot = fileService.getFileListObject().root
        }

        MenuOption[0].children = []
        that.strategy.length = 0

        for (let i = 0; i < arr.length; i++) {
          MenuOption[0].children.push({
            label: arr[i].name,
            key: 'root-'+arr[i].root,
            data: arr[i].root,
            index: i
          })

          // 缓存 strategy
          that.strategy.push(arr[i]);

          // 找出当前root 对应的strategy
          if(arr[i].root === fileListRoot){
            that.setDeviceUsage(i)
          }
        }
        that.loading.finish();
      }).catch((res)=>{
        that.loading.error();
      })
    },
    async switchToRoot(root){
      this.loading.start()
      await this.$refs.explorer.switchRoot(root)
      this.curRoot = root
      this.loading.finish()
    },
    setDeviceUsage(index,ob=null){
      let aim

      if(ob === null){
        aim = this.strategy[index]
      }else{
        aim = ob
      }

      this.curStrategy.title = aim.name;
      this.curStrategy.free = aim.size.usable;
      this.curStrategy.total = aim.size.total;
    },
    handleMenuSelect(key,ob){
      if(key.substr(0,4)==="root"){
        this.switchToRoot(ob.data)
      }
      this.setDeviceUsage(ob.index)
    },
  },
  mounted() {
    this.fetchRoot()
  },
  activated() {
    this.fetchRoot()
  },
  beforeRouteUpdate(to, from, next){
    this.$refs.explorer.handleFlush()
    next();
  },
  setup(){
    // 响应语言变化
    watch(curLang, () => {
      MenuOption[0].label = curLang.lang.leftMenuFile
      MenuOption[1].label = curLang.lang.leftMenuShare
      MenuOption[2].label = curLang.lang.leftMenuFavorite
      MenuOption[3].label = curLang.lang.leftMenuRecycle
      MenuOption[4].label = curLang.lang.leftMenuShortcut
      MenuOption[4].children[MenuOption[4].children.length-1].label = curLang.lang.leftMenuAdd
    });

    return{
      collapsed: ref(false),
      menuOptions: MenuOption,
      curRoot:ref(""),
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

<style>
.menu-left{
  text-align: left;
}

.DeviceUsageBox{
  padding: 10px;
}

.menuBox{
  height: calc(100vh - 140px);
  overflow-y: auto;
}
</style>
