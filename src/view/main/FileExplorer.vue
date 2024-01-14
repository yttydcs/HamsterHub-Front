<template>
  <div class="explorer-box" ref="containerRef" @dragover.prevent @drop.prevent="handleDrop">
    <div class="file-path">

        <n-breadcrumb class="path-breadcrumb" >
          <n-breadcrumb-item>
            <n-icon :component="HomeOutline" @click="pathClick(-1)" /> </n-breadcrumb-item>
          <n-breadcrumb-item v-for="(path,index) in fileData.path" :key="index" @click="pathClick(index)">{{ path["label"] }}</n-breadcrumb-item>
        </n-breadcrumb>

      <div class="path-control">
        <n-space justify="space-around"  style="height: 100%">
          <n-button text style="font-size: 20px" @click="getFileData">
            <n-icon>
              <ArrowClockwise24Regular />
            </n-icon>
          </n-button>

          <n-button text style="font-size: 20px" @click="getFileData">
            <n-icon>
              <AppsListDetail24Regular />
            </n-icon>
          </n-button>

          <n-button text style="font-size: 20px" @click="getFileData">
            <n-icon>
              <AppFolder24Regular />
            </n-icon>
          </n-button>
        </n-space>

      </div>
    </div>



    <div class="file-list-p" @contextmenu="handleContextMenuShow">
      <n-layout :native-scrollbar="false" style="height: 100%">
        <file-list
            style="padding-right: 24px"
            :change-path="getFileData"
        />

      </n-layout>
    </div>

    <!--  文件列表的右键菜单  -->

    <n-dropdown
        placement="bottom-start"
        trigger="manual"
        :x="contextMenu.x"
        :y="contextMenu.y"
        :options="contextMenu.options"
        :show="contextMenu.isShow"
        :on-clickoutside="handleClickOutside"
        @select="handleContextMenuSelect"
    />

    <!--  新建文件夹  -->
    <InputBox
        title="新建文件夹"
        v-model:show="inputShow"
        :confirm-func="handleNewDir"
        :cancel-func="() =>{this.inputShow=false}"
    />

  </div>



</template>

<script>
import {NBreadcrumb, NBreadcrumbItem, NLayout, NIcon, NSpace, useThemeVars, NButton, NDropdown} from "naive-ui";
import {ref, computed, watch, reactive, nextTick } from "vue";

import FileList from "@/view/main/FileList.vue";
import {HomeOutline, LanguageOutline} from "@vicons/ionicons5";
import {fileList as fileData, getCurPathNode, getPathString, getCurRoot, popPathTo} from "@/common/fileList"
import file from "@/api/file"



import {
  ArrowClockwise24Regular,
  AppsListDetail24Regular,
  AppFolder24Regular,

} from "@vicons/fluent";


import hamster from "@/common/adapter/hamster";
import alist from "@/common/adapter/alist";

import curLang from "@/common/lang";
const _adapters = [hamster, alist];

import {fileContextMenuOption,openMenuByCondition,closeAllMenu,findByKey} from "@/common/fileContextMenuOption";

import InputBox from "@/components/common/InputBox.vue";


export default {
  name: 'mainLayout',
  computed: {
    HomeOutline() {
      return HomeOutline
    },
    BorderColor(){
      return useThemeVars().value.borderColor
    }
  },
  components: {
    NButton,
    NLayout,
    FileList,
    NBreadcrumb,
    NBreadcrumbItem,
    NIcon,
    NSpace,
    ArrowClockwise24Regular,
    AppsListDetail24Regular,
    AppFolder24Regular,
    NDropdown,
    InputBox,
  },
  methods:{
    pathClick(index){
      fileData.path.length = index+1;
      this.getFileData()
    },
    getFileData(){
      const adapterOption = fileData.device;
      const that = this;
      if(adapterOption === 0){
        this.curParent = getCurPathNode().id
        file[adapterOption].getFile(getCurRoot(),this.curParent)
          .then(function (res) {
            if (that.adapters[adapterOption].judgeLoginCode(res.code)) {
              that.adapters[adapterOption].setFileData(res)
          }
        })
      }else if(adapterOption === 1){
        file[adapterOption].getFile(getPathString(),undefined,undefined,undefined,undefined,1)
          .then(function (res) {
            if (that.adapters[adapterOption].judgeLoginCode(res.code)) {
              that.adapters[adapterOption].setFileData(res)
            }
          })
      }
    },
    async handleDrop(event){
      event.preventDefault();
      const  files = event.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        await file[0].uploadFile(this.fileData.root,this.curParent,"",files[i])
      }
    },
    handleContextMenuShow(event){
      // 阻止默认行为
      event.preventDefault();

      // 仅打开部分，其他选项需要选中文件。
      openMenuByCondition(0)

      // 使其具备一定的关闭效果
      this.contextMenu.isShow = false
      nextTick().then(() => {
        this.contextMenu.isShow = true
        this.contextMenu.x = event.clientX;
        this.contextMenu.y = event.clientY;
      });
    },
    handleContextMenuSelect(key){
      this.closeContextMenu()
      this.invokeMenuHandle(key)
    },
    handleClickOutside() {
      this.closeContextMenu()
    },
    closeContextMenu(){
      this.contextMenu.isShow = false;
      closeAllMenu()
    },
    invokeMenuHandle(key){
      console.log(key)
      switch(key){
        case "newDir":
          this.inputShow = true
          break;
        case "delete":
          this.handleDelete(key)
          break;
        case "download":
          this.handleDownload(key)
          break;

      }
    },
    async handleNewDir(value){ // 执行文件夹创建
      this.inputShow = false
      console.log(fileData.root,this.curRoot)
      await file[0].mkDir(fileData.root,this.curParent,value)
      this.getFileData()
    },
    async handleDelete(key){ // 执行文件删除
      let aim = fileContextMenuOption[findByKey(key)].data;
      let vFile = fileData.file[aim];
      let fileId = vFile.other.id
      await file[0].delete(fileId)
      this.getFileData()
    },
    async handleDownload(key){ // 执行文件删除
      let aim = fileContextMenuOption[findByKey(key)].data;
      let vFile = fileData.file[aim];
      let fileId = vFile.other.id
      // download
      // console.log(vFile)
      // console.log(process.env["VUE_APP_URL"]+"api/download?vFileId="+fileId)
      console.log(file[0].download(fileId,vFile.name))

    }
  },
  watch:{
    fileData:{
      handler(val,oldVal){
        if(val.root !== this.curRoot){
          this.getFileData()
          this.curRoot = val.root
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getFileData()
  },
  activated() {
    this.getFileData()
  },
  setup(){
    let theme = useThemeVars();
    let borderColor = computed(() => theme.value.borderColor);

    return{
      collapsed: ref(false),
      borderColor,
      cubicBezierEaseInOut : theme.value.cubicBezierEaseInOut,
      fileData,
      adapters:_adapters,
      curRoot:"0",
      curParent:"0",
      contextMenu:reactive({
        isShow:false,
        options:fileContextMenuOption,
        x:0,
        y:0,
      }),
      inputShow:ref(false),
    }
  }
}
</script>

<style>

.explorer-box{
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.file-path{
  height: 40px;
  text-align: left;
  margin-top: 3px;
  margin-bottom: 3px;
  margin-left: 5px;
  width: calc( 100% - 23px );
  /*

  不用边框好看一点

  transition:border 0.3s v-bind(cubicBezierEaseInOut);
  border: 1px solid v-bind(borderColor);
  border-radius: 10px;
  */
  display: flex;
  align-items: center;
  vertical-align: center;
  overflow: hidden;
}

.path-control{
  display: flex;
  align-items: center;
  height: 100%;
}

.path-control button{
  margin-left: 10px;
  height: 100%;
}

.path-breadcrumb{
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-right: auto;
  overflow-y: auto;
}

.file-list-p{
  height: calc( 100% - 50px );
  overflow: hidden;
}



</style>
