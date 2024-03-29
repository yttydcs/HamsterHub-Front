<template>
  <div class="mainBox">
    <div class="controlPanel">
      <n-space>
        <n-button type="info" @click="openCreateBox">新增</n-button>
        <n-button type="warning" @click="openModifyBox">修改</n-button>
        <n-button type="error" @click="deleteHandle">删除</n-button>
        <n-button @click="getData">刷新</n-button>
      </n-space>
    </div>
    <div class="list" v-if="tableData.headers.length>0">
      <n-data-table striped
          :columns="tableData.headers"
          :data="tableData.items"
          :pagination="pagination"
          :bordered="true"
          :row-key="rowKey"
          v-model:checked-row-keys="checkedRowKeys"
          @update-checked-row-keys="handleCheck"
      />
    </div>


    <!--    createBox    -->
    <n-modal

        v-model:show="createBox"
        class="alertBox"
        preset="card"
        title="新增"
        size="medium"
        :bordered="false"
    >
      <n-form :model="formData" v-for="(item,index) in tableData.addModel" :key="index">
        <!--    textBox    -->
        <n-form-item-row :label="item.title" v-if="item.type==='text'">
          <n-input v-model:value="formData[item.key]"/>
        </n-form-item-row>

        <!--    enumBox    -->
        <n-form-item-row :label="item.title" v-if="item.type==='enum'">
          <n-select
              placeholder=""
              v-model:value="formData[item.key]"
              :options="item.typeValue"
              @update:value="handleUpdateValue"
          />
        </n-form-item-row>

        <!--    arrayBox    -->
        <n-form-item-row :label="item.title" v-if="item.type==='array'">
          <n-select
              multiple
              placeholder=""
              v-model:value="formData[item.key]"
              :options="arrayBox.option"
              @update:value="handleUpdateValue"
              :loading="arrayBox.loading"
              @update:show="show=> arraySelectHandle(show,item.typeValue)"
          />
        </n-form-item-row>


      </n-form>

      <n-space align="stretch" justify="end">
        <n-button class="sendBtn" type="primary" block secondary strong @click="createHandle">
          新增
        </n-button>
        <n-button class="sendBtn" type="primary" block secondary strong @click="cancelHandle">
          取消
        </n-button>
      </n-space>

    </n-modal>

    <!--    modifyBox    -->
    <n-modal
        v-model:show="modifyBox"
        class="alertBox"
        preset="card"
        title="修改"
        size="medium"
        :bordered="false"
    >
      <n-form :model="formData" v-for="(item,index) in tableData.modifyModel" :key="index">
        <!--    textBox    -->
        <n-form-item-row :label="item.title" v-if="item.type==='text'">
          <n-input v-model:value="formData[item.key]"/>
        </n-form-item-row>

        <!--    enumBox    -->
        <n-form-item-row :label="item.title" v-if="item.type==='enum'">
          <n-select
              placeholder=""
              v-model:value="formData[item.key]"
              :options="item.typeValue"
              @update:value="handleUpdateValue"
          />
        </n-form-item-row>

        <!--    arrayBox    -->
        <n-form-item-row :label="item.title" v-if="item.type==='array'">
          <n-select
              multiple
              placeholder=""
              v-model:value="formData[item.key]"
              :options="arrayBox.option"
              @update:value="handleUpdateValue"
              :loading="arrayBox.loading"
              @update:show="show=> arraySelectHandle(show,item.typeValue,item.key)"
          />
        </n-form-item-row>
      </n-form>

      <n-space align="stretch" justify="end">
        <n-button class="sendBtn" type="primary" block secondary strong @click="modifyHandle" >
          修改
        </n-button>
        <n-button class="sendBtn" type="primary" block secondary strong @click="cancelHandle">
          取消
        </n-button>
      </n-space>
    </n-modal>

  </div>
</template>

<script>
import {h, defineComponent, ref, watch, reactive} from "vue";
import {
  NIcon,
  NAvatar,
  NButton,
  NSpace,
  NInput,
  NDataTable,
  NModal,
  NForm,
  NFormItemRow,
  NSelect,
  NTag
} from "naive-ui";


// 从formModel中构建出表格的数据
const createListByModel = (model,checkIndex="show")=>{
  let res = []
  if(checkIndex==="show"){
    // 如果是show就说明是用于生成列表的数据，第一个设置列表的一些属性
    res.push({
      type: "selection",
      multiple: false,
    })

    // 加入索引
    res.push({
      title: '#',
      key: '_indexKey',
      width: 40,
    })

  }

  for (let i = 0; i < model.length; i++) {
    if(model[i][checkIndex]){

      let o = {
        title: model[i].title,
        key: model[i].key,
        resizable: true,
      }

      // 渲染枚举的显示方式
      if(model[i]["type"]==="enum"){
        o["render"] = (row)=> {
          return `${model[i]["typeValue"][row.type]}`
        }
      }

      // 渲染数组的显示方式
      if(model[i]["type"]==="array"){
        o["render"] = (row) => {
          return row[model[i].key].map((tagKey) => {
            return h(
                NTag,
                {
                  style: {
                    marginRight: "6px"
                  },
                  type: "info",
                  bordered: false
                },
                {
                  default: () => tagKey
                }
            );
          });
        }

      }




      res.push(o)
    }
  }

  return res;
};

// 从formModel中构建出增加表单和删除表单的数据
const createFormByModel = (model,checkIndex="show")=>{
  let res = []

  for (let i = 0; i < model.length; i++) {
    if(model[i][checkIndex]){

      let o = {
        title: model[i].title,
        key: model[i].key,
        modifyHide: model[i]["modifyHide"],
        type: model[i]["type"],
      }

      // 如果是"enum" 构建 option
      if(model[i]["type"] === "enum" || model[i]["type"] === "array"){
        if(model[i]["typeValue"] instanceof Array ){
          o["typeValue"] = createOptionByArray(model[i]["typeValue"])
        }else{
          o["typeValue"] = model[i]["typeValue"]
        }
      }

      res.push(o)
    }
  }

  return res;
};

const createOptionByArray= (arr) => {
  let options = []

  for (let i = 0; i < arr.length; i++) {
    options.push({
      label: arr[i],
      value: i,
    })
  }

  return options
}

const createOptionByArrayValue= (arr) => {
  let options = []

  for (let i = 0; i < arr.length; i++) {
    options.push({
      label: arr[i],
      value: arr[i],
    })
  }

  return options
}


export default {
  name: 'commonCURD',
  components: {
    NFormItemRow,
    NForm,
    NInput,
    NDataTable,
    NSpace,
    NButton,
    NModal,
    NSelect,
  },
  methods:{
    openCreateBox(){
      this.createBox = true;
    },
    openModifyBox(){
      let m = this.tableData.modifyModel

      // 获得当前选中的对象
      let cur = this.tableData.items[this.curRow-1]

      // 设置旧值
      for (let i = 0; i < m.length; i++) {
        this.formData[m[i].title] = cur[m[i].title];
      }

      this.modifyBox = true;
    },
    getData(){
      this.formFun.get().then(res=>{
        // 设置索引
        for (let i = 0; i < res.data.length; i++) {
          res.data[i]["_indexKey"] = i+1;
        }
        this.tableData.items = res.data
      })
    },
    createHandle(){
      let that = this
      this.formFun.create(this.formData).then(res => {
        this.createBox = false;
        that.getData();
      })
    },
    modifyHandle(){
      let that = this
      this.formFun.update(this.formData).then(res => {
        this.modifyBox = false;
        that.getData();
      })
    },
    deleteHandle(){
      let that = this
      this.formFun.delete(this.tableData.items[this.curRow-1].id).then(res => {
        this.modifyBox = false;
        that.getData();
      })
    },
    cancelHandle(){
      this.createBox = false;
      this.modifyBox = false;
    },
    handleCheck(rowKeys) {
      this.curRow = rowKeys[0]
    },
    rowKey(row){
      return row["_indexKey"]
    },
    handleUpdateValue(value, option){
      // to do
    },
    async arraySelectHandle(show, fetchFun, key) {
      if (!show) {
        return
      }

      this.arrayBox.loading = true
      let option
      if(fetchFun){
        option = await fetchFun(this.formData[key])
      }
      this.arrayBox.option = option
      this.arrayBox.loading = false
    }

  },
  mounted() {

    // 构建表头
    this.tableData.headers = createListByModel(this.formModel)

    // 构建增加表单model
    this.tableData.addModel = createFormByModel(this.formModel,"create")

    // 构建修改表单model
    this.tableData.modifyModel = createFormByModel(this.formModel,"modify")

    // 首次获取数据
    this.getData();
  },
  props:{
    formModel: Object, // 用于动态生成表单， 第一个对象表示索引,删除时传递该值
    formFun: Object
  },
  setup(){
    return{
      tableData: reactive({
        headers:[],
        addModel:[],
        modifyModel:[],
        items:[],
      }),
      formData:reactive({}),
      pagination: true,
      createBox: ref(false),
      modifyBox: ref(false),
      curRow: ref(1),
      checkedRowKeys:ref([1]),
      arrayBox: reactive({
        loading:false,
        option:[]
      })

    }
  }
}
</script>


<style>

.controlPanel{
  margin: 10px 0;
}

.alertBox{
  width: 600px
}

.sendBtn{
  height: 40px;
}

// 优化小窗口的体验
@media only screen and (max-width: 600px){
  .alertBox{
    width: 100%;
  }
}

</style>

