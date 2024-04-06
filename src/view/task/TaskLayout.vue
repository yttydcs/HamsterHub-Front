<template>
    <n-layout position="absolute" style="top: 64px; bottom: 64px;height: 100%" has-sider>
      <n-layout-sider
          :native-scrollbar="false"
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :collapsed="collapsed"
          @collapse="collapsed = true"
          @expand="collapsed = false"
      >

          <n-menu
              :collapsed="collapsed"
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuOptions"
              class="menu-left"
              :on-update:value="handleMenuSelect"
          />




      </n-layout-sider>
      <n-layout style="padding:0 12px 24px 12px;height: 100%" :native-scrollbar="true">
        <router-view></router-view>
      </n-layout>
    </n-layout>


</template>

<script>
import {NLayout, NLayoutSider, NMenu, NIcon, useLoadingBar} from "naive-ui";
import {h, reactive, ref, watch} from "vue";
import { HomeOutline,
  ShareSocialOutline,
  FileTrayFullOutline,
  CloudDownloadOutline,
  FolderOpenOutline,
  CloudUploadOutline,
  } from "@vicons/ionicons5";
import { Recycle } from "@vicons/tabler";
import { Collections24Regular } from "@vicons/fluent";


import curLang from "@/common/lang";
import strategy from "@/api/strategy";
import fileService from "@/service/hamster/file"
import fileMenu from "@/service/hamster/fileMenu"


const MenuOption = reactive(
    [
    {
      label: "文件上传",
      href: '',
      key: 'upload',
      icon: renderIcon(CloudUploadOutline),
    },
    {
      label: "离线下载",
      href: '',
      key: 'cloudDownload',
      icon: renderIcon(CloudDownloadOutline),
    },

  ]
)


function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export default {
  name: 'TaskLayout',
  components: {
    NLayout,
    NLayoutSider,
    NMenu,
  },
  methods:{
    handleMenuSelect(key,ob){
      if(key==="upload"){
        this.$router.push("/task/upload");
      }
    },
  },
  mounted() {
  },
  activated() {
  },

  setup(){


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

</style>
