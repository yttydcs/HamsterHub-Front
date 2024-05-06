<template>
  <div class="file-box switchTheme borderHover"
       :class="[fileSelect? 'file-selected' : 'file-unselected']"
       @click="fileClick(fileIndex)"
       @dblclick="dbClick(fileIndex)"
       @contextmenu="e=>handleContextMenuShow(e,fileIndex)"
       v-if="!boxStyle"
  >
    <div class="file-img switchTheme">
      <fileIcon :file-type="iconType" />
    </div>
    <div class="file-name switchTheme">
      <div class="file-name-text switchTheme">
        {{ fileName }}
      </div>
      <div class="file-detail" @click="e=>handleButtonContextMenuShow(e,fileIndex)">
        <n-button text style="height: 40px;font-size: 24px;" >
          <n-icon>
            <detail-icon />
          </n-icon>
        </n-button>
      </div>
    </div>
  </div>

  <div class="file-box-line switchTheme borderHover"
       :class="[fileSelect? 'file-selected' : 'file-unselected']"
       @click="fileClick(fileIndex)"
       @dblclick="dbClick(fileIndex)"
       @contextmenu="e=>handleContextMenuShow(e,fileIndex)"
       v-else
  >
    <div class="file-img-line switchTheme">
      <fileIcon :file-type="iconType" />
    </div>
    <div class="file-name-line switchTheme">
      <div class="file-name-text-line switchTheme">
        {{ fileName }}
      </div>
      <div class="file-msg-text-line switchTheme">
        {{ modified.replace("T"," ")  + ` · ` +  calc.toSizeString(size) }}
      </div>

    </div>
    <div class="file-detail-line" @click="e=>handleButtonContextMenuShow(e,fileIndex)">
      <n-button text style="height: 60px;font-size: 24px;" >
        <n-icon>
          <detail-icon />
        </n-icon>
      </n-button>
    </div>
  </div>


</template>

<script>
import { NIcon, NButton, useThemeVars} from "naive-ui";
import { computed } from "vue";
import { Menu as DetailIcon } from "@vicons/ionicons5";
import { openMenuByCondition } from "@/common/fileContextMenuOption";
import fileIcon from "@/components/explorer/FileIcon.vue";
import calc from "@/common/calc";
import fileType from "@/common/fileType";


export default {
  name: 'FileBox',
  components: {
    NButton,
    DetailIcon,
    NIcon,
    fileIcon
  },
  props:{
    fileIndex:Number,
    fileName:String,
    fileImgUrl:String,
    fileSelect:Boolean,
    fileClick: Function,
    dbClick: Function,
    isDir: Boolean,
    showMenu:Function,
    boxStyle:String,
    size:String,
    modified:String,
  },
  methods:{
    handleContextMenuShow(event,data){
      // 阻止默认事件
      event.preventDefault();
      openMenuByCondition(1,data)
    },
    handleButtonContextMenuShow(event,data){
      // 阻止点击事件向上传播
      event.stopPropagation();
      this.showMenu(event)
      openMenuByCondition(1,data)
    },

  },
  computed: {
    calc() {
      return calc
    },
    iconType: function () {
      return this.isDir?"dir":fileType.getIconTypeByName(this.fileName);
    }
  },
  setup(){
    let theme = useThemeVars();
    return{
      borderColor : computed(() => theme.value.borderColor),
      borderHover : computed(() => theme.value.primaryColorHover),
      borderSelected : computed(() => theme.value.primaryColorSuppl),
      cubicBezierEaseInOut : theme.value.cubicBezierEaseInOut,
      opacity2 : computed(() => theme.value.opacity2),
      hoverColor : computed(() => theme.value.hoverColor),
    }
  }
}
</script>

<style scoped>

.file-unselected{
  border-color: v-bind(borderColor);
}

.file-selected{
  border-color: v-bind(borderSelected);
}

.borderHover:hover{
  /*border-color: v-bind(borderHover);*/
  background-color: v-bind(hoverColor);
}

/*.borderHover:hover .file-name{
  border-color: v-bind(borderHover);
}*/

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

.file-box-line{
  height: 62px;
  border-width: 1px;
  border-style: solid;
  border-radius: 10px;
  width: 100%;
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

.file-img-line{
  display: inline-block;
  width: 60px;
  height: 60px;
  overflow: hidden;
  margin: 0;
}

.file-img svg{
  transform: translate(50%,50%);
  width: 50%;
  height: 50%;
}

.file-img-line svg{
  transform: translate(50%,50%);
  width: 50%;
  height: 50%;
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

.file-name-line{
  position: relative;
  top: -6px;
  width: calc( 100% - 100px) ;
  height: 100%;
  display: inline-block;

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

.file-name-text-line{
  height:28px;
  line-height: 28px;
  padding-left: 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}

.file-msg-text-line{
  padding-left: 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  height: 20px;
  line-height: 20px;
  opacity: v-bind(opacity2);
}

.file-detail{
  align-items: center;
  vertical-align: top;
  width: 30px;
  display: inline-block;
}

.file-detail-line{
  align-items: center;
  vertical-align: top;

  width: 30px;
  display: inline-block;
}

.switchTheme{
  transition:all 0.3s v-bind(cubicBezierEaseInOut);
}

</style>
