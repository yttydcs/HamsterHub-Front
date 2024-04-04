<template>

  <div class="mainDetail">
    <div class="version">
      <n-select v-model:value="version" :options="versionOptions" />
    </div>
    <div class="mainBox">
      <div class="detailPanel">
        <OpenBox
            :title="detailData[version].title"
            :msg="detailData[version].msg"
            :url="detailData[version].url"
            :is-folder = "detailData[version].isFolder"
        />
      </div>
      <div class="otherPanel">
        <div class="item" v-for="(item,index) in detailData[version].other" :key="index">
          <div class="key">
            {{item.key}}:
          </div>
          <div class="value">
            {{item.value}}
          </div>
        </div>
      </div>
    </div>

  </div>


</template>

<script>
import {computed, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {NSelect} from "naive-ui";

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
    async flushData(fileObj){
      // let root = this.fileService.getCurRoot();
      // let path = (await this.fileService.getPathString()).slice(0, -1);
      // let data = (await file.getDetail(root,path)).data;
      // console.log(fileObj)
      let data = fileObj;

      for (let i = 0; i < data.length; i++) {
        this.detailData[i]={};
        this.detailData[i]["title"] = data[i].name;

        data[i].created = data[i].created.replace("T"," ");
        data[i].modified = data[i].modified.replace("T"," ");

        this.detailData[i].version = data[i].version;

        if(data[i].type === 0){
          this.detailData[i].isFolder = true;
          this.detailData[i].url = "";
          this.detailData[i].msg = data[i].created.replace("T"," ");
        }else{
          this.detailData[i].url = await this.handleUrl(data[i].id);
          data[i].size = calc.toSizeString(data[i].size);
          this.detailData[i].msg = data[i].size + ` · ` + data[i].created.replace("T"," ");
        }

        await this.handleItem(data[i],i);
      }
      this.createOption();
    },
    createOption(){
      this.versionOptions.length = 0;
      for (let i = 0; i <this.detailData.length; i++) {
        this.versionOptions.push({
          label: "version:"+this.detailData[i].version,
          value: i,
        })
      }
    },
    async handleItem(data,p){
      this.detailData[p].other = []

      this.detailData[p].other.push({
        key:"name",
        value:data.name
      })

      this.detailData[p].other.push({
        key:"size",
        value:data.size
      })

      this.detailData[p].other.push({
        key:"type",
        value: data.type===1?"file":"folder"
      })

      this.detailData[p].other.push({
        key:"version",
        value: data.version
      })

      this.detailData[p].other.push({
        key:"created",
        value: data.created
      })

      this.detailData[p].other.push({
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
    OpenBox,
    NSelect,
  },
  computed:{
    routeData(){
      return useRoute();
    },
  },
  props:{
    fileService:Object
  },
  setup() {
    let theme = useThemeVars();
    return {
      borderColor : computed(() => theme.value.borderColor),
      opacity2 : computed(() => theme.value.opacity2),
      version: ref(0),
      detailData:reactive([{
        title:"",
        msg:"",
        url:"",
        isFolder:false,
        other:[{key:"key",value:"value"}],
      }]),
      versionOptions:reactive([]),

    }
  }
}
</script>

<style scoped>
.mainDetail{
  margin: 10px auto;
}
.mainBox{
  margin-top: 4px;
}

.detailPanel{
  vertical-align: top;
  display: inline-block;
  width: calc( 100% - 207px );
}
.otherPanel{
  margin-left: 5px;
  width: 200px;
  display: inline-block;
  border-radius: 5px;
  border: 1px solid v-bind(borderColor);
}

@media all and (max-width: 930px) {
  .detailPanel{
    width: 100%;
  }
  .otherPanel{
    margin-top: 4px;
    margin-left: 0;
    width: 100%;
  }
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
