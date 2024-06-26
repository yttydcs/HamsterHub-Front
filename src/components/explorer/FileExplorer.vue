<template>
  <div class="explorer-box" ref="containerRef" @dragover.prevent @drop.prevent="handleDrop">
    <div class="file-path">

        <n-breadcrumb class="path-breadcrumb" >
          <n-breadcrumb-item>
            <n-icon :component="HomeOutline" @click="pathClick(-1)" @drop.prevent="dragDrop($event,-1)"/>
          </n-breadcrumb-item>
          <n-breadcrumb-item
              v-for="(path,index) in fileData.path"
              :key="index" @click="pathClick(index)"
              @drop.prevent="dragDrop($event,index)"
          >
            {{ path["label"] }}
          </n-breadcrumb-item>
        </n-breadcrumb>

      <div class="path-control">
        <n-space justify="space-around"  style="height: 100%">
          <n-button text style="font-size: 20px" @click="getFileData">
            <n-icon>
              <ArrowClockwise24Regular />
            </n-icon>
          </n-button>

          <n-button text style="font-size: 20px" @click="switchBoxStyle(null)" v-if="boxStyle==='line'" >
            <n-icon>
              <AppFolder24Regular />
            </n-icon>
          </n-button>

          <n-button text style="font-size: 20px" @click="switchBoxStyle('line')"  v-if="boxStyle===null" >
            <n-icon>
              <AppsListDetail24Regular />
            </n-icon>
          </n-button>

        </n-space>

      </div>
    </div>

    <div class="file-open"  v-if="fileData.isFile">
      <n-layout :native-scrollbar="false" style="height: 100%">
        <DetailBox
            ref="detailBox"
            :file-service="fileService"
        />

      </n-layout>
    </div>

    <div class="file-list-p" @contextmenu="handleContextMenuShow" v-else>
      <n-layout :native-scrollbar="false">
        <file-list
            style="padding-right: 24px"
            :file-list="fileData"
            :enter-path="enterPath"
            :file-click="setFileSelect"
            :show-menu="handleContextMenuShow"
            :box-style="boxStyle"
            :move-func="fileMove"
        />

      </n-layout>
      <div class="readmeBox">
        <OpenBox
            v-if="readme && fileData.readmeData.url"
            title="README.md"
            :url="fileData.readmeData.url"
            msg=""
        />
      </div>

    </div>

    <!--  文件列表的右键菜单  -->
    <n-dropdown
        placement="bottom-start"
        trigger="manual"
        :x="contextMenu.x"
        :y="contextMenu.y"
        :options="contextMenu.options"
        :show="contextMenu.isShow"
        :on-clickoutside="handleClickOutside"
        @select="handleContextMenuSelect"
    />

    <!--  新建文件夹  -->
    <InputBox
        :title="curLang.lang.explorerMenu.newDir"
        v-model:show="inputShow"
        :confirm-func="handleNewDir"
        :cancel-func="() =>{inputShow.value=false}"
    />

    <!--  新建分享  -->
    <n-modal
        v-model:show="shareBoxShow"
        class="alertBox"
        preset="card"
        :title="curLang.lang.explorerMenu.share  + ': '+ shareModel.fileName"
        size="medium"
    >
      <n-form v-model:model="shareModel" label-placement="top">
        <n-form-item path="name" :label="curLang.lang.form.name">
          <n-input  v-model:value="shareModel.name" type="text" />
        </n-form-item>

        <n-form-item path="key" :label="curLang.lang.form.shareCode">
          <n-input  v-model:value="shareModel.key" type="text" />
        </n-form-item>

        <n-form-item path="expiry" :label="curLang.lang.form.expiry">
          <n-input  v-model:value="shareModel.expiry" type="text" />
        </n-form-item>
      </n-form>

      <n-space class="=control-btn" align="stretch" justify="end">

        <n-button type="primary" block secondary strong @click="confirmShare" >
          {{ curLang.lang.confirmBtn.ok }}
        </n-button>
        <n-button  type="primary" block secondary strong @click="()=>{shareBoxShow = false}">
          {{ curLang.lang.confirmBtn.cancel }}
        </n-button>
      </n-space>

    </n-modal>


    <!--  移动  -->
    <FolderSelect
        ref="moveFolderSelect"
        v-model:show="moveBoxShow"
        :title="curLang.lang.explorerMenu.move"
        :data="moveModel"
        :cancelFunc="() =>{moveBoxShow.value=false;}"
        :confirm-func="confirmMove"
    />

    <!--  复制  -->
    <FolderSelect
        ref="copyFolderSelect"
        v-model:show="copyBoxShow"
        :title="curLang.lang.explorerMenu.copy"
        :data="copyModel"
        :cancelFunc="() =>{copyBoxShow.value=false;}"
        :confirm-func="confirmCopy"
    />

    <!--  重命名  -->
    <InputBox
        :title="curLang.lang.explorerMenu.rename"
        v-model:show="renameBoxShow"
        :confirm-func="confirmRename"
        :cancel-func="() =>{renameBoxShow.value=false}"
    />

  </div>



</template>

<script setup>
import {
  NBreadcrumb,
  NBreadcrumbItem,
  NLayout,
  NIcon,
  NSpace,
  useThemeVars,
  NButton,
  NDropdown,
  NInput,
  NForm, NFormItem, NModal, useLoadingBar
} from "naive-ui";
import {ref, computed, watch, reactive, nextTick, toRefs, onMounted} from "vue";

import FileList from "@/components/explorer/FileList.vue";
import {HomeOutline, LanguageOutline} from "@vicons/ionicons5";
import {useRoute, useRouter} from "vue-router";
import {addTasks} from "@/common/task/uploadTask";

import {
  ArrowClockwise24Regular,
  AppsListDetail24Regular,
  AppFolder24Regular,
} from "@vicons/fluent";

import curLang from "@/common/lang";
import {fileContextMenuOption,openMenuByCondition,closeAllMenu,findByKey} from "@/common/fileContextMenuOption";
import InputBox from "@/components/common/InputBox.vue";
import FolderSelect from "@/components/explorer/FolderSelect.vue";
import DetailBox from "@/components/explorer/DetailBox.vue";
import OpenBox from "@/components/common/OpenBox.vue";
import {onActivated} from "vue-demi";

const props = defineProps({
  fileMenu:Object,
  fileService:Object,
  readme:Boolean
})

const theme = useThemeVars();
const BorderColor = computed(()=>theme.value.borderColor)
const fileData = props.fileService.getFileListObject()

const route = useRoute()
const router = useRouter()
const collapsed = ref(false)
const cubicBezierEaseInOut = computed(()=>theme.value.cubicBezierEaseInOut)
const curRoot = ref(null)
const curParent = ref("0")
const contextMenu = reactive({isShow:false, options:fileContextMenuOption, x:0, y:0,})
const inputShow = ref(false)
const shareBoxShow = ref(false)
const shareModel = reactive({fileName:"",name:"",vFileId:"",key:"",expiry:""})
const moveBoxShow = ref(false)
const moveModel = reactive({name:"",vFileId:"",})
const copyBoxShow = ref(false)
const copyModel = reactive({name:"",vFileId:"",})
const renameBoxShow = ref(false)
const renameModel = reactive({name:"",vFileId:"",})
const loading = useLoadingBar()
const boxStyle = ref(null)
const readmeData = reactive({msg:"",name:"",url:""})

const detailBox = ref(null)
const moveFolderSelect = ref(null)
const copyFolderSelect = ref(null)

function changeRoute(){
  props.fileService.setRouteHistory();
}
function pathClick(index){
  props.fileService.setPathLength(index+1);
  getFileData();
  changeRoute();
}

async function switchRoot(root){
  props.fileService.setRoot(root);
  props.fileService.setPathLength(0);
  changeRoute();
  await getFileData()
}

function setFileSelect(index){
  fileData.file[index].selected = !fileData.file[index].selected
}

async function enterPath(index){
  props.fileService.enterPath(index);
  changeRoute();
  await getFileData(index);
}

async function handleFlush(){
  await handleRoute()
  await getFileData()
}

async function handleRoute(){
  let path = window.location.pathname
  await props.fileService.setPathByRoute(path)
}

async function getFileData(index){
  await props.fileService.getFileData();
  if(fileData.isFile){
    let fileObj = await props.fileService.getNextFileDetail(index)
    await detailBox.value.flushData(fileObj);
  }
}

async function switchBoxStyle(_boxStyle){
  boxStyle.value = _boxStyle;
  // await getFileData();
}

async function handleDrop(event){// 文件拖拽上传
  event.preventDefault();
  const  {files,items} = event.dataTransfer;

  if(files.length <= 0){
    return
  }

  let root = props.fileService.getCurRoot()
  let parent = (await props.fileService.getCurPathNode()).id
  let parentUrl = (await props.fileService.getPathString()).slice(0, -1)

  addTasks(files,items,root,parentUrl,parent)

  setTimeout(handleFlush, 300);

  // for (let i = 0; i < files.length; i++) {
  //   let data = await hash.fileToHash(files[i])
  //   await props.fileService.uploadFile(files[i],data)
  // }
}

function handleContextMenuShow(event){
  // 阻止默认行为
  event.preventDefault();

  // 仅打开部分，其他选项需要选中文件。
  openMenuByCondition(0)

  // 使其具备一定的关闭效果
  contextMenu.isShow = false
  nextTick().then(() => {
    contextMenu.isShow = true
    contextMenu.x = event.clientX;
    contextMenu.y = event.clientY;
  });
}

function handleContextMenuSelect(key){
  closeContextMenu()
  invokeMenuHandle(key)
}

function handleClickOutside() {
  closeContextMenu()
}

function closeContextMenu(){
  contextMenu.isShow = false;
  closeAllMenu()
}

function invokeMenuHandle(key){
  switch(key){
    case "open":
      let aim = fileContextMenuOption[findByKey(key)].data;
      enterPath(aim)
      break;
    case "newDir":
      inputShow.value = true;
      break;
    case "delete":
      handleDelete(key);
      break;
    case "download":
      handleDownload(key);
      break;
    case "share":
      handleShare(key);
      break;
    case "copyAddress":
      handleCopyUrl(key);
      break;
    case "move":
      handleMove(key);
      break;
    case "copy":
      handleCopy(key);
      break;
    case "detail":
      handleDetail (key);
      break;
    case "rename":
      handleRename(key);
      break;
  }
}

function getFileByKey(key){
  let aim = fileContextMenuOption[findByKey(key)].data;
  return fileData.file[aim];
}

async function handleNewDir(value){ // 执行文件夹创建
  inputShow.value = false;
  await props.fileService.newDir(value)
  await getFileData();
}

async function handleDelete(key){ // 执行文件删除
  let vFile = getFileByKey(key);
  await props.fileService.deleteFile(vFile)
  await getFileData();
}

async function handleDownload(key){ // 执行文件下载
  let vFile = getFileByKey(key);
  await props.fileService.downloadFile(vFile)
}

async function handleCopyUrl(key){ // 执行复制url
  let vFile = getFileByKey(key);
  await props.fileService.copyFileUrl(vFile);
}

async function handleShare(key){ // 打开分享窗口
  let vFile = getFileByKey(key);
  shareModel.fileName = vFile.name;
  shareModel.name = vFile.name;
  shareModel.vFileId = vFile.other.id;
  shareBoxShow.value = true;

}

async function handleMove(key){ // 打开移动窗口
  let vFile = getFileByKey(key);
  moveModel.name = vFile.name;
  moveModel.vFileId = vFile.other.id;
  moveFolderSelect.value.flushData(); // 刷新缓存数据
  moveBoxShow.value = true;
}

async function handleCopy(key){ // 打开拷贝窗口
  let vFile = getFileByKey(key);
  copyModel.name = vFile.name;
  copyModel.vFileId = vFile.other.id;
  copyFolderSelect.value.flushData(); // 刷新缓存数据
  copyBoxShow.value = true;
}

async function confirmShare(){
  props.fileService.shareFile(shareModel.vFileId,shareModel.key,shareModel.expiry,shareModel.name);
  shareModel.key = "";
  shareModel.expiry = "";
  shareBoxShow.value = false;
}

async function confirmMove(isSelect,root,parentId){
  moveBoxShow.value = false;
  if(!isSelect){
    return;
  }
  if(moveModel.vFileId === parentId){
    window.$message.info("不能自己向自己移动哦")
    return;
  }
  await props.fileService.moveFile(moveModel.vFileId,parentId)
  await getFileData()
}

async function confirmCopy(isSelect,root,parentId){
  copyBoxShow.value = false;
  if(!isSelect){
    return;
  }
  if(copyModel.vFileId === parentId){
    window.$message.info("不能自己向自己复制哦")
    return;
  }
  await props.fileService.copyFile(copyModel.vFileId,parentId)
  getFileData()
}

async function handleDetail(key){
  let vFile = getFileByKey(key);
  let root = fileData.root;
  let path = props.fileService.getPathString()+vFile.name;
  window.open("/detail?root="+root+"&path="+path);
}

async function handleRename(key){
  let vFile = getFileByKey(key);
  renameModel.vFileId = vFile.other.id;
  renameBoxShow.value = true;
}

async function confirmRename(value){ // 执行重命名
  renameBoxShow.value = false;
  await props.fileService.rename(renameModel.vFileId,value)
  getFileData();
}

function setMenu(){
  contextMenu.options.length = 0;
  contextMenu.options.push(...(props.fileMenu))
}

async function dragDrop(e,index){
  let to = (await props.fileService.getPathNodeByIndex(index)).id;
  let str = e.dataTransfer.getData('dragFile')
  if(!str ){
    return;
  }
  let files = str.split(",");
  if(files.length <= 0){
    return;
  }

  for (let i = 0; i < files.length; i++) {
    let from = files[i];
    if(from === to){
      continue;
    }
    await fileMove(from, to);
  }
}

async function fileMove(target,parentId){
  if(!target || !parentId){
    return;
  }
  if(target === parentId){
    window.$message.info("不能自己向自己移动哦")
    return;
  }
  await props.fileService.moveFile(target,parentId)
  await getFileData()
}

onActivated(()=>{
  setMenu()
  handleFlush()
})

onMounted(()=>{
  setMenu()
  handleFlush()
})

// 响应路由变化
watch(route, (newRoute) => {
  handleFlush();
});

// 使菜单响应语言变化
watch(curLang, () => {
  for (let i = 0; i < fileContextMenuOption.length; i++) {
    if ("label" in fileContextMenuOption[i]){
      fileContextMenuOption[i].label =curLang.lang.explorerMenu[fileContextMenuOption[i].key] ;
    }
  }
});

// 检查readme文件id
watch(() => fileData.readmeData.id, async (newId,oldId) => {
  if(!props.readme){
    return;
  }
  if(newId === -1){
    fileData.readmeData.url = "";
    return;
  }

  try {
    fileData.readmeData.url = await props.fileService.getDownloadUrl(newId);
  }catch(e){
    fileData.readmeData.url = "";
  }

});
</script>

<style>

.explorer-box{
  width: 100%;
  min-height: calc( 100vh - 110px );
}

.file-path{
  height: 40px;
  text-align: left;
  margin-top: 3px;
  margin-bottom: 3px;
  margin-left: 5px;
  width: calc( 100% - 23px );
  /*

  不用边框好看一点

  transition:border 0.3s v-bind(cubicBezierEaseInOut);
  border: 1px solid v-bind(borderColor);
  border-radius: 10px;
  */
  display: flex;
  align-items: center;
  vertical-align: center;
  overflow: hidden;
}

.path-control{
  display: flex;
  align-items: center;
  height: 100%;
}

.path-control button{
  margin-left: 10px;
  height: 100%;
}

.path-breadcrumb{
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-right: auto;
  overflow-y: auto;
}

.file-list-p{
  min-height: calc( 100vh - 110px );
  overflow: hidden;
}

.file-open{
  margin-left: 6px;
  height: calc( 100% - 90px );
  overflow: hidden;
}

.readmeBox{
  padding-left: 5px;
  padding-right: 18px;
}


</style>
