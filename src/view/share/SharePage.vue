<template>
  <div class="sharePage">
    <div class="main">
<!--      {{ dataRoute.params }}-->
<!--      {{ shareData.data  }}-->
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
        />
      </div>
      <div class="lock" v-show="!unlock">
        <div class="unlockBox">
          <n-icon :component="lockIcon" size="100" :depth="4" />
          <n-input-group >
            <n-input type="password" show-password-on="click" v-model:value="key"/>
            <n-button type="primary" ghost @click="handleSubmitKey">
              submit
            </n-button>
          </n-input-group>
          <br>

        </div>

      </div>
    </div>



  </div>


</template>

<script>
import {onBeforeRouteUpdate, useRoute} from 'vue-router';
import {NButton, NDataTable, NIcon, NSpace, NInputGroup, NInput , useThemeVars} from "naive-ui";
import {computed, reactive, ref ,nextTick} from "vue";
import share from "@/api/share";
import OpenBox from "@/components/common/OpenBox.vue";
import {BanOutline, CloudDownloadOutline} from "@vicons/ionicons5";
import calc from "@/common/calc";
import download from "@/common/download"
import { LockClosed as lockIcon } from "@vicons/ionicons5";
import {getUrlString} from "@/common/fileList";
import FileExplorer from "@/components/explorer/FileExplorer.vue";
import fileService from "@/service/share/file"
import fileMenu from "@/service/share/fileMenu"

const NONE_KEY = 600008;
const INCORRECT_KEY = 600009;


export default {
  name: 'sharePage',
  components: {
    FileExplorer,
    OpenBox,
    NButton,
    NInputGroup,
    NInput,
    NIcon,

  },
  methods:{
    getDataByRoute(){
      this.ticket = this.dataRoute.params.ticket;
      this.fileKey = this.dataRoute.query.key;
    },
    flushData(){
      let that = this;
      share.getShare(this.ticket,this.fileKey).then((res)=>{
        console.log("res",res);
        if("data" in res){
          res.data.size = calc.toSizeString(res.data.size);
          res.data.created = res.data.created.replace("T"," ");
          that.shareData.data = res.data
          that.isExist = true
          that.unlock = true
          if (res.data.type===0){
            that.fileService.getFileListObject().others["key"] = this.fileKey
            that.fileService.getFileListObject().others["ticket"] = this.ticket
            that.fileService.getFileListObject().others["id"] = res.data.id
            console.log(that.fileService.getFileListObject())
            that.isDir = true
          }else{
            that.handleUrl(this.ticket,this.fileKey)
            that.isDir = false
          }

        }else{
          let data = res.response.data;
          if(data.code === INCORRECT_KEY || data.code === NONE_KEY){// 验证码错误
            that.unlock = false;
          }

        }
      }).catch((err)=>{
        that.isExist=false
        let data = err;
        console.log("err",data)
      })
    },
    handleUrl(ticket,key,vFileId){
      let that = this
      share.getDownloadUrl(ticket,key,vFileId).then(res=>{
        that.url = download.toAbsolute(res);
      })
    },
    async handleSubmitKey(){
      let ticket = this.dataRoute.params.ticket;
      let key = this.key;
      this.$router.push("/s/"+ticket+"?key="+key);
    },
    handleDownload(ticket,key){
      let that = this
      share.download(ticket,key)
    }
  },
  mounted() {
    this.getDataByRoute()
    this.flushData()
  },
  activated() {
    this.getDataByRoute()
    this.flushData()
  },
  beforeRouteUpdate (to, from, next){
    this.ticket = to.params.ticket;
    this.fileKey = to.query.key;
    this.flushData()
    next()
  },
  computed: {
    dataRoute(){
      return useRoute();
    },
  },


  setup(){
    let theme = useThemeVars();

    return{
      borderColor : computed(() => theme.value.borderColor),
      borderHover : computed(() => theme.value.primaryColorHover),
      borderSelected : computed(() => theme.value.primaryColorSuppl),
      cubicBezierEaseInOut : theme.value.cubicBezierEaseInOut,
      fileSelect: false,
      shareData:reactive({
        data:[],
      }),

      isExist:ref(true),
      unlock:ref(true),
      isDir:ref(null),
      url:ref(""),
      fileKey:ref(""),
      ticket:ref(""),
      lockIcon,
      fileMenu,
      fileService
    }
  }
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



</style>
