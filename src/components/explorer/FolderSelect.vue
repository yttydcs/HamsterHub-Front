<template>
  <div>
    <n-modal
        :show="show"
        class="alertBox"
        preset="card"
        :title="`移动 ` + data.name"
        size="medium"
        @close="cancelFunc"
        :show-line="true"


    >
<!--      {{treeData}}-->
      <!--          :default-expanded-keys="defaultExpandedKeys"-->
      <n-tree
          block-line
          :data="treeData"
          :on-load="handleLoad"
          :on-update:selected-keys="handleNodeClick"
          check-strategy="all"
          selectable
      />

        <n-space class="=control-btn" align="stretch" justify="end">

          <n-button type="primary" block secondary strong @click="confirmFunc(isSelect,root,parentId)" >
            确定
          </n-button>
          <n-button  type="primary" block secondary strong @click="cancelFunc">
            取消
          </n-button>
        </n-space>

    </n-modal>

  </div>
</template>

<script>
import {NButton, NInput, NModal, NSpace, NForm, NFormItem, NTree} from "naive-ui";
import {reactive, ref} from "vue";
import strategy from "@/api/strategy";
import {fileList as fileData} from "@/common/fileList";
import file from "@/api/file";
import hamster from "@/common/adapter/hamster";
import alist from "@/common/adapter/alist";
const adapters = [hamster, alist];


// NInput,NForm, NFormItem,
export default {
  name: 'FolderSelect',
  components: { NButton, NModal, NSpace, NTree },
  props: {
    // title:String,
    show:Boolean,
    data:Object,
    confirmFunc:Function,
    cancelFunc:Function
  },

  methods:{
    fetchRoot(){
      let that = this
      strategy.query().then(res =>{
        let arr = res.data

        if(arr===undefined || arr.length<=0){
          return
        }

        that.treeData.length = 0
        for (let i = 0; i < arr.length; i++) {
          that.treeData.push({
            label: arr[i].root,
            key: arr[i].id,
            isLeaf: false,
            isRoot: true,
            root:arr[i].root
          })
        }

      })
    },

    async getFileData(root,parentId){

      const adapterOption = fileData.device;
      const that = this;

      if(adapterOption === 0){
        let res = await file[adapterOption].getFile(root,parentId)
        if (adapters[adapterOption].judgeLoginCode(res.code)) {
          return res.data
        }
      }

      return [];
    },

    async handleLoad(node) {
      // console.log("node",node)
      let root = node.root

      let parentId = "0";
      if(!node.isRoot){
        parentId = node.key;
      }

      let files = await this.getFileData(root,parentId)

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
    },
    handleNodeClick(value,options){
      let option = options[0]

      if(value.length<=0){
        this.isSelect=false;
        return
      }else{
        this.isSelect=true;
      }

      let isRoot = option.isRoot;
      this.root = option.root;

      if(isRoot){
        this.parentId = 0;
      }else{
        this.parentId = option.key;
      }
    },
  },
  mounted() {
    this.fetchRoot()
  },
  activated() {
    this.fetchRoot()
  },
  setup(){

    return {
      model:reactive({
        value:""
      }),
      treeData: ref([
        {
          label: "a",
          key: "0",
          isLeaf: false
        }
      ]),
      root:ref(null),
      parentId:ref(null),
      isSelect:ref(false),

    }
  }
}
</script>

<style>
.control-btn {
  margin-top: 10px;
}

.alertBox{
  width: 600px
}

// 优化小窗口的体验
@media only screen and (max-width: 600px){
  .alertBox{
    width: 100%;
  }
}
</style>
