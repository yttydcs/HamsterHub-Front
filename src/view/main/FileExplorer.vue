<template>
  <div class="explorer-box" ref="containerRef">
    <div class="file-path">

        <n-breadcrumb class="path-breadcrumb" >
          <n-breadcrumb-item>
            <n-icon :component="HomeOutline" @click="pathClick(-1)" /> </n-breadcrumb-item>
          <n-breadcrumb-item v-for="(path,index) in fileData.path" :key="index" @click="pathClick(index)">{{ path }}</n-breadcrumb-item>
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



    <div class="file-list-p">
      <n-layout :native-scrollbar="false" style="height: 100%">
        <file-list
            style="padding-right: 24px"
            :change-path="getFileData"
        />

      </n-layout>
    </div>
  </div>



</template>

<script>
import {NBreadcrumb, NBreadcrumbItem, NLayout, NIcon, NSpace, useThemeVars, NButton} from "naive-ui";
import {ref, computed} from "vue";

import FileList from "@/view/main/FileList.vue";
import {HomeOutline, LanguageOutline} from "@vicons/ionicons5";
import { fileList as fileData } from "@/common/fileList"
import file from "@/api/file"



import {
  ArrowClockwise24Regular,
  AppsListDetail24Regular,
  AppFolder24Regular,

} from "@vicons/fluent";


import hamster from "@/common/adapter/hamster";
import alist from "@/common/adapter/alist";
const _adapters = [hamster, alist];

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
    AppFolder24Regular
  },
  methods:{
    pathClick(index){
      fileData.path.length = index+1;
      this.getFileData()
    },
    getFileData(){
      const adapterOption = 0;
      const that = this;
      if(adapterOption === 0){
        file[adapterOption].getFile("1","0")
          .then(function (res) {
            if (that.adapters[adapterOption].judgeLoginCode(res.code)) {
              that.adapters[adapterOption].setFileData(res)
          }
        })
      }else if(adapterOption === 1){
        file[adapterOption].getFile("/"+fileData.path.join("/"),undefined,undefined,undefined,undefined,1)
          .then(function (res) {
            if (that.adapters[adapterOption].judgeLoginCode(res.code)) {
              that.adapters[adapterOption].setFileData(res)
            }
          })
      }



    },
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
      adapters:_adapters
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
