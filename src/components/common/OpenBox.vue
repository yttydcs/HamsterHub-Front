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
          <n-button quaternary class="btn">
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
        <!--    当没有可用的预览时    -->
        <div class="file-img">
          <fileIcon file-type="file" />
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
import calc from "@/common/calc";
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

  },
  setup(){
    let theme = useThemeVars();
    return {
      borderColor : computed(() => theme.value.borderColor),
      opacity2 : computed(() => theme.value.opacity2),
    }
  }
}
</script >

<style scoped>
.open-box{
  width: 100%;
}

@media only screen and (max-width: 560px) {
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
  max-width: 300px;
  overflow: hidden;
  margin: 0 auto;
}

.title{
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.msg{
  padding-left: 20px;
  flex: 1;
  opacity: v-bind(opacity2);
}

.action{
  margin-right: 3px;
}

</style>
