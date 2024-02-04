<template>
  <div class="mainDetail">
    <div class="detailPanel">
      <OpenBox
        :title="detailData.title"
        :msg="detailData.msg"
        :url="detailData.url"
        :is-folder = "detailData.isFolder"
      />
    </div>
    <div class="otherPanel">
      other
    </div>
  </div>


</template>

<script>
import {reactive} from "vue";
import {useRoute} from "vue-router";

import hamster from "@/common/adapter/hamster";
import alist from "@/common/adapter/alist";
import OpenBox from "@/components/common/OpenBox.vue";
import file from "@/api/file/hamster/file";
import calc from "@/common/calc";
import download from "@/common/download";

const _adapters = [hamster, alist];

export default {
  name: 'mainDetail',
  methods: {
    async flushData(){
      let data = (await file.getDetail(this.routeData.query.root,this.routeData.query.path)).data;
      console.log(data)
      this.detailData.title = data.name;

      if(data.type === 0){
        this.detailData.isFolder = true;
        this.detailData.url = "";
        this.detailData.msg = data.created.replace("T"," ")
      }else{
        this.detailData.url = await this.handleUrl(data.id)
        this.detailData.msg = calc.toSizeString(data.size) + ` · ` + data.created.replace("T"," ")
      }

    },
    async handleUrl(id){
      let res = await file.getDownloadUrl(id)
      return download.toAbsolute(res)
    },
  },
  components: {
    OpenBox
    // NCard, NTabs, NTabPane, NFormItemRow, NInput, NButton, NForm
  },
  computed:{
    routeData(){
      return useRoute();
    },
  },
  mounted() {
    this.flushData();
  },
  activated() {
    this.flushData();
  },
  setup() {

    return {
      detailData:reactive({
        title:"",
        msg:"",
        url:"",
        isFolder:false,
        other:[],
      })
    }
  }
}
</script>

<style scoped>
.mainDetail{
  margin: 0 auto;
  max-width: 1000px;
  display: flex;
  justify-content: right;
  align-items: flex-start;
  flex-flow:  wrap;
}
.detailPanel{
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 500px;
}
.otherPanel{
  width: 200px;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 200px;
}

</style>
