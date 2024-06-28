<template>
  <div ref="playContainer" class="videoBox">
    <video ref="playerBox" id="player-box" class="player" playsinline controls :src="src">
      <!-- Captions are optional -->
<!--      <track kind="captions" label="English captions" src="http://127.0.0.1:38088/api/download?ticket=iCsmIVvC4H&fileName=test.vtt" srclang="en" default />-->
    </video>
    <Teleport to=".plyr" v-if="ready">
      <div ref="danmakuContainer" id="dan-mu-box">
      </div>
    </Teleport>

    <!--settings-->
    <n-modal
        v-model:show="videoSettingShow"
        class="alertBox"
        preset="card"
        :title="curLang.lang.danmakuSetting.title"
        size="medium"
        :bordered="false"
    >
      <n-form>

        <n-form-item-row :label="curLang.lang.danmakuSetting.type" >
          <n-select
              v-model:value="danmakuSetting.type"
              :options="danmakuTypeOptions"
              :placeholder="curLang.lang.plsInput"
          />
          <!--          <n-input v-model:value="danmakuSettingModel.type" :placeholder="curLang.lang.plsInput"/>-->
        </n-form-item-row>

        <n-form-item-row :label="curLang.lang.danmakuSetting.url" >
          <n-input v-model:value="danmakuSetting.url" :placeholder="curLang.lang.plsInput"/>
        </n-form-item-row>

<!--        <n-form-item-row :label="curLang.lang.danmakuSetting.proxy" >-->
          <n-checkbox v-model:checked="danmakuSetting.proxy">{{ curLang.lang.danmakuSetting.proxy }}</n-checkbox>
<!--          <n-input v-model:value="danmakuSetting.url" :placeholder="curLang.lang.plsInput"/>-->
<!--        </n-form-item-row>-->

      </n-form>


      <n-space align="stretch" justify="end">
        <n-button class="sendBtn" type="primary" block secondary strong @click="videoSettingHandle">
          {{ curLang.lang.curd.submitBtn }}
        </n-button>
        <n-button class="sendBtn" type="primary" block secondary strong @click="()=>{videoSettingShow = false}">
          {{ curLang.lang.curd.cancelBtn }}
        </n-button>
      </n-space>

    </n-modal>

  </div>

</template>

<script setup>
import curLang from "@/common/lang";
import {loadDanmaku} from "@/service/danma";
import {onMounted, reactive, ref, nextTick} from "vue";

// 提供播放器支持
import 'plyr/dist/plyr.css';
import Plyr from 'plyr';

// 提供弹幕支持
import Danmaku from 'danmaku/dist/esm/danmaku.dom.js';
import {NButton, NForm, NFormItemRow, NInput, NModal, NSelect, NSpace, NCheckbox} from "naive-ui";
import {getEnum} from "@/common/enums";
import {onBeforeUnmount} from "vue-demi";

const props = defineProps({src:String, savedTimeKey:String,})
const playerObj = reactive({plyr:null,danmaku:null});
const resizeObserver = ref(null);
const ready = ref(false);
const videoSettingShow = ref(false);
const danmakuSetting = reactive({type:"",url:"",proxy:true});
const danmakuTypeOptions = reactive(createDanmakuTypeOptions());
const playerBox = ref(null)

function createDanmakuTypeOptions(){
  let danmakuType = getEnum("danmakuType")
  let res = []

  for (let i = 0; i < danmakuType.length; i++) {
    res.push({ label: danmakuType[i], value: danmakuType[i] });
  }
  return res;
}

function initPlyr (){
  let option = {
    controls: [
      'play-large',
      // 'restart',
      'rewind',
      'play',
      'fast-forward',
      'progress',
      'current-time',
      'duration',
      'mute',
      'volume',
      'captions',
      'settings',
      'pip',
      'airplay',
      // 'download',
      'fullscreen',
    ],
    i18n: curLang.lang.video ,
    tooltips: {
      controls: true,
      seek: true,
    },
    keyboard: {
      focused: true,
      global: true,
    },
    settings: ['captions', 'quality', 'speed', 'loop'],
    speed: {
      selected: 1,
      options: [0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4],
    },
    iconUrl:"/static/img/file/plyr.svg",
  }
  playerObj.plyr = new Plyr(".player", option);

  // 尝试回复进度
  let key = "savedTime-" + props.savedTimeKey
  const savedTime = localStorage.getItem(key);

  if (savedTime) {
    // 仅在第一次回复位置
    playerObj.plyr.once("playing", ()=>{
      window.$message.info(curLang.lang.video.autoGo)
      playerObj.plyr.currentTime = parseFloat(savedTime);
    })
  }

  // 记住当前播放位置
  playerObj.plyr.on('timeupdate', () => {
    localStorage.setItem(key, playerObj.plyr.currentTime);
  });


  // 播放结束清除记住的位置
  playerObj.plyr.on('ended', () => {
    localStorage.removeItem(key);
  });

}
function initDanMa(){
  let danmaku = new Danmaku({
    container: document.getElementById('dan-mu-box'),
    media: document.getElementById('player-box'),
    comments: [],
    engine: 'dom',
    speed: 144
  });
  playerObj.danmaku = danmaku;
  loadDanMa();
}
function debounce(func, delay) {// 防抖
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
function handleResize(entries) {
  playerObj.danmaku.resize();
}
async function loadDanMa(){
  if(!danmakuSetting.type || !danmakuSetting.url){
    return
  }
  // 清除原先弹幕
  playerObj.danmaku.clear();
  await loadDanmaku(danmakuSetting.type,danmakuSetting.url,insertBiliDanMa,danmakuSetting.proxy);
}
async function videoSettingHandle(){
  videoSettingShow.value = false;
  await loadDanMa();
}
function settingFunc(){
  videoSettingShow.value = true;
}
function insertBiliDanMa(text,mode,time,color){
  let _mode = 'rtl'

  if(mode === '5'){
    _mode = 'top'
  }else if(mode === '4'){
    _mode = 'bottom'
  }

  playerObj.danmaku.emit({
    text: text,
    // 'rtl'(right to left) by default, available mode: 'ltr', 'rtl', 'top', 'bottom'.
    mode: _mode,

    time: time,

    style: {
      fontSize: '20px',
      color: color,
      textShadow: "#000 1px 0 1px,#000 0 1px 1px,#000 0 -1px 1px,#000 -1px 0 1px",
      'font-weight': '500'
    },

  });

}

onMounted(()=>{
  initPlyr();
  ready.value = true;
  nextTick(initDanMa);
  resizeObserver.value = new ResizeObserver(debounce(handleResize, 500))
  resizeObserver.value.observe(playerBox.value);
})

onBeforeUnmount(()=>{
  if (resizeObserver.value) {
    resizeObserver.value.disconnect();
  }
})

defineExpose({settingFunc})
</script>

<style>
:root {
  --plyr-color-main: rgba(51, 54, 57,0.3);
}

.videoBox{
  position: relative;
}

.playContainer{
  width: 100%;
  height: 100%;
}

#dan-mu-box {
  position: absolute;
  pointer-events: none;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
}

</style>