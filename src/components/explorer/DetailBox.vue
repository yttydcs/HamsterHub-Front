<template>

  <div class="mainDetail">
    <div class="version">
      <n-select
          v-model:value="optionIndex"
          :options="fileOptions"
          @update-value="handleSelect"
          v-show="fileOptions.length>1"
      />
    </div>
    <div class="mainBox">
      <div class="detailPanel">
        <OpenBox
            :title="curFile.title"
            :msg="curFile.msg"
            :url="curFile.url"
            :is-folder = "curFile.isFolder"
        />
      </div>
      <div class="otherPanel">
        <div class="item" v-for="(item,index) in detailData[optionIndex].other" :key="index">
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
const optionIndex = ref(0);
const detailData = reactive([{
  id:"",
  title:"",
  msg:"",
  url:"",
  size:"",
  isFolder:false,
  other:[{key:"key",value:"value"}],
}]);
const fileOptions = reactive([]);
const curFile = reactive({
  id:"",
  title:"",
  msg:"",
  url:"",
  size:"",
  isFolder:false,
})


async function flushData(fileObj,index){
  if (!index){
    index = 0
  }
  let data = fileObj;

  for (let i = 0; i < data.length; i++) {
    detailData[i]={};
    detailData[i].id = data[i].id||data[i].other.id;
    detailData[i]["title"] = data[i].name;
    // detailData[i].version = data[i].version;
    detailData[i].url = "";

    let created = data[i].created||data[i].other.created

    if(data[i].type === 0){
      detailData[i].isFolder = true;
      detailData[i].msg = calc.formatTimestampWithUserTimeZone(created);
    }else{
      detailData[i].size = calc.toSizeString(data[i].size);
      detailData[i].msg = data[i].size + ` · ` +
          calc.formatTimestampWithUserTimeZone(created);
    }

    await handleItem(data[i],i);
  }
  optionIndex.value = index;
  await setCurFile(optionIndex.value)
  createOption();
}

async function handleSelect(value){
  await setCurFile(value)
}

async function setCurFile(index){
  let pos = index
  if (!pos){
    pos = 0;
  }
  curFile.title = detailData[pos].title;
  curFile.msg = detailData[pos].msg;
  curFile.url = await handleUrl(detailData[pos].id);
}

function createOption(){
  fileOptions.length = 0;
  let arr = curFile.title.split(".");
  if(arr.length <= 1){
    return
  }
  let suffix = arr.pop()
  for (let i = 0; i <detailData.length; i++) {
    // 只取后缀一样的
    if (!detailData[i].title.endsWith(suffix)){
      continue;
    }
    fileOptions.push({
      label: detailData[i].title,
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

  let type =data.type || data.other.type

  detailData[p].other.push({
    key:"type",
    value: type===1?"file":"folder"
  })

  // detailData[p].other.push({
  //   key:"version",
  //   value: data.version
  // })

  let created = data.created||data.other.created
  detailData[p].other.push({
    key:"created",
    value: calc.formatTimestampWithUserTimeZone(created)
  })

  detailData[p].other.push({
    key:"modified",
    value: calc.formatTimestampWithUserTimeZone(data.modified)
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
