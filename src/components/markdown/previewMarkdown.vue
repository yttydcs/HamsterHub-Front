<template>
  <div class="markdownBox settingBox">
    <MdCatalog :editorId="id" :scrollElement="scrollElement" />
    <MdPreview :editorId="id" :modelValue="mdText" :previewTheme="preTheme" :theme="theme.mdTheme"/>

  </div>

</template>

<script>
import curLang from "../../common/lang";
import {theme} from "@/common/theme";
import {reactive, ref, watch} from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';


const defaultTheme = "github"

export default {
  name: 'markdownBox',
  components: {
    MdPreview,
    MdCatalog
  },
  props:{
    mdText:String
  },
  setup(){
    return{
      curLang,
      id: ref('preview-only'),
      scrollElement : reactive(document.documentElement) ,
      preTheme : window.config.mdTheme || defaultTheme,
      theme
    }
  }
}
</script>

<style scoped>

</style>
