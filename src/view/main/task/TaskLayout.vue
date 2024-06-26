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

<script setup>
import {NLayout, NLayoutSider, NMenu, NIcon, useLoadingBar} from "naive-ui";
import {h, reactive, ref, watch, defineComponent} from "vue";
import { CloudDownloadOutline, CloudUploadOutline } from "@vicons/ionicons5";
import curLang from "@/common/lang";

defineComponent({
  name: 'TaskLayout',
});

const menuOptions = reactive(
    [
    {
      label: curLang.lang.taskUpload.title,
      href: '',
      key: 'upload',
      icon: renderIcon(CloudUploadOutline),
    },
    {
      label: curLang.lang.taskDownload.title,
      href: '',
      key: 'cloudDownload',
      icon: renderIcon(CloudDownloadOutline),
    },

  ]
)
const collapsed = ref(false);
const loading = useLoadingBar()

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

function handleMenuSelect(key,ob){
  if(key==="upload"){
    this.$router.push("/task/upload");
  }
}

watch(curLang, () => {
  menuOptions[0].label = curLang.lang.taskUpload.title
  menuOptions[1].label = curLang.lang.taskDownload.title
});
</script>

<style>
.menu-left{
  text-align: left;
}

</style>
