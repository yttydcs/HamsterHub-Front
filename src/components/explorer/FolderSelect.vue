<template>
  <div>
    <n-modal
        :show="show"
        class="alertBox"
        preset="card"
        :title="title + `: ` + data.name"
        size="medium"
        @close="cancelFunc"
        :show-line="true"


    >

      <n-spin :show="loading" :delay="100">
        <n-tree
            block-line
            :data="treeData"
            :on-load="handleLoad"
            :on-update:selected-keys="handleNodeClick"
            check-strategy="all"
            selectable
        />
      </n-spin>

      <n-space class="=control-btn" align="stretch" justify="end">
        <n-button type="primary" block secondary strong @click="confirmFunc(isSelect,root,parentId)" >
          {{ curLang.lang.confirmBtn.ok }}
        </n-button>
        <n-button  type="primary" block secondary strong @click="cancelFunc">
          {{ curLang.lang.confirmBtn.cancel }}
        </n-button>
      </n-space>

    </n-modal>

  </div>
</template>

<script setup>
import {NButton, NModal, NSpace, NTree, NSpin} from "naive-ui";
import {reactive, ref} from "vue";
import strategy from "@/api/strategy";
import fileService from "@/service/hamster/file"
import curLang from "@/common/lang";

const props = defineProps({
  title: String,
  show:Boolean,
  data:Object,
  confirmFunc:Function,
  cancelFunc:Function
})


const model = reactive({value:""})
const treeData = ref([
  {
    label: "waiting",
    key: "0",
    isLeaf: false
  }
])
const loading = ref(false)
const root = ref(null)
const parentId = ref(null)
const isSelect = ref(false)

function fetchRoot(){
  loading.value = true;
  strategy.query().then(res =>{
    let arr = res.data

    if(arr===undefined || arr.length<=0){
      return
    }

    treeData.value.length = 0
    for (let i = 0; i < arr.length; i++) {
      treeData.value.push({
        label: arr[i].root,
        key: arr[i].id,
        isLeaf: false,
        isRoot: true,
        root:arr[i].root
      })
    }

    loading.value = false;
  })
}

async function handleLoad(node) {
  let root = node.root
  let parentId = "0";

  if(!node.isRoot){
    parentId = node.key;
  }

  let files = (await fileService.fetchFileData(root,parentId)).data

  if (files.length <=0){
    node.isLeaf = true
    window.$message.info("该目录下未发现目录")
  }else{
    node.children = [];
    for (let i = 0; i < files.length; i++) {
      // 只选文件夹
      if(files[i].type === 0){
        node.children.push({
          label: files[i].name,
          key: files[i].id,
          isLeaf: false,
          isRoot: false,
          root:node.root
        })
      }
    }
    if(node.children.length<=0){
      node.isLeaf = true
      window.$message.info("该目录下未发现目录")
    }
  }
}

function flushData(){
  treeData.value.length = 0;
  fetchRoot();
}

function handleNodeClick(value,options){
  let option = options[0]

  if(value.length<=0){
    isSelect.value = false;
    return
  }else{
    isSelect.value = true;
  }

  let isRoot = option.isRoot;
  root.value = option.root;

  if(isRoot){
    parentId.value = 0;
  }else{
    parentId.value = option.key;
  }
}

defineExpose({flushData})

</script>

<style>
.control-btn {
  margin-top: 10px;
}

.alertBox{
  width: 600px
}

/* 优化小窗口的体验 */
@media only screen and (max-width: 600px){
  .alertBox{
    width: 100%;
  }
}
</style>
