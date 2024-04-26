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

<script>
import curLang from "../../common/lang";
import {theme} from "@/common/theme";
import {reactive, ref, watch} from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';


const defaultTheme = "github"
let scrollElement = document.querySelector('#app > div > div.n-layout.n-layout--static-positioned > div')

export default {
  name: 'markdownBox',
  components: {
    MdPreview,
    MdCatalog,

  },
  props:{
    mdText:String,
    showCatalog:Boolean
  },
  mounted() {
    // 获取用于滚动的元素(naive ui 专门给了一个用于实现自定义滚动条的元素，所以不能用户根元素滚动了)
    this.scrollElement = document.querySelector('#app > div > div.n-layout.n-layout--static-positioned > div')
  },
  setup(){
    return{
      curLang,
      id: ref('preview-only'),
      scrollElement ,
      preTheme : window.config.mdTheme || defaultTheme,
      theme
    }
  }
}
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
