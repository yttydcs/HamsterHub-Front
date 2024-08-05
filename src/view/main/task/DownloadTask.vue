<template>
  <div class="main switchTran">
    <div class="title">
      <h1>{{ curLang.lang.taskDownload.doing }}</h1>
    </div>

    <div class="uploadTaskBox switchTran" v-for="(item,index) in downloadTasks.doing" :key="index">
      <div class="img">
        <fileIcon :file-type="item.type"></fileIcon>
      </div>

      <div class="detail">
        <div class="upBox">
          <div class="name">
            <span class="status"> {{ curLang.lang.taskDownload.state[item.status] }} </span>
            <span class="task-name"> {{ item.name }} </span>
            {{ item.total }}
          </div>
          <div class="action">
            <n-space justify="end"  style="width: 100%; height: 100%" v-show="true">

              <n-button class="button" text @click="handleDel(item.index)">
                <n-icon>
                  <Delete24Regular />
                </n-icon>
              </n-button>

              <n-button class="button" text v-if="false" >
                <n-icon>
                  <ArrowClockwise24Regular v-if="false" />
                </n-icon>
              </n-button>

              <n-button class="button" text v-if="false" >
                <n-icon>
                  <CaretForwardOutline v-if="false"/>
                </n-icon>
              </n-button>

              <n-button class="button" text v-if="false" >
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
      <h1>{{ curLang.lang.taskDownload.done }}</h1>
    </div>

    <div class="uploadTaskBox switchTran" v-for="(item,index) in downloadTasks.done" :key="index">
      <div class="img">
        <fileIcon :file-type="item.type"></fileIcon>
      </div>

      <div class="detail">
        <div class="upBox">
          <div class="name">{{ item.name }}</div>
          <div class="action">
            <n-space justify="end"  style="width: 100%; height: 100%">

              <n-button class="button" text @click="handleDel(item.index)" >
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


    <n-modal
        v-model:show="show"
        class="alertBox"
        preset="card"
        :title="curLang.lang.taskDownload.addTask"
        size="medium"
        :show-line="true"
    >

      <FolderSelect
          ref="folderSelect"
          v-model:show="selectBoxShow"
          :title="curLang.lang.taskDownload.selectBox"
          :data="taskModel"
          :cancelFunc="() =>{selectBoxShow=false;}"
          :confirm-func="confirmSelect"
      />

      <n-form>
        <n-form-item-row :label="curLang.lang.taskDownload.taskName" >
          <n-input v-model:value="taskModel.name" type="text" :placeholder="curLang.lang.plsInput"/>
        </n-form-item-row>

        <n-form-item-row :label="curLang.lang.taskDownload.downloadPosition" >
          <n-input v-model:value="taskModel.showPosition" :disabled="true" :placeholder="curLang.lang.taskDownload.placeholder"/>
          <n-button @click="handleSelect">{{ curLang.lang.taskDownload.select }}</n-button>
        </n-form-item-row>

        <n-form-item-row :label="curLang.lang.taskDownload.downloadUrl" >
          <n-input v-model:value="taskModel.url" type="textarea" :placeholder="curLang.lang.plsInput"/>
        </n-form-item-row>

      </n-form>

      <n-space class="=control-btn" align="stretch" justify="end">
        <n-button type="primary" block secondary strong @click="confirmAddTask" >
          {{ curLang.lang.confirmBtn.ok }}
        </n-button>
        <n-button  type="primary" block secondary strong @click="show = false">
          {{ curLang.lang.confirmBtn.cancel }}
        </n-button>
      </n-space>
    </n-modal>


    <!--   给浮动按钮留下空隙，防止部分项目被覆盖时且无法滚动的情况   -->
    <br>
    <br>
    <!--  添加按钮  -->
    <n-float-button :right="30" :bottom="30" shape="circle">
      <n-icon>
        <Add @click="show = true"/>
      </n-icon>
    </n-float-button>

  </div>

</template>

<script setup>
import {NProgress, NIcon, useLoadingBar, useThemeVars, NButton,
  NSpace, NFloatButton, NModal, NInput, NForm, NFormItemRow} from "naive-ui";
import {computed, onMounted, onUnmounted, reactive, ref} from "vue";
import { PauseOutline, CaretForwardOutline } from "@vicons/ionicons5";
import { Delete24Regular, ArrowClockwise24Regular } from "@vicons/fluent";
import { Add, } from "@vicons/ionicons5";
import curLang from "@/common/lang";
import fileIcon from "@/components/explorer/FileIcon.vue";
import downloadTask,{delTask} from "@/service/task";
import FolderSelect from "@/components/explorer/FolderSelect.vue";

let theme = useThemeVars();
const cubicBezierEaseInOut = computed(() =>theme.value.cubicBezierEaseInOut);
const hoverColor = computed(() => theme.value.hoverColor);
const titleColor = computed(() => theme.value.textColor2);
const loading = useLoadingBar();
const downloadTasks = reactive({done:[],doing:[]});
const show = ref(false);
const selectBoxShow = ref(false);
const taskModel = reactive({name:"", root:"",parentId:"", showPosition:"",url:""});
const timerHandle = ref(0);
const folderSelect = ref(null);

function handleDel(tag){
  delTask(tag);
  flushData();
}

function confirmAddTask(){
  if(taskModel.showPosition ===""){
    window.$message.warning(curLang.lang.validateMissing);
    return;
  }

  downloadTask.addTask(taskModel.root,taskModel.parentId,taskModel.url,taskModel.name);
  show.value = false;
}

function confirmSelect(isSelect,root,parentId){
  selectBoxShow.value = false;
  if(!isSelect){
    return;
  }
  taskModel.parentId = parentId;
  taskModel.root = root;
  taskModel.showPosition = "root: " + root + " parentId: " + parentId;
}

function handleSelect(){
  folderSelect.value.flushData();
  selectBoxShow.value = true;
}

async function flushData(){
  try {
    let data = await downloadTask.getTasks()
    downloadTasks.done = data.done;
    downloadTasks.doing = data.doing;
  }catch (e) {
    return false;
  }
  return true;
}

onMounted(async ()=>{
  // 避免延迟,首次出错后续不再继续
  if (!await flushData()) {
    return false;
  }

  // 轮询列表数据
  timerHandle.value = setInterval(flushData, 2000 )
})

onUnmounted(()=>{
  clearInterval(timerHandle.value)
})

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

.task-name{
  margin-right: 10px;
}
</style>
