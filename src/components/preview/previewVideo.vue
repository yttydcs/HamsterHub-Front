<template>
  <div ref="playContainer" class="videoBox">
    <video ref="player-box" id="player-box" class="player" playsinline controls :src="src">
      <!-- Captions are optional -->
      <!--      <track kind="captions" label="English captions" src="/path/to/captions.vtt" srclang="en" default />-->
    </video>
    <Teleport to=".plyr" v-if="ready">
      <div ref="danmakuContainer" id="dan-mu-box">
      </div>
    </Teleport>

  </div>

</template>

<script>
import curLang from "@/common/lang";
import danma, {loadDanmaku} from "@/service/danma";
import {reactive, ref, watch} from "vue";

// 提供播放器支持
import 'plyr/dist/plyr.css';
import Plyr from 'plyr';

// 提供弹幕支持
import Danmaku from 'danmaku/dist/esm/danmaku.dom.js';

export default {
  name: 'videoBox',
  mounted() {
    this.initPlyr();
    this.ready = true;
    this.$nextTick(this.initDanMa);

    this.resizeObserver = new ResizeObserver(this.debounce(this.handleResize, 500))
    this.resizeObserver.observe(this.$refs["player-box"]);
  },
  beforeUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  },
  methods:{
    initPlyr (){
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
        // iconUrl:false,
      }
      this.playerObj.plyr = new Plyr(".player", option);

      // 尝试回复进度
      let key = "savedTime-"+this.savedTimeKey
      const savedTime = localStorage.getItem(key);

      if (savedTime) {
        // 仅在第一次回复位置
        this.playerObj.plyr.once("playing", ()=>{
          window.$message.info(curLang.lang.video.autoGo)
          this.playerObj.plyr.currentTime = parseFloat(savedTime);
        })
      }

      // 记住当前播放位置
      this.playerObj.plyr.on('timeupdate', () => {
        localStorage.setItem(key, this.playerObj.plyr.currentTime);
      });


      // 播放结束清除记住的位置
      this.playerObj.plyr.on('ended', () => {
        localStorage.removeItem(key);
      });

    },
    initDanMa(){
      let danmaku = new Danmaku({
        container: document.getElementById('dan-mu-box'),
        media: document.getElementById('player-box'),
        comments: [],
        engine: 'dom',
        speed: 144
      });
      this.playerObj.danmaku = danmaku;
      this.loadDanMa();
    },
    debounce(func, delay) {// 防抖
      let timer;
      return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    handleResize(entries) {
      this.playerObj.danmaku.resize();
    },
    async loadDanMa(){
      if(!this.danMaType || !this.danMaUrl){
        return
      }
      // 清除原先弹幕
      this.playerObj.danmaku.clear();
      await loadDanmaku(this.danMaType,this.danMaUrl,this.insertBiliDanMa);
    },
    insertBiliDanMa(text,mode,time,color){
      let _mode = 'rtl'

      if(mode === '5'){
        _mode = 'top'
      }else if(mode === '4'){
        _mode = 'bottom'
      }

      this.playerObj.danmaku.emit({
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
  },
  props:{
    src:String,
    savedTimeKey:String,
    danMaType:String,
    danMaUrl:String,
  },
  setup(){
    // 响应语言变化

    return{
      curLang,
      playerObj:reactive({plyr:null,danmaku:null}),
      resizeObserver: null,
      ready:ref(false),
    }
  }
}
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
