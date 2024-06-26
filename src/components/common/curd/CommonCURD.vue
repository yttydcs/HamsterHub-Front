<template>
  <div class="mainBox">
    <div class="controlPanel">
      <n-space>
        <n-button type="info" @click="openCreateBox">{{ curLang.lang.curd.addBtn }}</n-button>
        <n-button type="warning" @click="openModifyBox">{{ curLang.lang.curd.changeBtn }}</n-button>
        <n-button type="error" @click="deleteHandle">{{ curLang.lang.curd.removeBtn }}</n-button>
        <n-button @click="getData">{{ curLang.lang.curd.refreshBtn }}</n-button>
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
        :title="curLang.lang.curd.addTitle"
        size="medium"
        :bordered="false"
    >
      <n-form :model="formData" v-for="(item,index) in tableData.addModel" :key="index">
        <!--    textBox    -->
        <n-form-item-row :label="item.title" v-if="item.type==='text'">
          <n-input v-model:value="formData[item.key]" :placeholder="curLang.lang.plsInput"/>
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
              :options="arrayBox[item.key].option"
              @update:value="handleUpdateValue"
              :loading="arrayBox.loading"
              @update:show="show=> arraySelectHandle(show,item.typeValue,item.key)"
          />
        </n-form-item-row>

        <!--    kvBox    -->
        <n-form-item-row :label="item.title" v-if="item.type==='kv'" >
          <n-input v-model:value="formData[item.key]" :placeholder="curLang.lang.plsInput" :disabled="true"/>
          <n-button style="margin-left: 2px" @click="openKvHandle(item.typeValue,formData,item.key)">
            {{ curLang.lang.settingBtn }}
          </n-button>
        </n-form-item-row>
      </n-form>

      <n-space align="stretch" justify="end">
        <n-button class="sendBtn" type="primary" block secondary strong @click="createHandle">
          {{ curLang.lang.curd.submitBtn }}
        </n-button>
        <n-button class="sendBtn" type="primary" block secondary strong @click="cancelHandle">
          {{ curLang.lang.curd.cancelBtn }}
        </n-button>
      </n-space>

    </n-modal>

    <!--    modifyBox    -->
    <n-modal
        v-model:show="modifyBox"
        class="alertBox"
        preset="card"
        :title="curLang.lang.curd.changeTitle"
        size="medium"
        :bordered="false"
    >
      <n-form :model="formData" v-for="(item,index) in tableData.modifyModel" :key="index">

        <!--    textBox    -->
        <n-form-item-row :label="item.title" v-if="item.type==='text'">
          <n-input
              v-model:value="formData[item.key]"
              :placeholder="curLang.lang.plsInput"
          />
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
              :options="arrayBox[item.key].option"
              @update:value="handleUpdateValue"
              :loading="arrayBox.loading"
              @update:show="show => arraySelectHandle(show,item.typeValue,item.key)"
          />
        </n-form-item-row>

        <!--    kvBox    -->
        <n-form-item-row :label="item.title" v-if="item.type==='kv'" >
          <n-input v-model:value="formData[item.key]" :placeholder="curLang.lang.plsInput" :disabled="true"/>
          <n-button style="margin-left: 2px" @click="openKvHandle(item.typeValue,formData,item.key)">
            {{ curLang.lang.settingBtn }}
          </n-button>
        </n-form-item-row>
      </n-form>

      <n-space align="stretch" justify="end">
        <n-button class="sendBtn" type="primary" block secondary strong @click="modifyHandle" >
          {{ curLang.lang.curd.submitBtn }}
        </n-button>
        <n-button class="sendBtn" type="primary" block secondary strong @click="cancelHandle">
          {{ curLang.lang.curd.cancelBtn }}
        </n-button>
      </n-space>
    </n-modal>



    <!--    kvBox    -->
    <n-modal
        v-model:show="kvBox.show"
        class="alertBox"
        preset="card"
        :title="kvBox.title"
        size="medium"
        :bordered="false"
    >
      <KVInput
          ref="KVInput"
          :template="kvBox.template"
          :modify-handle="kvBox.handle"
          :cancel-handle="()=>{kvBox.show = false}"
          :old-value="kvBox.oldValue"

      />
    </n-modal>

  </div>
</template>

<script setup>
import {h, ref, watch, reactive, onMounted} from "vue";
import {NButton, NSpace, NInput, NDataTable, NModal, NForm, NFormItemRow, NSelect, NTag} from "naive-ui";
import curLang from "@/common/lang";
import KVInput from "@/components/common/curd/KVInput.vue";


const props = defineProps({
  formModel: Object, // 用于动态生成表单， 第一个对象表示索引,删除时传递该值
  formFun: Object
});

const tableData= reactive({
  headers:[],
  addModel:[],
  modifyModel:[],
  items:[],
});
const formData=reactive({});
const pagination= ref(true);
const createBox= ref(false);
const modifyBox= ref(false);
const kvBox=reactive({show:false,title:"",oldValue:"",handle:Function,template:{}});
const curRow= ref(1);
const checkedRowKeys=ref([1]);
const arrayBox= reactive({loading:false, option:{}});

// 从formModel中构建出增加表单和删除表单的数据
function createFormByModel(model,checkIndex="show"){
  let res = []

  for (let i = 0; i < model.length; i++) {
    if(model[i][checkIndex]){

      let o = {
        title: model[i].title,
        key: model[i].key,
        modifyHide: model[i]["modifyHide"],
        type: model[i]["type"],
        require: model[i]["require"],
      }

      // 如果是"enum" 构建 option，其余直接赋值
      if(model[i]["type"] === "enum" || model[i]["type"] === "array" || model[i]["type"] === "kv"){
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
}

function createOptionByArray(arr) {
  let options = []

  for (let i = 0; i < arr.length; i++) {
    options.push({
      label: arr[i],
      value: i,
    })
  }

  return options
}

function createOptionByArrayValue(arr) {
  let options = []

  for (let i = 0; i < arr.length; i++) {
    options.push({
      label: arr[i],
      value: arr[i],
    })
  }

  return options
}
// 从formModel中构建出表格的数据
function createListByModel (model,checkIndex="show"){// 从formModel中构建出增加表单和删除表单的数据
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
      arrayBox[(model[i]["key"])]={};
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
}

function openCreateBox(){
  createBox.value = true;
}
function openModifyBox(){
  let m = tableData.modifyModel

  // 获得当前选中的对象
  let cur = tableData.items[curRow.value-1]

  // 设置旧值
  for (let i = 0; i < m.length; i++) {
    formData[m[i].title] = cur[m[i].title];
  }

  modifyBox.value = true;
}

function getData(){
  props.formFun.get().then(res=>{
    // 设置索引
    for (let i = 0; i < res.data.length; i++) {
      res.data[i]["_indexKey"] = i+1;
    }
    tableData.items = res.data
  })
}

function createHandle(){
  props.formFun.create(formData).then(res => {
    createBox.value = false;
    getData();
  })
}

function modifyHandle(){
  props.formFun.update(formData).then(res => {
    modifyBox.value = false;
    getData();
  })
}

function deleteHandle(){
  props.formFun.delete(tableData.items[curRow.value-1].id).then(res => {
    modifyBox.value = false;
    getData();
  })
}

function cancelHandle(){
  createBox.value = false;
  modifyBox.value = false;
}

function openKvHandle(create,d,index){
  kvBox.show = true;
  kvBox.template = create(d);
  kvBox.title = index;
  kvBox.oldValue = formData[index]

  kvBox.handle = (data)=>{
    kvBox.show = false;
    formData[index] = JSON.stringify(data)
  }

}

function handleCheck(rowKeys) {
  curRow.value = rowKeys[0]
}

function rowKey(row){
  return row["_indexKey"]
}

function handleUpdateValue(value, option){
  // to do
}

async function arraySelectHandle(show, fetchFun, key) {
  if (!show) {
    return
  }

  arrayBox.loading = true
  let option
  if(fetchFun){
    option = await fetchFun(formData[key])
  }
  arrayBox[key].option = option
  arrayBox.loading = false
}

onMounted(()=>{
  // 构建表头
  tableData.headers = createListByModel(props.formModel)

  // 构建增加表单model
  tableData.addModel = createFormByModel(props.formModel,"create")

  // 构建修改表单model
  tableData.modifyModel = createFormByModel(props.formModel,"modify")

  // 首次获取数据
  getData();
})
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

/* 优化小窗口的体验 */
@media only screen and (max-width: 600px){
  .alertBox{
    width: 100%;
  }
}

</style>

