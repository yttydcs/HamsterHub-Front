<template>
  <div class="shareLayout">
    <div class="list">
      <n-card :title="curLang.lang.rssTask.filter" size="small" class="filter-box">
        {{ curLang.lang.rssTask.rssListId }}
        <n-input
            class="filter-input"
            v-model:value="targetRSSListId"
            type="text"
            :allow-input="onlyAllowNumber"
            :placeholder="curLang.lang.plsInput"
        />
        <n-button class="filter-submit-btn" @click="flushData">{{ curLang.lang.submitBtn }}</n-button>
      </n-card>
      <div
          class="item-box borderHover switchTheme box-unselected"
          v-for="(item,index) in rssTaskData.data"
          :key="index"
      >
        <!--    todo:icon    -->
        <div class="item-left">
          <div class="item-top">

            <div class="item-name">{{ item.title?item.title:item.id}}</div>
          </div>
          <div class="item-bottom">
            <div class="item-date"> {{ curLang.lang.rssTask.pubDate }}: {{item.pubDate}}</div>
            <div class="item-parent">{{ curLang.lang.rssTask.size }}: {{item.size}}</div>
            <div class="status"> {{ curLang.lang.taskDownload.state[item.state] }} </div>
          </div>
        </div>
        <div class="item-action">
          <n-space align="stretch"  style="width: 100%; height: 100%">
            <n-button class="button" quaternary @click="handleDelete(item.id)">
              <n-icon>
                <BanOutline />
              </n-icon>
            </n-button>
          </n-space>
        </div>
      </div>
    </div>


  </div>

</template>

<script setup>
import {
  NButton,
  NIcon,
  NSpace,
  NCard,
  NInput,
  useThemeVars
} from "naive-ui";
import {computed, onMounted, reactive, ref} from "vue";
import rssTask from "@/service/rss/task"
import { BanOutline } from "@vicons/ionicons5";
import curLang from "@/common/lang";
import calc from "@/common/calc";


let theme = useThemeVars();
const borderColor = computed(() => theme.value.borderColor);
const hoverColor = computed(() => theme.value.hoverColor);
const textColor = computed(() => theme.value.textColor3);
const cubicBezierEaseInOut = computed(() => theme.value.cubicBezierEaseInOut);
const rssTaskData=reactive({data:[]});
const targetRSSListId = ref(null)

onMounted(()=>{
  flushData()
})

async function flushData(){
  let res = await rssTask.query(targetRSSListId.value)
  rssTaskData.data = res.data
  for (let i = 0; i < rssTaskData.data.length; i++) {
    rssTaskData.data[i].pubDate = rssTaskData.data[i].pubDate.replace("T"," ")
    rssTaskData.data[i].size = calc.toSizeString(rssTaskData.data[i].size)
  }
}

async function handleDelete(id){
  await rssTask.delList(id)
  await flushData()
}
function onlyAllowNumber (value) {
  return  !value || /^\d+$/.test(value)
}


</script>

<style scoped>
.shareLayout{
  width: calc(100% - 20px);
  margin: 20px auto;
}

.box-unselected{
  border-color: v-bind(borderColor);
}

.borderHover:hover{
  background-color: v-bind(hoverColor);
}

.item-box{
  margin: 8px 0;
  border-radius: 5px;
  width: 100%;
  text-align: left;
  position: relative;
  padding-top: 10px;
  padding-bottom: 12px;
}

.item-top,.item-bottom{
  padding-left: 20px;
  width: calc(100% - 20px);
  line-height: 24px;
  overflow: hidden;
}

.item-top{
  margin-bottom: -4px;
}

.item-bottom{
  margin-bottom: -4px;
}

.action-box{
  /* height: 44px;*/
  display: flex;
  align-items: center;
  justify-content: center; /* 如果你希望水平居中 */
  height: 100%; /* 确保容器有高度以实现垂直居中 */
  padding: 0 3px;
  margin-right: 10px;
}

.item-name,.item-date,.item-parent,.item-action,.status,.action-box{
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
}

.item-date{
  font-size: 14px;
  color: v-bind(textColor);
  min-width: 150px;
}

.item-parent{
  font-size: 14px;
  color: v-bind(textColor);
  margin-left: 20px;
}

.item-name{
  font-size: 14px;
}

.item-left{
  display: inline-block;
  width: calc(100% - 70px);
  vertical-align: middle;
}

.item-action{
  display: inline-block;
  height: 24px;
}

.switchTheme{
  transition:all 0.3s v-bind(cubicBezierEaseInOut);
}

.button{
  height: 100%;
  font-size: 16px
}
.filter-box{
  text-align: left;
}

.filter-submit-btn{
  margin-left: 10px;
}

.filter-input{
  margin-left: 10px;
  width: 200px;
}

.status{
  display: inline-block;
  height: 24px;
  color: v-bind(textColor);
  margin-left: 20px;
}
</style>
