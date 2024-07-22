<template>
  <div class="shareLayout">
    <div class="list">
      <div
          class="item-box borderHover switchTheme box-unselected"
          v-for="(item,index) in shareListData.data"
          :key="index"
      >
        <!--    todo:icon    -->
        <div class="item-left">
          <div class="item-top">
            <div class="item-name">{{ item.name?item.name:item.id}}</div>
          </div>
          <div class="item-bottom">
            <div class="item-ticket"> {{ curLang.lang.shareList.code }}: {{item.ticket}}</div>
            <div class="item-expiry">{{ curLang.lang.shareList.expired }}: {{item.expiry.replace("T"," ")}}</div>
          </div>
        </div>
        <div class="item-action">
          <n-space align="stretch"  style="width: 100%; height: 100%">
            <n-button class="button" text @click="handleDelete(item.id,item.root)">
              <n-icon>
                <BanOutline />
              </n-icon>
            </n-button>

            <n-button v-if="item.type===0" class="button" text  @click="handleDownload(item.ticket,item.key)">
              <n-icon>
                <CloudDownloadOutline />
              </n-icon>
            </n-button>

            <n-button v-if="item.type!==0" class="button" text  disabled>
              <n-icon>
                <CloudDownloadOutline />
              </n-icon>
            </n-button>

            <router-link :to="`/s/`+item.ticket+`?key=`+item.key">
              <n-button class="button" text >
                <n-icon>
                  <OpenOutline />
                </n-icon>
              </n-button>
            </router-link>


          </n-space>


        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {NButton, NIcon, NSpace, useThemeVars} from "naive-ui";
import {computed, onMounted, reactive, ref} from "vue";
import share from "@/api/share";
import {BanOutline, CloudDownloadOutline, OpenOutline} from "@vicons/ionicons5";
import curLang from "@/common/lang";
import {onActivated} from "vue-demi";


let theme = useThemeVars();
const borderColor = computed(() => theme.value.borderColor);
const borderHover = computed(() => theme.value.primaryColorHover);
const borderSelected = computed(() => theme.value.primaryColorSuppl);
const hoverColor = computed(() => theme.value.hoverColor);
const textColor = computed(() => theme.value.textColor3);
const cubicBezierEaseInOut = computed(() => theme.value.cubicBezierEaseInOut);
const fileSelect = ref(false);
const shareListData=reactive({data:[]});

function flushData(){
  share.query().then((res)=>{
    shareListData.data = res.data
  })
}

function handleDelete(id,root){
  share.delete(id,root).then(res=>{
    flushData()
  })
}

function handleDownload(ticket,key){
  try {
    share.download(ticket,key)
  }catch (e) {

  }
}

onMounted(()=>{
  flushData()
})

onActivated(()=>{
  flushData()
})

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
  /* border-color: v-bind(borderHover);*/
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

.item-name,.item-ticket,.item-expiry,.item-action{
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
}

.item-ticket{
  font-size: 14px;
  color: v-bind(textColor);
  width: 150px;
}

.item-expiry{
  font-size: 14px;
  color: v-bind(textColor);
}

.item-name{
  font-size: 14px;
}

.item-left{
  display: inline-block;
  width: calc(100% - 90px);
  vertical-align: middle;
}

.item-action{
  display: inline-block;
  vertical-align: middle;
}

.switchTheme{
  transition:all 0.3s v-bind(cubicBezierEaseInOut);
}

.button{
  height: 100%;
  font-size: 16px
}

</style>
