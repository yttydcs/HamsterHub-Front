<template>
  <div class="main switchTran">
    <div class="title">
      <h1>执行</h1>
    </div>

    <div class="uploadTaskBox switchTran">
      <div class="img">
        <fileIcon file-type="file"></fileIcon>
      </div>

      <div class="detail">
        <div class="upBox">
          <div class="name">name</div>
          <div class="action">
            <n-space justify="end"  style="width: 100%; height: 100%">

              <n-button class="button" text >
                <n-icon>
                  <Delete24Regular />
                </n-icon>
              </n-button>

              <n-button class="button" text >
                <n-icon>
                  <ArrowClockwise24Regular />
                </n-icon>
              </n-button>

              <n-button class="button" text >
                <n-icon>
                  <CaretForwardOutline />
                </n-icon>
              </n-button>

              <n-button class="button" text >
                <n-icon>
                  <PauseOutline />
                </n-icon>
              </n-button>


            </n-space>
          </div>
        </div>
        <div class="progress">
          <NProgress
            indicator-placement="inside"
            :percentage="20"
            :border-radius="4"
            :fill-border-radius="4"
            status="success"
          />
          
        </div>
      </div>



    </div>

    <div class="title">
      <h1>结束</h1>
    </div>
  </div>




</template>

<script>
import {NProgress, NIcon, useLoadingBar, useThemeVars, NButton, NSpace} from "naive-ui";
import {computed, h, reactive, ref, watch} from "vue";
import { BanOutline, PauseOutline, CaretForwardOutline } from "@vicons/ionicons5";
import { Recycle } from "@vicons/tabler";
import { Delete24Regular, ArrowClockwise24Regular, CaretRight24Regular, Pause20Regular } from "@vicons/fluent";
import FileExplorer from "@/components/explorer/FileExplorer.vue";
import DeviceUsage from "@/components/common/DeviceUsage.vue";

import curLang from "@/common/lang";
import strategy from "@/api/strategy";
import fileService from "@/service/hamster/file"
import fileMenu from "@/service/hamster/fileMenu"

import fileIcon from "@/components/explorer/FileIcon.vue";




function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export default {
  name: 'mainLayout',
  components: {
    NSpace,
    NIcon,
    NButton,
    NProgress,
    fileIcon,
    Delete24Regular,
    ArrowClockwise24Regular,
    CaretForwardOutline,
    PauseOutline,
  },
  methods:{
  },
  mounted() {
  },
  activated() {
  },

  setup(){
    let theme = useThemeVars();
    return{
      cubicBezierEaseInOut : theme.value.cubicBezierEaseInOut,
      hoverColor : computed(() => theme.value.hoverColor),
      titleColor : computed(() => theme.value.textColor2),
      collapsed: ref(false),
      curLang,
      fileMenu,
      fileService,
      loading:useLoadingBar(),
    }
  }
}
</script>

<style scoped>
.switchTran{
  transition:all 0.3s v-bind(cubicBezierEaseInOut);
}

.main{
  margin: 20px;
  text-align: left;
}

.title{
  margin-top: 30px;
}

.title h1{
  font-weight: 500;
  color: v-bind(titleColor);
}

.uploadTaskBox{
  padding: 10px;
  height: 50px;
  width: 100%;
  margin: 0 auto;
  border-radius: 5px;
}

.uploadTaskBox:hover{
  background-color: v-bind(hoverColor);
}

.img{
  display: inline-block;
  width: 50px;
  height: 50px;
  vertical-align: top;
  overflow: hidden;
}

.img svg{
  transform: translate(10%,10%);
  width: 90%;
  height: 90%;
}

.detail{
  display: inline-block;
  width: calc(100% - 90px);
  padding: 0 10px;
}

.name{
  height: 24px;
  line-height: 24px;
  display: inline-block;
  width: calc(100% - 120px);
  overflow: hidden;
}

.action{
  height: 24px;
  line-height: 24px;
  display: inline-block;
  width: 120px;
  overflow: hidden;
  text-align: center;
}

.button{
  height: 100%;
  font-size: 20px
}





</style>
