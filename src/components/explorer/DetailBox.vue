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
            {{ curLang.lang.explorerDetail[item.key] }}
          </div>
          <div class="value">
            {{item.value}}
          </div>
        </div>
      </div>
    </div>

  </div>


</template>

<script setup>
import {computed, reactive, ref} from "vue";
import {NSelect} from "naive-ui";
import OpenBox from "@/components/common/OpenBox.vue";
import calc from "@/common/calc";
import download from "@/common/download";
import {useThemeVars} from "naive-ui";
import curLang from "@/common/lang";

const props = defineProps({
  fileService:Object,
})

const theme = useThemeVars();
const borderColor = computed(() => theme.value.borderColor);
const opacity2 = computed(() => theme.value.opacity2);
const version = ref(0);
const detailData = reactive([{
  title:"",
  msg:"",
  url:"",
  isFolder:false,
  other:[{key:"key",value:"value"}],
}]);
const versionOptions = reactive([]);


async function flushData(fileObj){
  let data = fileObj;

  for (let i = 0; i < data.length; i++) {
    detailData[i]={};
    detailData[i]["title"] = data[i].name;

    data[i].created = data[i].created.replace("T"," ");
    data[i].modified = data[i].modified.replace("T"," ");

    detailData[i].version = data[i].version;

    if(data[i].type === 0){
      detailData[i].isFolder = true;
      detailData[i].url = "";
      detailData[i].msg = data[i].created.replace("T"," ");
    }else{
      detailData[i].url = await handleUrl(data[i].id);
      data[i].size = calc.toSizeString(data[i].size);
      detailData[i].msg = data[i].size + ` · ` + data[i].created.replace("T"," ");
    }

    await handleItem(data[i],i);
  }
  createOption();
}

function createOption(){
  versionOptions.length = 0;
  for (let i = 0; i <detailData.length; i++) {
    versionOptions.push({
      label: "version:"+detailData[i].version,
      value: i,
    })
  }
}

async function handleItem(data,p){
  detailData[p].other = []

  detailData[p].other.push({
    key:"name",
    value:data.name
  })

  detailData[p].other.push({
    key:"size",
    value:data.size
  })

  detailData[p].other.push({
    key:"type",
    value: data.type===1?"file":"folder"
  })

  detailData[p].other.push({
    key:"version",
    value: data.version
  })

  detailData[p].other.push({
    key:"created",
    value: data.created
  })

  detailData[p].other.push({
    key:"modified",
    value: data.modified
  })

}

async function handleUrl(id){
  let res = await props.fileService.getDownloadUrl(id)
  return download.toAbsolute(res)
}

defineExpose({flushData});

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
