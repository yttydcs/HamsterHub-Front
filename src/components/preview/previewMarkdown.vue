<template>
  <div class="markdownBox">
    <MdPreview
        class="preview"
        :editorId="id"
        :modelValue="mdText"
        :previewTheme="preTheme"
        :theme="theme.mdTheme"
        :style="{ 'width': showCatalog? 'width: 1000px;' : '100%'  }"
    />
    <div class="catalog" v-if="showCatalog">
      <MdCatalog  :editorId="id" :scrollElement="scrollElement" />
    </div>

  </div>

</template>

<script setup>

import {theme} from "@/common/theme";
import {onMounted, reactive, ref, watch} from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

const defaultTheme = "github";
const props = defineProps({ mdText:String, showCatalog:Boolean });
const id = ref('preview-only');
const scrollElement = ref(null); ;
const preTheme = window.hamsterHubConfig.mdTheme || defaultTheme;

onMounted(()=>{
  // 获取用于滚动的元素(naive ui 专门给了一个用于实现自定义滚动条的元素，所以不能用户根元素滚动了)
  scrollElement.value = document.querySelector('#app > div > div.n-layout.n-layout--static-positioned > div')
})

</script>

<style scoped>
.markdownBox{
  text-align: center;
  width: 100%;
}

.preview{
  text-align: left;
  display: inline-block;
  width: 1000px;
  vertical-align: top;
}



.catalog{
  top: 0;
  position: -webkit-sticky;
  position: sticky;
  padding-top: 20px;
  display: inline-block;
  width: 300px;
  vertical-align: top;
  height: calc( 100vh - 80px ); /* nav的高度(60) + padding的高度(20) */
  overflow: auto;
}

</style>
