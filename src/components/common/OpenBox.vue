<template>
  <div class="open-box">
    <div class="file-body">
      <div class="top">
        <div class="title">
          {{title}}
        </div>
<!--        <div id="msg" class="msg">-->
<!--          {{msg}}-->
<!--        </div>-->
        <div class="action">
          <n-button v-if="settingFunc" quaternary class="btn" @click="settingFunc" :disabled="settingDisable">
            <template #icon>
              <n-icon>
                <SettingsOutline />
              </n-icon>
            </template>
            {{ curLang.lang.settingBtn }}
          </n-button>

          <n-button v-if="url" quaternary class="btn" @click="handleDownload(url)">
            <template #icon>
              <n-icon>
                <CloudDownloadOutline />
              </n-icon>
            </template>
            {{ curLang.lang.explorerDetail.downloadBtn }}
          </n-button>



        </div>

      </div>
      <div class="preview">
        <!--    文件夹的预览时    -->
        <div class="file-ico pd" v-if="previewType === 'dir'">
          <fileIcon file-type="dir" />
        </div>

        <!--    当没有可用的预览时    -->
        <div class="file-ico pd" v-if="previewType === 'file'">
          <fileIcon :file-type="icoType" />
        </div>

        <!--    普通文本的预览    -->
        <div class="file-text pd" v-if="previewType === 'text'">
          {{text}}
        </div>

        <!--    普通图片的预览    -->
        <div class="file-img pd" v-if="previewType === 'img'">
          <NImage class="shower" :src="url" object-fit="contain" :img-props="{'style': { 'width': '100%'}}"/>
        </div>

        <!--    todo:md文本的预览    -->
        <div class="file-md" v-if="previewType === 'md'">
          <previewMarkdown :md-text="text" style="width: 100%"></previewMarkdown>
        </div>

        <!--    普通音频的预览    -->
        <div class="file-audio pd" v-if="previewType === 'audio'">
          <audio :src="url" controls style="width: 100%"></audio>
        </div>

        <!--    视频的预览    -->
        <div class="file-video pd" v-if="previewType === 'video'">
          <previewVideo
              ref="previewVideoBox"
              :src="url"
              :key="flushKey"
              :saved-time-key="title"
          />
        </div>

        <!--    docx的预览    -->
        <div class="file-docx pd" v-if="previewType === 'docx'">
          <previewDocx :url="url" />
        </div>

        <!--    xlsx的预览    -->
        <div class="file-excel" v-if="previewType === 'xlsx'">
          <previewExcel :url="url" :xls="false"/>
        </div>

        <!--    xlsx的预览    -->
        <div class="file-excel" v-if="previewType === 'xls'">
          <previewExcel :url="url" :xls="true"/>
        </div>

        <!--    pdf的预览    -->
        <div class="file-pdf" v-if="previewType === 'pdf'">
          <previewPdf :url="url" />
        </div>

      </div>
    </div>



  </div>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import { useThemeVars} from "naive-ui";
import fileIcon from "@/components/explorer/FileIcon.vue";
import { NButton, NIcon, NImage } from "naive-ui";
import {CloudDownloadOutline, SettingsOutline} from "@vicons/ionicons5";
import download from "@/common/download"
import curLang from "@/common/lang";
import previewMarkdown from "@/components/preview/previewMarkdown.vue";
import previewDocx from "@/components/preview/previewDocx.vue";
import previewExcel from "@/components/preview/previewExcel.vue";
import previewPdf from "@/components/preview/previewPdf.vue";
import previewVideo from "@/components/preview/previewVideo.vue";
import fileType from "@/common/fileType";

const props = defineProps({
  title:String,
  msg:String,
  url:String,
  isFolder:Boolean
})

const previewType = computed(()=>{
  let openType;
  if(props.isFolder){
    openType = "dir";
  }else{
    openType = fileType.getOpenTypeByName(props.title);
  }

  handlePreviewIndex(openType);
  return openType;
})
const icoType = computed(()=>fileType.getIconTypeByName(props.title))
const theme = useThemeVars();
const flushKey = ref(0);
const borderColor = computed(() => theme.value.borderColor);
const opacity2 = computed(() => theme.value.opacity2);
const text = ref("");
const settingDisable = ref(true);
const previewVideoBox = ref(null)

watch(curLang.lang.video, () => {
  // 由于plyr修改config不直接应用，所以强制重新加载
  flushKey.value++
});

function handleDownload(url){
  download.url(url);
}

function handlePreviewIndex(openType){
  settingDisable.value = true;
  switch (openType) {
    case "text":
    case "md":
      textPreview();
      break;
    case "video":
      settingDisable.value = false;
      break;
  }
}

function settingFunc(){
  switch (previewType.value) {
    case "video":
      previewVideoBox.value.settingFunc();
      break;
  }
}

function textPreview(){
  download.getText(props.url).then(res=>{
    if(res){
      text.value = res;
    }else{
      text.value = "";
    }
    if(typeof(text.value)!="string"){
      text.value = "";
    }

  }).catch(err=>{
    text.value = "";
  })
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
  background-color: rgba(255,255,255,0.05);
}

.preview .pd{
  padding: 20px;
}

.file-ico{
  width: 100%;
  height: calc(100% - 40px);
  max-width: 250px;
  overflow: hidden;
  margin: 0 auto;
}

.file-md{
  width: 100%;
  overflow: hidden;
}

.file-ico svg{
  width: 100%;
  height: 100%;
}

.title{
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-text{
  white-space: pre-wrap;
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

.file-img{
  overflow: hidden;
  width: 100%;
  text-align: center;
}

.file-img .shower{
  display: inline-block;
  max-width: 100%;
}

.btn{
  margin-left: 2px;
}


</style>
