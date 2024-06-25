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
        :cancel-func="() =>{this.inputShow=false}"
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
        :cancelFunc="() =>{this.moveBoxShow=false;}"
        :confirm-func="confirmMove"
    />

    <!--  复制  -->
    <FolderSelect
        ref="copyFolderSelect"
        v-model:show="copyBoxShow"
        :title="curLang.lang.explorerMenu.copy"
        :data="copyModel"
        :cancelFunc="() =>{this.copyBoxShow=false;}"
        :confirm-func="confirmCopy"
    />

    <!--  重命名  -->
    <InputBox
        :title="curLang.lang.explorerMenu.rename"
        v-model:show="renameBoxShow"
        :confirm-func="confirmRename"
        :cancel-func="() =>{this.renameBoxShow=false}"
    />

  </div>



</template>

<script>
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
import {ref, computed, watch, reactive, nextTick, toRefs} from "vue";

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


export default {
  name: 'mainLayout',
  computed: {
    HomeOutline() {
      return HomeOutline
    },
    BorderColor(){
      return useThemeVars().value.borderColor
    }
  },
  components: {
    OpenBox,
    NModal,
    NFormItem,
    NForm,
    NInput,
    NButton,
    NLayout,
    FileList,
    NBreadcrumb,
    NBreadcrumbItem,
    NIcon,
    NSpace,
    ArrowClockwise24Regular,
    AppsListDetail24Regular,
    AppFolder24Regular,
    NDropdown,
    InputBox,
    FolderSelect,
    DetailBox,
  },
  methods:{
    changeRoute(){
      this.fileService.setRouteHistory();
    },
    pathClick(index){
      this.fileService.setPathLength(index+1);
      this.getFileData();
      this.changeRoute();
    },
    async switchRoot(root){
      this.fileService.setRoot(root);
      this.fileService.setPathLength(0);
      this.changeRoute();
      await this.getFileData()

    },
    setFileSelect(index){
      this.fileData.file[index].selected = !this.fileData.file[index].selected
    },
    async enterPath(index){
      this.fileService.enterPath(index);
      this.changeRoute();
      await this.getFileData(index);
    },
    async handleFlush(){
      await this.handleRoute()
      await this.getFileData()
    },
    async handleRoute(){
      let path = window.location.pathname
      await this.fileService.setPathByRoute(path)
    },
    async getFileData(index){
      await this.fileService.getFileData();
      if(this.fileData.isFile){
        let fileObj = await this.fileService.getNextFileDetail(index)
        await this.$refs.detailBox.flushData(fileObj);
      }
    },
    async switchBoxStyle(boxStyle){
      this.boxStyle = boxStyle;
      // await this.getFileData();
    },
    async handleDrop(event){// 文件拖拽上传
      event.preventDefault();
      const  {files,items} = event.dataTransfer;

      if(files.length <= 0){
        return
      }

      let root = this.fileService.getCurRoot()
      let parent = (await this.fileService.getCurPathNode()).id
      let parentUrl = (await this.fileService.getPathString()).slice(0, -1)

      addTasks(files,items,root,parentUrl,parent)


      setTimeout(this.handleFlush, 300);

      // for (let i = 0; i < files.length; i++) {
      //   let data = await hash.fileToHash(files[i])
      //   await this.fileService.uploadFile(files[i],data)
      // }
    },
    handleContextMenuShow(event){
      // 阻止默认行为
      event.preventDefault();

      // 仅打开部分，其他选项需要选中文件。
      openMenuByCondition(0)

      // 使其具备一定的关闭效果
      this.contextMenu.isShow = false
      nextTick().then(() => {
        this.contextMenu.isShow = true
        this.contextMenu.x = event.clientX;
        this.contextMenu.y = event.clientY;
      });
    },
    handleContextMenuSelect(key){
      this.closeContextMenu()
      this.invokeMenuHandle(key)
    },
    handleClickOutside() {
      this.closeContextMenu()
    },
    closeContextMenu(){
      this.contextMenu.isShow = false;
      closeAllMenu()
    },
    invokeMenuHandle(key){
      switch(key){
        case "open":
          let aim = fileContextMenuOption[findByKey(key)].data;
          this.enterPath(aim)
          break;
        case "newDir":
          this.inputShow = true;
          break;
        case "delete":
          this.handleDelete(key);
          break;
        case "download":
          this.handleDownload(key);
          break;
        case "share":
          this.handleShare(key);
          break;
        case "copyAddress":
          this.handleCopyUrl(key);
          break;
        case "move":
          this.handleMove(key);
          break;
        case "copy":
          this.handleCopy(key);
          break;
        case "detail":
          this.handleDetail (key);
          break;
        case "rename":
          this.handleRename(key);
          break;
      }
    },
    getFileByKey(key){
      let aim = fileContextMenuOption[findByKey(key)].data;
      return this.fileData.file[aim];
    },
    async handleNewDir(value){ // 执行文件夹创建
      this.inputShow = false;
      await this.fileService.newDir(value)
      this.getFileData();
    },
    async handleDelete(key){ // 执行文件删除
      let vFile = this.getFileByKey(key);
      await this.fileService.deleteFile(vFile)
      this.getFileData();
    },
    async handleDownload(key){ // 执行文件下载
      let vFile = this.getFileByKey(key);
      await this.fileService.downloadFile(vFile)
    },
    async handleCopyUrl(key){ // 执行复制url
      let vFile = this.getFileByKey(key);
      await this.fileService.copyFileUrl(vFile);
    },
    async handleShare(key){ // 打开分享窗口
      let vFile = this.getFileByKey(key);
      this.shareModel.fileName = vFile.name;
      this.shareModel.name = vFile.name;
      this.shareModel.vFileId = vFile.other.id;
      this.shareBoxShow = true;

    },
    async handleMove(key){ // 打开移动窗口
      let vFile = this.getFileByKey(key);
      this.moveModel.name = vFile.name;
      this.moveModel.vFileId = vFile.other.id;
      this.$refs.moveFolderSelect.flushData(); // 刷新缓存数据
      this.moveBoxShow = true;
    },
    async handleCopy(key){ // 打开拷贝窗口
      let vFile = this.getFileByKey(key);
      this.copyModel.name = vFile.name;
      this.copyModel.vFileId = vFile.other.id;
      this.$refs.copyFolderSelect.flushData(); // 刷新缓存数据
      this.copyBoxShow = true;
    },
    async confirmShare(){
      this.fileService.shareFile(this.shareModel.vFileId,this.shareModel.key,this.shareModel.expiry,this.shareModel.name);
      this.shareModel.key = "";
      this.shareModel.expiry = "";
      this.shareBoxShow = false;
    },
    async confirmMove(isSelect,root,parentId){
      this.moveBoxShow = false;
      if(!isSelect){
        return;
      }
      if(this.moveModel.vFileId === parentId){
        window.$message.info("不能自己向自己移动哦")
        return;
      }
      await this.fileService.moveFile(this.moveModel.vFileId,parentId)
      this.getFileData()
    },
    async confirmCopy(isSelect,root,parentId){
      this.copyBoxShow = false;
      if(!isSelect){
        return;
      }
      if(this.copyModel.vFileId === parentId){
        window.$message.info("不能自己向自己复制哦")
        return;
      }
      await this.fileService.copyFile(this.copyModel.vFileId,parentId)
      this.getFileData()
    },
    async handleDetail(key){
      let vFile = this.getFileByKey(key);
      let root = this.fileData.root;
      let path = this.fileService.getPathString()+vFile.name;
      window.open("/detail?root="+root+"&path="+path);
    },
    async handleRename(key){
      let vFile = this.getFileByKey(key);
      this.renameModel.vFileId = vFile.other.id;
      this.renameBoxShow = true;
    },
    async confirmRename(value){ // 执行重命名
      this.renameBoxShow = false;
      await this.fileService.rename(this.renameModel.vFileId,value)
      this.getFileData();
    },
    setMenu(){
      this.contextMenu.options.length = 0;
      this.contextMenu.options.push(...this.fileMenu)
    },
    async dragDrop(e,index){
      let to = (await this.fileService.getPathNodeByIndex(index)).id;
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
        await this.fileMove(from, to);
      }
    // },
    },
    async fileMove(target,parentId){
      if(!target || !parentId){
        return;
      }
      if(target === parentId){
        window.$message.info("不能自己向自己移动哦")
        return;
      }
      await this.fileService.moveFile(target,parentId)
      this.getFileData()
    },
  },
  mounted() {
    this.setMenu()
    this.handleFlush()
  },
  activated() {
    this.setMenu()
    this.handleFlush()
  },
  props:{
    fileMenu:Object,
    fileService:Object,
    readme:Boolean
  },
  watch: {
    // 响应路由变化
    $route(to, from) {
      this.handleFlush();
    }
  },
  setup(props){
    let theme = useThemeVars();
    let borderColor = computed(() => theme.value.borderColor);
    let fileData = props.fileService.getFileListObject()

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

    return{
      curLang,
      router: useRouter(),
      collapsed: ref(false),
      borderColor,
      cubicBezierEaseInOut : theme.value.cubicBezierEaseInOut,
      fileData,
      curRoot:null,
      curParent:"0",
      contextMenu:reactive({
        isShow:false,
        options:fileContextMenuOption,
        x:0,
        y:0,
      }),
      inputShow:ref(false),
      shareBoxShow:ref(false),
      shareModel:reactive({fileName:"",name:"",vFileId:"",key:"",expiry:""}),
      moveBoxShow:ref(false),
      moveModel:reactive({name:"",vFileId:"",}),
      copyBoxShow:ref(false),
      copyModel:reactive({name:"",vFileId:"",}),
      renameBoxShow:ref(false),
      renameModel:reactive({name:"",vFileId:"",}),
      loading:useLoadingBar(),
      boxStyle:ref(null),
      readmeData:reactive({msg:"",name:"",url:""}),
    }
  }
}
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
