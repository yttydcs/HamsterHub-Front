<template>
  <div class="sharePage">
    <div class="main">
<!--      {{ dataRoute.params }}-->
<!--      {{ shareData.data  }}-->
      <div class="file" v-if="isExist && unlock">
        <OpenBox
            :title="shareData.data.name"
            :msg="shareData.data.size + ` · ` + shareData.data.created + ` · Ver:` + shareData.data.version"
            :url="url"
        />
      </div>
      <div class="list"></div>
      <div class="person">


      </div>
    </div>



  </div>


</template>

<script>
import {onBeforeRouteUpdate, useRoute} from 'vue-router';
import {NButton, NDataTable, NIcon, NSpace, useThemeVars} from "naive-ui";
import {computed, reactive, ref} from "vue";
import share from "@/api/share";
import OpenBox from "@/components/common/OpenBox.vue";
import {BanOutline, CloudDownloadOutline} from "@vicons/ionicons5";
import calc from "@/common/calc";
import download from "@/common/download"



const NONE_KEY = 600008;
const INCORRECT_KEY = 600009;


export default {
  name: 'sharePage',
  components: {
    OpenBox

  },
  methods:{
    flushData(){

      let ticket = this.dataRoute.params.ticket;
      let key = this.dataRoute.query.key;


      console.log(ticket,key);
      let that = this;
      share.getShare(ticket,key).then((res)=>{
        console.log("res",res);
        if("data" in res){
          res.data.size = calc.toSizeString(res.data.size);
          res.data.created = res.data.created.replace("T"," ");
          that.shareData.data = res.data
          that.isExist = true
          that.unlock = true
          that.handleUrl(ticket,key)
        }else{
          let data = res.response.data;
          console.log("ddd",data)
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

    handleDownload(ticket,key){
      let that = this
      share.download(ticket,key)
    }
  },
  mounted() {
    this.flushData()
  },
  activated() {
    this.flushData()
  },
  beforeRouteUpdate(to){
    this.flushData()
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
      dataRoute: useRoute(),
      isExist:ref(true),
      unlock:ref(true),
      url:ref("")
    }
  }
}
</script>

<style scoped>
.main{
  max-width: 1200px;
  margin: 10px auto;
  min-height: calc(100vh - 100px);
}




</style>
