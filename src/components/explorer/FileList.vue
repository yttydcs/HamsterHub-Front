<template>
  <div class="file-list-box">
    <n-grid :x-gap="8" :y-gap="4" cols="1 310:2 460:3 610:4 760:5 910:6 1060:7 1210:8 1360:9 1510:10 1660:11 1810:12 1960:13">
      <n-grid-item v-for="(file,index) in fileList.file" :key="index">
        <FileBox class="file-list-box-item anti-text-select"
                 :file-index="index"
                 :file-name="file.name"
                 :file-img-url="file.url"
                 :file-select="file.selected"
                 :file-click="fileClick"
                 :db-click="enterPath"
                 :isDir="fileList.file[index].is_dir"
        />
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script>
import {NGridItem,NGrid} from "naive-ui";
import {h, ref} from "vue";
import { addPath } from "@/common/fileList"

import FileBox from "@/components/explorer/FileBox.vue";

export default {
  name: 'FileList',
  components: {
    FileBox,
    NGridItem,
    NGrid
  },
  props: {
    fileList:Object,
    fileClick:Function,
    enterPath:Function
  },
  setup(){
    return{
    }
  }
}
</script>

<style>
.file-list-box{
  text-align: left;
}

.file-list-box-item{
  margin: 5px;

}

.anti-text-select{
  -webkit-touch-callout:none;  /*系统默认菜单被禁用*/
  -webkit-user-select:none; /*webkit浏览器*/
  -khtml-user-select:none; /*早期浏览器*/
  -moz-user-select:none;/*火狐*/
  -ms-user-select:none; /*IE10*/
  user-select:none;
}
</style>
