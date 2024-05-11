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
          <n-button v-if="settingFunc" quaternary class="btn" @click="settingFunc" :disabled="videoSettingDisable">
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
              ref="previewVideo"
              :src="url"
              :key="flushKey"
              :saved-time-key="title"
              :dan-ma-type="danmakuSetting.type"
              :dan-ma-url="danmakuSetting.url"
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
        <div class="file-excel pd" v-if="previewType === 'pdf'">
          <previewPdf :url="url" />
        </div>

      </div>
    </div>

    <n-modal

        v-model:show="videoSettingShow"
        class="alertBox"
        preset="card"
        :title="curLang.lang.danmakuSetting.title"
        size="medium"
        :bordered="false"
    >
      <n-form>

        <n-form-item-row :label="curLang.lang.danmakuSetting.type" >
          <n-select
              v-model:value="danmakuSetting.type"
              :options="danmakuTypeOptions"
              :placeholder="curLang.lang.plsInput"
          />
<!--          <n-input v-model:value="danmakuSettingModel.type" :placeholder="curLang.lang.plsInput"/>-->
        </n-form-item-row>

        <n-form-item-row :label="curLang.lang.danmakuSetting.url" >
          <n-input v-model:value="danmakuSetting.url" :placeholder="curLang.lang.plsInput"/>
        </n-form-item-row>

      </n-form>


      <n-space align="stretch" justify="end">
          <n-button class="sendBtn" type="primary" block secondary strong @click="videoSettingHandle">
            {{ curLang.lang.curd.submitBtn }}
          </n-button>
          <n-button class="sendBtn" type="primary" block secondary strong @click="()=>{this.videoSettingShow = false}">
            {{ curLang.lang.curd.cancelBtn }}
          </n-button>
        </n-space>

    </n-modal>

  </div>
</template>

<script>
import {computed, reactive, ref, watch} from "vue";
import {NForm, NFormItemRow, NInput, NModal, NSpace, useThemeVars} from "naive-ui";
import fileIcon from "@/components/explorer/FileIcon.vue";
import { NButton, NIcon, NImage, NSelect } from "naive-ui";
import {CloudDownloadOutline, SettingsOutline} from "@vicons/ionicons5";
import download from "@/common/download"
import curLang from "@/common/lang";
import previewMarkdown from "@/components/preview/previewMarkdown.vue";
import previewDocx from "@/components/preview/previewDocx.vue";
import previewExcel from "@/components/preview/previewExcel.vue";
import previewPdf from "@/components/preview/previewPdf.vue";
import previewVideo from "@/components/preview/previewVideo.vue";
import fileType from "@/common/fileType";

import { getEnum } from "@/common/enums";



function createDanmakuTypeOptions(){
  let danmakuType = getEnum("danmakuType")
  let res = []

  for (let i = 0; i < danmakuType.length; i++) {
    res.push({ label: danmakuType[i], value: danmakuType[i] });
  }
  return res;
}



export default {
  name: 'OpenBox',
  components: {
    NSpace,
    NForm, NFormItemRow, NInput,
    NSelect,
    NModal,
    SettingsOutline,
    fileIcon,
    NButton,
    NIcon,
    NImage,
    CloudDownloadOutline,
    previewMarkdown,
    previewDocx,
    previewExcel,
    previewPdf,
    previewVideo

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
        openType = fileType.getOpenTypeByName(this.title)
      }

      this.handlePreviewIndex(openType)
      return openType;
    },
    icoType(){
      return  fileType.getIconTypeByName(this.title)
    }
  },
  methods:{
    handleDownload(url){
      download.url(url)
    },

    handlePreviewIndex(openType){
      switch (openType) {
        case "text":
        case "md":
          this.textPreview();
          break;
        case "video":
          this.settingFunc = this.openVideoSetting;
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
        if(typeof(that.text)!="string"){
          that.text = "";
        }

      }).catch(err=>{
        that.text = "";
      })
    },
    openVideoSetting(){
      this.videoSettingShow = true;
    },
    async videoSettingHandle(){
      this.videoSettingShow = false;
      // this.danmakuSetting.type = this.danmakuSettingModel.type;
      // this.danmakuSetting.url = this.danmakuSettingModel.url;
      this.videoSettingDisable = true
      await this.$refs.previewVideo.loadDanMa();
      this.videoSettingDisable = false;
    }
  },
  setup(){
    let theme = useThemeVars();
    let flushKey = ref(0);
    watch(curLang.lang.video, () => {
      // 由于plyr修改config不直接应用，所以强制重新加载
      flushKey.value++
    });

    return {
      curLang,
      flushKey,
      borderColor : computed(() => theme.value.borderColor),
      opacity2 : computed(() => theme.value.opacity2),
      text: ref(""),
      settingFunc:ref(null),
      videoSettingShow:ref(false),
      videoSettingDisable:ref(false),
      // danmakuSettingModel:reactive({type:"",url:""}),
      danmakuSetting:reactive({type:"",url:""}),
      danmakuTypeOptions: reactive(createDanmakuTypeOptions())
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




</style>
