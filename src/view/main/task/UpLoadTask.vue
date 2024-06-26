<template>
  <div class="main switchTran">
    <div class="title">
      <h1>{{ curLang.lang.taskUpload.doing }}</h1>
    </div>

    <div class="uploadTaskBox switchTran" v-for="(item,index) in uploadTask.doing" :key="index">
      <div class="img">
        <fileIcon :file-type="item.type"></fileIcon>
      </div>

      <div class="detail">
        <div class="upBox">
          <div class="name">
            <span class="status"> {{ item.status }} </span>
            {{ item.name }}
            {{ item.total }}
          </div>
          <div class="action">
            <n-space justify="end"  style="width: 100%; height: 100%" v-show="false">

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
            :percentage="item.progress"
            :border-radius="4"
            :fill-border-radius="4"
            status="success"
          />
          
        </div>
      </div>
    </div>

    <div class="title">
      <h1>{{ curLang.lang.taskUpload.done }}</h1>
    </div>

    <div class="uploadTaskBox switchTran" v-for="(item,index) in uploadTask.done" :key="index">
      <div class="img">
        <fileIcon :file-type="item.type"></fileIcon>
      </div>

      <div class="detail">
        <div class="upBox">
          <div class="name">{{ item.name }} {{ item.total }}</div>
          <div class="action">
            <n-space justify="end"  style="width: 100%; height: 100%">

              <n-button class="button" text  @click="delDone(index)">
                <n-icon>
                  <Delete24Regular />
                </n-icon>
              </n-button>

            </n-space>
          </div>
        </div>
        <div class="progress">
          <NProgress
              indicator-placement="inside"
              :percentage="item.progress"
              :border-radius="4"
              :fill-border-radius="4"
              status="success"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NProgress, NIcon, useLoadingBar, useThemeVars, NButton, NSpace } from "naive-ui";
import { computed } from "vue";
import { PauseOutline, CaretForwardOutline } from "@vicons/ionicons5";
import { Delete24Regular, ArrowClockwise24Regular, } from "@vicons/fluent";
import curLang from "@/common/lang";
import fileIcon from "@/components/explorer/FileIcon.vue";
import uploadTask, {delDone} from "@/common/task/uploadTask";

let theme = useThemeVars();
const cubicBezierEaseInOut = theme.value.cubicBezierEaseInOut
const hoverColor = computed(() => theme.value.hoverColor)
const titleColor = computed(() => theme.value.textColor2)
const loading = useLoadingBar()

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
  padding: 10px 0px 10px 10px;
  height: 50px;
  width: 100%;
  margin: 0 auto;
  border-radius: 5px;
  overflow: hidden;
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

.status{
  display: inline-block;
  margin-right: 10px;
  padding: 0px 3px;
  border-radius: 3px;

}

</style>
