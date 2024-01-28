<template>
  <div class="sharePage">
    <div class="main">
<!--      {{ dataRoute.params }}-->
<!--      {{ shareData.data  }}-->
      <div class="file">
        <OpenBox
            v-if="isExist"
            :title="shareData.data.name"
            :msg="shareData.data.size + ` - ` + shareData.data.created"
        />

      </div>
      <div class="list"></div>
      <div class="person"></div>
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
        console.log(res);
        res.data.size = calc.toSizeString(res.data.size);
        res.data.created = res.data.created.replace("T","");
        that.shareData.data = res.data
        that.isExist=true
      }).catch((err)=>{
        that.isExist=false
        console.log(err)
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
