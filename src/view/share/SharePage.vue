<template>
  <div class="sharePage">
    <div class="main">
      <div class="file" v-if="isExist && unlock && isDir===false">
        <OpenBox
            :title="shareData.data.name"
            :msg="shareData.data.size + ` · ` + shareData.data.created + ` · Ver:` + shareData.data.version"
            :url="url"
        />
      </div>
      <div class="list" v-if="isExist && unlock && isDir">
        <FileExplorer
            ref="explorer"
            :file-menu ="fileMenu"
            :file-service="fileService"
            :readme="true"
        />
      </div>
      <div class="lock" v-show="!unlock">
        <div class="unlockBox">
          <n-icon :component="lockIcon" size="100" :depth="4" />
            <n-input
                class="password-box"
                type="password"
                :placeholder="curLang.lang.plsInput"
                show-password-on="click"
                v-model:value="fileKey"
            />
            <n-button class="submit-box" type="primary" ghost @click="handleSubmitKey">
              {{ curLang.lang.submitBtn }}
            </n-button>
          <br>
        </div>

      </div>
    </div>



  </div>


</template>

<script setup>
import {onBeforeRouteUpdate, useRoute, useRouter} from 'vue-router';
import {NButton, NIcon, NInput, useLoadingBar} from "naive-ui";
import { reactive, ref, onMounted} from "vue";
import share from "@/api/share";
import OpenBox from "@/components/common/OpenBox.vue";
import calc from "@/common/calc";
import download from "@/common/download"
import { LockClosed as lockIcon } from "@vicons/ionicons5";
import FileExplorer from "@/components/explorer/FileExplorer.vue";
import fileService from "@/service/share/file"
import fileMenu from "@/service/share/fileMenu"
import curLang from "@/common/lang";
import {onActivated} from "vue-demi";

const NONE_KEY = 600008;
const INCORRECT_KEY = 600009;

// let theme = useThemeVars();

// const borderColor = computed(() => theme.value.borderColor);
// const borderHover = computed(() => theme.value.primaryColorHover);
// const borderSelected = computed(() => theme.value.primaryColorSuppl);
// const cubicBezierEaseInOut = computed(()=>theme.value.cubicBezierEaseInOut);
const dataRoute = useRoute()
const router = useRouter();
// const fileSelect= ref(false);
const shareData=reactive({data:[],});
const isExist=ref(true);
const unlock=ref(true);
const isDir=ref(null);
const url=ref("");
const root = ref("");
const fileKey=ref("");
const ticket=ref("");
const loading=useLoadingBar();

onMounted(() =>{
  getDataByRoute()
  flushData()
})

onActivated(()=>{
  getDataByRoute()
  flushData()
})

onBeforeRouteUpdate((to, from, next)=>{
  ticket.value = to.params.ticket;
  fileKey.value = to.query.key;
  flushData()
  next()
})

function getDataByRoute(){
  ticket.value = dataRoute.params.ticket;
  fileKey.value = dataRoute.query.key;
}

function flushData(){

  loading.start()
  share.getShare(ticket.value,fileKey.value).then((res)=>{
    if("data" in res){
      res.data.size = calc.toSizeString(res.data.size);
      res.data.created = calc.formatTimestampWithUserTimeZone(res.data.created);
      shareData.data = res.data
      isExist.value = true
      unlock.value = true
      if (res.data.type===0){
        fileService.getFileListObject().others["key"] = fileKey.value;
        fileService.getFileListObject().others["ticket"] = ticket.value;
        fileService.getFileListObject().others["id"] = res.data.id;
        isDir.value = true
      }else{
        handleUrl(ticket.value,fileKey.value);
        isDir.value = false
      }
    }else{
      let data = res;
      if(data.code === INCORRECT_KEY || data.code === NONE_KEY){// 验证码错误
        unlock.value = false;
      }
    }
    loading.finish()
  }).catch((err)=>{
    isExist.value=false
    loading.error()
  })
}

function handleUrl(ticket,key,vFileId){
  share.getDownloadUrl(ticket,key,vFileId).then(res=>{
    url.value = download.toAbsolute(res);
  })
}

async function handleSubmitKey(){
  let _ticket = dataRoute.params.ticket;
  await router.push("/s/" + _ticket + "?key=" + fileKey.value);
}

function handleDownload(ticket,key){
  share.download(ticket,key)
}


</script>

<style scoped>
.main{
  max-width: 1200px;
  margin: 10px auto;
  min-height: calc(100vh - 100px);
  overflow: hidden;
}

.unlockBox{
  margin-top: -70px;
}

.lock{
  width: 100%;
  height: calc(100vh - 85px);
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: center;
}

.password-box{
  text-align: left;
  width: 100%;
}

.submit-box{
  margin-top: 10px;
  width: 100%;
}
</style>
