<template>
  <div class="open-box">
    <div class="file-body">
      <div class="top">
        <div class="title">
          {{title}}
        </div>
        <div id="msg" class="msg">
          {{msg}}
        </div>
        <div class="action">
          <n-button v-if="url" quaternary class="btn" @click="handleDownload(url)">
            <template #icon>
              <n-icon>
                <CloudDownloadOutline />
              </n-icon>
            </template>
            下载
          </n-button>



        </div>

      </div>
      <div class="preview">
        <!--    文件夹的预览时    -->
        <div class="file-img" v-if="previewType === 'dir'">
          <fileIcon file-type="dir" />
        </div>

        <!--    当没有可用的预览时    -->
        <div class="file-img" v-if="previewType === 'file'">
          <fileIcon file-type="file" />
        </div>

        <!--    普通文本的预览    -->
        <div class="file-text" v-if="previewType === 'text'">
          {{text}}
        </div>

        <!--    todo:md文本的预览    -->
<!--        <div class="file-text" v-if="previewType === 'text'">-->
<!--          {{text}}-->
<!--        </div>-->

        <!--    普通视频的预览    -->
        <div class="file-text" v-if="previewType === 'video'">
          <video :src="url" controls style="width: 100%"></video>
        </div>

      </div>


    </div>

  </div>
</template>

<script>
import {computed, reactive, ref} from "vue";
import {useThemeVars} from "naive-ui";
import fileIcon from "@/components/explorer/FileIcon.vue";
import { NButton, NIcon } from "naive-ui";
import { CloudDownloadOutline } from "@vicons/ionicons5";
import download from "@/common/download"

const openTypeIndex = {
  txt:"text",
  md:"md",
  mp4:"video",
}

export default {
  name: 'OpenBox',
  components: {
    fileIcon,
    NButton,
    NIcon,
    CloudDownloadOutline
  },
  props: {
    title:String,
    msg:String,
    url:String,
    isFolder:Boolean
  },
  computed:{
    previewType(){
      let openType
      if(this.isFolder){
        openType = "dir"
      }else{
        openType = this.getOpenTypeByName(this.title)
      }

      this.handlePreviewIndex(openType)
      return openType;
    },
  },
  methods:{
    handleDownload(url){
      download.url(url)
    },
    getOpenTypeByName(name){
      if(!name){
        return "file"
      }

      let arr = name.split(".");
      if(arr.length <= 1){
        return "file"
      }

      let suffix = arr.pop()

      if(openTypeIndex.hasOwnProperty(suffix)){
        return openTypeIndex[suffix]
      }

      return "file"
    },
    handlePreviewIndex(openType){
      switch (openType) {
        case "text":
          this.textPreview();
          break;

      }
    },

    textPreview(){
      let that = this
      download.getText(this.url).then(res=>{
        if(res){
          that.text = res;
        }else{
          that.text = "";
        }

      }).catch(err=>{
        that.text = "";
      })
    },
  },
  setup(){
    let theme = useThemeVars();
    return {
      borderColor : computed(() => theme.value.borderColor),
      opacity2 : computed(() => theme.value.opacity2),
      text: ref(""),
    }
  }
}
</script >

<style scoped>
.open-box{
  width: 100%;
}

@media only screen and (max-width: 650px) {
  #msg {
    display: none;
  }
}

.file-body{
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  border-color: v-bind(borderColor);
  text-align: left;
}

.top{
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid v-bind(borderColor);
  height: 40px;
  /* line-height: 40px; 会导致flex居中异常 */
  padding-left: 20px;
  background-color: rgba(255,255,255,0.1);
  overflow: hidden;
}

.preview{
  padding: 20px;
  background-color: rgba(255,255,255,0.05);
}

.file-img{
  width: 100%;
  height: calc(100% - 40px);
  max-width: 250px;
  overflow: hidden;
  margin: 0 auto;
}

.file-img svg{
  width: 100%;
  height: 100%;
}

.title{
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.msg{
  text-align: right;
  padding-right: 10px;
  flex: 1;
  opacity: v-bind(opacity2);
}

.action{
  margin-right: 3px;
}

</style>
