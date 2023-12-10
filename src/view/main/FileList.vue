<template>
  <div class="file-list-box">
    <n-grid :x-gap="8" :y-gap="4" cols="1 310:2 460:3 610:4 760:5 910:6 1060:7 1210:8 1360:9 1510:10 1660:11 1810:12 1960:13">
      <n-grid-item v-for="(file,index) in fileList.file" :key="index">
        <FileBox class="file-list-box-item"
                 :file-index="index"
                 :file-name="file.name"
                 :file-img-url="file.url"
                 :file-select="file.selected"
                 :file-click="fileClick"
                 :db-click="openFile"
        />
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script>
import {NGridItem,NGrid} from "naive-ui";
import {h, ref} from "vue";
import { fileList } from "@/common/fileList"

import FileBox from "@/components/explorer/FileBox.vue";

export default {
  name: 'FileList',
  methods:{
    fileClick(index){
      fileList.file[index].selected = !fileList.file[index].selected
    },
    openFile(index){
      if(fileList.file[index].is_dir){
        fileList.path.push(fileList.file[index].name)
        this.changePath()
      }
    }
  },
  components: {
    FileBox,
    NGridItem,
    NGrid
  },
  props: {
    changePath:Function
  },
  setup(){
    return{
      fileList
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
</style>
