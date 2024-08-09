<template>
  <div class="shareLayout">
    <div class="list">
      <div
          class="item-box borderHover switchTheme box-unselected"
          v-for="(item,index) in rssListData.data"
          :key="index"
      >
        <!--    todo:icon    -->
        <div class="item-left">
          <div class="item-top">
            <div class="item-name">{{ item.name?item.name:item.id}}({{ item.id }})</div>
          </div>
          <div class="item-bottom">
            <div class="item-root"> {{ curLang.lang.rssList.root }}: {{item.root}}</div>
            <div class="item-parent">{{ curLang.lang.rssList.parent }}: {{item.parentIndex}}</div>
          </div>
        </div>
        <div class="item-action">
          <n-space align="stretch"  style="width: 100%; height: 100%">
            <n-button class="button" quaternary @click="handleDelete(item.id)">
              <n-icon>
                <BanOutline />
              </n-icon>
            </n-button>

            <n-button class="button" quaternary @click="handleEdit(item)">
              <n-icon>
                <Edit />
              </n-icon>
            </n-button>


            <div class="action-box">
              <n-switch
                  size="small"
                  :value="item.state === 1"
                  :loading="item.loading"
                  @update:value="handleUpdateEnable(item)"
              />
            </div>
          </n-space>


        </div>
      </div>
    </div>

    <!--  添加按钮  -->
    <n-float-button :right="30" :bottom="30" shape="circle">
      <n-icon>
        <Add @click="addBoxShow = true"/>
      </n-icon>
    </n-float-button>

    <!--  选择位置组件  -->
    <FolderSelect
        ref="folderSelect"
        v-model:show="selectBoxShow"
        :title="curLang.lang.rssList.selectBox"
        :data="uploadModel"
        :cancelFunc="() =>{selectBoxShow=false;}"
        :confirm-func="confirmSelect"
    />

    <!--  新增界面  -->
    <n-modal
        v-model:show="addBoxShow"
        class="alertBox"
        preset="card"
        :title="curLang.lang.rssList.addRSS"
        size="medium"
        :show-line="true"
    >

      <n-form>
        <n-form-item-row :label="curLang.lang.rssList.rssName" >
          <n-input v-model:value="uploadModel.name" type="text" :placeholder="curLang.lang.plsInput"/>
        </n-form-item-row>

        <n-form-item-row :label="curLang.lang.rssList.downloadPosition" >
          <n-input v-model:value="uploadModel.showPosition" :disabled="true" :placeholder="curLang.lang.taskDownload.placeholder"/>
          <n-button @click="handleSelect">{{ curLang.lang.taskDownload.select }}</n-button>
        </n-form-item-row>

        <n-form-item-row :label="curLang.lang.rssList.downloadUrl" >
          <n-input v-model:value="uploadModel.url" type="textarea" :placeholder="curLang.lang.plsInput"/>
        </n-form-item-row>

        <n-form-item-row :label="curLang.lang.rssList.replaceHost" >
          <n-input v-model:value="uploadModel.replaceHost" type="text" :placeholder="curLang.lang.plsInput"/>
        </n-form-item-row>

        <n-form-item-row :label="curLang.lang.rssList.mirrorHost" >
          <n-input v-model:value="uploadModel.mirrorHost" type="text" :placeholder="curLang.lang.plsInput"/>
        </n-form-item-row>

      </n-form>

      <n-space class="=control-btn" align="stretch" justify="end">
        <n-button type="primary" block secondary strong @click="confirmAddRSS" >
          {{ curLang.lang.confirmBtn.ok }}
        </n-button>
        <n-button  type="primary" block secondary strong @click="addBoxShow = false">
          {{ curLang.lang.confirmBtn.cancel }}
        </n-button>
      </n-space>
    </n-modal>

    <!--  修改界面  -->
    <n-modal
        v-model:show="editBoxShow"
        class="alertBox"
        preset="card"
        :title="curLang.lang.rssList.editRSS"
        size="medium"
        :show-line="true"
    >

      <n-form>
        <n-form-item-row :label="curLang.lang.rssList.rssName" >
          <n-input v-model:value="uploadModel.name" type="text" :placeholder="curLang.lang.plsInput"/>
        </n-form-item-row>

        <n-form-item-row :label="curLang.lang.rssList.downloadPosition" >
          <n-input v-model:value="uploadModel.showPosition" :disabled="true" :placeholder="curLang.lang.taskDownload.placeholder"/>
          <n-button @click="handleSelect">{{ curLang.lang.taskDownload.select }}</n-button>
        </n-form-item-row>

        <n-form-item-row :label="curLang.lang.rssList.downloadUrl" >
          <n-input v-model:value="uploadModel.url" type="textarea" :placeholder="curLang.lang.plsInput"/>
        </n-form-item-row>

        <n-form-item-row :label="curLang.lang.rssList.replaceHost" >
          <n-input v-model:value="uploadModel.replaceHost" type="text" :placeholder="curLang.lang.plsInput"/>
        </n-form-item-row>

        <n-form-item-row :label="curLang.lang.rssList.mirrorHost" >
          <n-input v-model:value="uploadModel.mirrorHost" type="text" :placeholder="curLang.lang.plsInput"/>
        </n-form-item-row>

      </n-form>

      <n-space class="=control-btn" align="stretch" justify="end">
        <n-button type="primary" block secondary strong @click="confirmEditRSS" >
          {{ curLang.lang.confirmBtn.ok }}
        </n-button>
        <n-button  type="primary" block secondary strong @click="editBoxShow = false">
          {{ curLang.lang.confirmBtn.cancel }}
        </n-button>
      </n-space>
    </n-modal>

  </div>

</template>

<script setup>
import {
  NButton,
  NFloatButton,
  NForm,
  NFormItemRow,
  NIcon,
  NInput,
  NModal,
  NSpace,
  NSwitch,
  useThemeVars
} from "naive-ui";
import {computed, onMounted, reactive, ref} from "vue";
import rssList from "@/service/rss/list"
import {Add, BanOutline} from "@vicons/ionicons5";
import {Edit} from "@vicons/tabler";
import curLang from "@/common/lang";
import FolderSelect from "@/components/explorer/FolderSelect.vue";

let theme = useThemeVars();
const borderColor = computed(() => theme.value.borderColor);
const hoverColor = computed(() => theme.value.hoverColor);
const textColor = computed(() => theme.value.textColor3);
const cubicBezierEaseInOut = computed(() => theme.value.cubicBezierEaseInOut);
const rssListData=reactive({data:[]});
const addBoxShow=ref(false);
const editBoxShow=ref(false);
const selectBoxShow=ref(false);

const uploadModel = reactive({id:"",name:"", root:"",parentId:"",
  showPosition:"",url:"",replaceHost:"",mirrorHost:""});

const folderSelect = ref(null);

onMounted(()=>{
  flushData()
})

async function flushData(){
  let res = await rssList.query()
  if(!res.data){
    rssListData.data = [];
    return;
  }
  rssListData.data = res.data
  for (let i = 0; i < rssListData.data.length; i++) {
    rssListData.data[i].loading = false;
  }
}

async function confirmAddRSS(){
  await rssList.addList(uploadModel.root,uploadModel.parentId,
      uploadModel.url,uploadModel.name,1,uploadModel.replaceHost,uploadModel.mirrorHost);
  addBoxShow.value = false;
  await flushData()
}

async function handleDelete(id){
  await rssList.delList(id)
  await flushData()
}

async function handleEdit(item){
  editBoxShow.value = true;
  uploadModel.id = item.id;
  uploadModel.name = item.name;
  uploadModel.root = item.root;
  uploadModel.parentId = item.parentIndex;
  uploadModel.url = item.url;
  uploadModel.replaceHost = item.replaceHost;
  uploadModel.mirrorHost = item.mirrorHost;
  uploadModel.showPosition = "root: " + uploadModel.root + " parentId: " + uploadModel.parentId;
}

async function confirmEditRSS(){
  editBoxShow.value = false;

  await rssList.updateList(uploadModel.id ,uploadModel.root,uploadModel.parentId,uploadModel.url,
      uploadModel.name,1,uploadModel.replaceHost,uploadModel.mirrorHost);

  await flushData()
}

async function handleUpdateEnable(item){
  item.loading = true;
  let uploadState = item.state===1?0:1;
  await rssList.setListEnable(item.id, uploadState);
  item.state = uploadState;
  item.loading = false;
  await flushData()
}

function confirmSelect(isSelect,root,parentId){
  selectBoxShow.value = false;
  if(!isSelect){
    return;
  }
  uploadModel.parentId = parentId;
  uploadModel.root = root;
  uploadModel.showPosition = "root: " + root + " parentId: " + parentId;
}

function handleSelect(){
  folderSelect.value.flushData();
  selectBoxShow.value = true;
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

.item-name,.item-root,.item-parent,.item-action,.action-box{
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
}

.item-root{
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
  width: calc(100% - 180px);
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

</style>
