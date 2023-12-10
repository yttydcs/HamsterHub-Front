<template>
  <div class="file-box switchTheme borderHover"
       :class="[fileSelect? 'file-selected' : 'file-unselected']"
       @click="fileClick(fileIndex)"
       @dblclick="dbClick(fileIndex)"
  >

    <div class="file-img ">
      <img :src=fileImgUrl alt="">
    </div>

    <div class="file-name switchTheme">
      <div class="file-name-text switchTheme">
        {{ fileName }}
      </div>


      <div class="file-detail">
        <n-button text style="height: 40px;font-size: 24px;">
          <n-icon>
            <detail-icon />
          </n-icon>
        </n-button>
      </div>

    </div>


  </div>


</template>

<script>
import {NLayout, NLayoutSider, NH2, NMenu, NIcon, NButton, useThemeVars} from "naive-ui";
import {computed, h, ref} from "vue";
import {PersonOutline,Menu as DetailIcon} from "@vicons/ionicons5";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export default {
  name: 'FileBox',
  components: {
    NButton,
    DetailIcon,
    NIcon
  },
  props:{
    fileIndex:Number,
    fileName:String,
    fileImgUrl:String,
    fileSelect:Boolean,
    fileClick: Function,
    dbClick: Function,
  },
  setup(){
    let theme = useThemeVars();
    // let borderColor = computed(() => theme.value.borderColor);
    // console.log(this.fileSelect)

    return{
      borderColor : computed(() => theme.value.borderColor),
      borderHover : computed(() => theme.value.primaryColorHover),
      borderSelected : computed(() => theme.value.primaryColorSuppl),
      cubicBezierEaseInOut : theme.value.cubicBezierEaseInOut
    }
  }
}
</script>

<style>

.file-unselected{
  border-color: v-bind(borderColor);
}

.file-selected{
  border-color: v-bind(borderSelected);
}

.borderHover:hover{
  border-color: v-bind(borderHover);
}

.borderHover:hover .file-name{
  border-color: v-bind(borderHover);
}

.file-box{
  display: inline-block;
  border-width: 1px;
  border-style: solid;

  border-radius: 10px;
  width: 100%;
  max-width: 240px;
  height: 150px;
  text-align: left;
  overflow: hidden;
  position: relative;
}

.file-img{
  display: inline-block;
  width: 100%;
  height: calc(100% - 40px);
  overflow: hidden;
  margin: 0;
}

.file-img img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.file-name{
  position: relative;
  border-top: 1px solid v-bind(borderColor);
  top: -7px;
  width: 100% ;
  height: 40px;
  line-height: 40px;
}

.file-name-text{
  display: inline-block;
  height:100%;
  width: calc(100% - 34px);
  padding-left: 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}

.file-detail{
  align-items: center;
  vertical-align: top;
  width: 30px;
  display: inline-block;
}

.switchTheme{
  transition:border 0.3s v-bind(cubicBezierEaseInOut);
}

</style>
