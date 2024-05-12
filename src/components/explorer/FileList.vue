<template>
  <div class="file-list-box">
    <n-grid
        :x-gap="8"
        :y-gap="4"
        cols="1 310:2 460:3 610:4 760:5 910:6 1060:7 1210:8 1360:9 1510:10 1660:11 1810:12 1960:13"
        v-if="!boxStyle"
    >
      <n-grid-item v-for="(file,index) in fileList.file" :key="index">
        <FileBox class="file-list-box-item anti-text-select"
                 :file-index="index"
                 :file-name="file.name"
                 :file-img-url="file.url"
                 :file-select="file.selected"
                 :file-click="fileClick"
                 :db-click="enterPath"
                 :isDir="fileList.file[index].is_dir"
                 :show-menu="showMenu"
                 :box-style="boxStyle"
                 :size="file.size"
                 :modified="file.modified"
                 :draggable="fileList.writable"
                 @dragend="dragend"
                 @dragstart="(e)=>dragstart(e,file)"
                 @drop.prevent="(e)=>dragDrop(e,file)"
        />
      </n-grid-item>
    </n-grid>

    <div
        v-else
        v-for="(file,index) in fileList.file" :key="index"
    >
      <FileBox class="file-list-box-item anti-text-select"
               :file-index="index"
               :file-name="file.name"
               :file-img-url="file.url"
               :file-select="file.selected"
               :file-click="fileClick"
               :db-click="enterPath"
               :isDir="fileList.file[index].is_dir"
               :show-menu="showMenu"
               :box-style="boxStyle"
               :size="file.size"
               :modified="file.modified"
               :draggable="fileList.writable"
               @dragend="dragend"
               @dragstart="(e)=>dragstart(e,file)"
               @drop.prevent="(e)=>dragDrop(e,file)"
      />

    </div>
  </div>
</template>

<script>
import {NGridItem,NGrid} from "naive-ui";

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
    enterPath:Function,
    showMenu:Function,
    boxStyle:String,
    moveFunc:Function,
  },
  methods: {
    dragstart(e,file){
      let target = []
      if(file.selected){
        let files = this.fileList.file
        for (let i = 0; i < files.length; i++) {
          if(files[i].selected){
            target.push(files[i].other.id)
          }
        }
      }else{
        target.push(file.other.id)
      }
      e.dataTransfer.setData('dragFile', target)
    },
    dragend(e){
      // 防止下次移动冲突
      this.dragFile.length=0;
    },
    dragDrop(e,file){
      if(!file.is_dir){
        return;
      }
      let to = file.other.id;
      let str = e.dataTransfer.getData('dragFile')

      if(!str ){
        return
      }
      let files = str.split(",");
      if(files.length <= 0){
        return;
      }

      for (let i = 0; i < files.length; i++) {
        let from = files[i]
        this.moveFunc(from ,to );
      }
    },

  },
  setup(){
    return{
      dragFile:[]
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
