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

        <n-menu
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            class="menu-left"

        />

      </n-layout-sider>
      <n-layout style="padding:0 12px 24px 12px;height: 100%" :native-scrollbar="true">

        <FileExplorer>

        </FileExplorer>

      </n-layout>
    </n-layout>


</template>

<script>
import {NLayout, NLayoutSider, NMenu, NIcon} from "naive-ui";
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

import FileExplorer from "@/view/main/FileExplorer.vue";

import curLang from "@/common/lang";



const MenuOption = reactive(
    [
    {
      label: curLang.lang.leftMenuFile,
      href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199',
      key: 'hear-the-wind-sing',
      icon: renderIcon(FolderOpenOutline),
    },  {
      label: curLang.lang.leftMenuShare,
      href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199',
      key: 'hear-the-wind-sing',
      icon: renderIcon(ShareSocialOutline),
    },{
      label: curLang.lang.leftMenuFavorite,
      href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199',
      key: 'hear-the-wind-sing',
      icon: renderIcon(Collections24Regular),
    },{
      label: curLang.lang.leftMenuRecycle,
      href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199',
      key: 'hear-the-wind-sing',
      icon: renderIcon(Recycle),
    },{
      label: curLang.lang.leftMenuShortcut,
      key: 'people',
      icon: renderIcon(BookmarkOutline),
      children: [
        {
          label: curLang.lang.leftMenuAdd,
          href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199',
          key: 'hear-the-wind-sing',
          icon: renderIcon(AddCircleOutline),
        }
      ]
    },
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
    FileExplorer
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
      curLang
    }
  }
}
</script>

<style>
.menu-left{
  text-align: left;
}
</style>
