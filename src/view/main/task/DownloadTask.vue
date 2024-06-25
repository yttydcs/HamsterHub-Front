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
            <span class="status"> {{ item.status }} </span>
            {{ item.name }}
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
          ref="FolderSelect"
          v-model:show="selectBoxShow"
          :title="curLang.lang.taskDownload.selectBox"
          :data="taskModel"
          :cancelFunc="() =>{this.selectBoxShow=false;}"
          :confirm-func="confirmSelect"
      />

      <n-form>

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

<script>
import {
  NProgress,
  NIcon,
  useLoadingBar,
  useThemeVars,
  NButton,
  NSpace,
  NFloatButton,
  NModal,
  NInput,
  NForm, NSelect, NFormItemRow
} from "naive-ui";
import {computed, reactive, ref} from "vue";
import { PauseOutline, CaretForwardOutline } from "@vicons/ionicons5";
import { Delete24Regular, ArrowClockwise24Regular } from "@vicons/fluent";
import { Add, } from "@vicons/ionicons5";
import curLang from "@/common/lang";
import fileService from "@/service/hamster/file"
import fileMenu from "@/service/hamster/fileMenu"

import fileIcon from "@/components/explorer/FileIcon.vue";
import downloadTask,{delTask} from "@/service/task";
import FolderSelect from "@/components/explorer/FolderSelect.vue";

export default {
  name: 'DownloadTask',
  components: {
    FolderSelect,
    NFormItemRow, NForm, NInput,
    NModal,
    NSpace,
    NIcon,
    NButton,
    NProgress,
    fileIcon,
    Delete24Regular,
    ArrowClockwise24Regular,
    CaretForwardOutline,
    PauseOutline,
    Add,
    NFloatButton,
  },
  methods:{
    handleDel(tag){
      delTask(tag);
      this.flushData();
    },
    confirmAddTask(){
      if(this.taskModel.showPosition ===""){
        window.$message.warning(curLang.lang.validateMissing);
        return;
      }

      downloadTask.addTask(this.taskModel.root,this.taskModel.parentId,this.taskModel.url);
      this.show = false;
    },
    confirmSelect(isSelect,root,parentId){
      this.selectBoxShow = false;
      if(!isSelect){
        return;
      }
      this.taskModel.parentId = parentId;
      this.taskModel.root = root;
      this.taskModel.showPosition = "root: " + root + " parentId: " + parentId;

    },
    handleSelect(){
      this.$refs.FolderSelect.flushData();
      this.selectBoxShow = true;
    },
    async flushData() {
      try {
        let data = await downloadTask.getTasks()
        this.downloadTasks.done = data.done;
        this.downloadTasks.doing = data.doing;
      }catch (e) {
        return false;
      }
      return true;
    },
  },
  async mounted() {
    // 避免延迟,首次出错后续不再继续
    if (!await this.flushData()) {
      return false;
    }

    // 轮询列表数据
    this.timerHandle = setInterval(this.flushData, 2000 )
  },

  activated() {
  },

  unmounted() {
    clearInterval(this.timerHandle)
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
      downloadTasks:reactive({done:[],doing:[]}),
      show:ref(false),
      selectBoxShow:ref(false),
      taskModel:reactive({name:"", root:"",parentId:"", showPosition:"",url:""}),
      timerHandle:ref(0),
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
