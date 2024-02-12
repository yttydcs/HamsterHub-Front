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
      <div class="item" v-for="(item,index) in detailData.other" :key="index">
        <div class="key">
          {{item.key}}:
        </div>
        <div class="value">
          {{item.value}}
        </div>
      </div>

    </div>
  </div>


</template>

<script>
import {computed, reactive} from "vue";
import {useRoute} from "vue-router";

import hamster from "@/common/adapter/hamster";
import alist from "@/common/adapter/alist";
import OpenBox from "@/components/common/OpenBox.vue";
import file from "@/api/file/hamster/file";
import calc from "@/common/calc";
import download from "@/common/download";
import {useThemeVars} from "naive-ui";

const _adapters = [hamster, alist];

export default {
  name: 'mainDetail',
  methods: {
    async flushData(){
      let data = (await file.getDetail(this.routeData.query.root,this.routeData.query.path)).data;
      console.log(data)
      this.detailData.title = data.name;

      data.created = data.created.replace("T"," ")
      data.modified = data.modified.replace("T"," ")

      if(data.type === 0){
        this.detailData.isFolder = true;
        this.detailData.url = "";
        this.detailData.msg = data.created.replace("T"," ")
      }else{
        this.detailData.url = await this.handleUrl(data.id)
        data.size = calc.toSizeString(data.size)
        this.detailData.msg = data.size + ` · ` + data.created.replace("T"," ")
      }
      await this.handleItem(data);
    },
    async handleItem(data){
      this.detailData.other.length = 0;

      console.log(data)

      this.detailData.other.push({
        key:"name",
        value:data.name
      })

      this.detailData.other.push({
        key:"size",
        value:data.size
      })

      this.detailData.other.push({
        key:"type",
        value: data.type===1?"file":"folder"
      })

      this.detailData.other.push({
        key:"version",
        value: data.version
      })

      this.detailData.other.push({
        key:"created",
        value: data.created
      })

      this.detailData.other.push({
        key:"modified",
        value: data.modified
      })

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
    let theme = useThemeVars();
    return {
      borderColor : computed(() => theme.value.borderColor),
      opacity2 : computed(() => theme.value.opacity2),
      detailData:reactive({
        title:"",
        msg:"",
        url:"",
        isFolder:false,
        other:[{key:"key",value:"value"}],
      })
    }
  }
}
</script>

<style scoped>
.mainDetail{
  margin: 10px auto;
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
  margin-left: 5px;
  width: 200px;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 200px;
  border-radius: 5px;
  border: 1px solid v-bind(borderColor);
}

.item{
  padding: 5px;
  text-align: left;
}

.key{
  opacity: v-bind(opacity2);
  font-weight: 700;
}

.value{
  margin-left: 16px;

}

</style>
