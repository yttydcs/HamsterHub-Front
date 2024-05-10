<template>
  <div ref="playContainer" class="videoBox">
    <video class="player" playsinline controls :src="src">

      <!-- Captions are optional -->
<!--      <track kind="captions" label="English captions" src="/path/to/captions.vtt" srclang="en" default />-->
    </video>
  </div>

</template>

<script>
import curLang from "@/common/lang";
import {reactive, ref, watch} from "vue";

import 'plyr/dist/plyr.css'; // 引入 plyr 的样式文件
import Plyr from 'plyr'; // 引入 plyr 的 JavaScript 文件

export default {
  name: 'videoBox',
  components: {

  },
  mounted() {
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
        // The options to display in the UI, if available for the source media (e.g. Vimeo and YouTube only support 0.5x-4x)
        options: [0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4],
      },
      // iconUrl:false,
    }
    this.playerObj.value = new Plyr(".player", option);
    console.log(this.playerObj)

    // 尝试回复进度
    let key = "savedTime-"+this.savedTimeKey
    const savedTime = localStorage.getItem(key);

    if (savedTime) {
      // 仅在第一次回复位置
      this.playerObj.value.once("playing", ()=>{
        this.playerObj.value.currentTime = parseFloat(savedTime);
      })
    }


    // 记住当前播放位置
    this.playerObj.value.on('timeupdate', () => {
      localStorage.setItem(key, this.playerObj.value.currentTime);
    });


    // 播放结束清楚记住的位置
    this.playerObj.value.on('ended', () => {
      localStorage.removeItem(key);
    });



  },
  props:{
    src:String,
    savedTimeKey:String
  },
  setup(){
    // 响应语言变化

    return{
      curLang,
      playerObj:reactive({value:null})
    }
  }
}
</script>

<style>
:root {
  --plyr-color-main: rgba(51, 54, 57,0.5);
}

</style>
