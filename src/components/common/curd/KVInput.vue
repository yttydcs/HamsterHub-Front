<template>
  <div class="input-Box">

    <n-form :model="tempData" v-for="(item,index) in template" :key="index">
      <n-form-item-row :label="item.text.title" :path="item.key" >
        <n-input v-model:value="tempData[item.key]" :placeholder="curLang.lang.plsInput"/>
      </n-form-item-row>
    </n-form>

    <n-space align="stretch" justify="end">
      <n-button class="sendBtn" type="primary" block secondary strong @click="modify" >
        {{ curLang.lang.curd.submitBtn }}
      </n-button>
      <n-button class="sendBtn" type="primary" block secondary strong @click="cancel">
        {{ curLang.lang.curd.cancelBtn }}
      </n-button>
    </n-space>

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
import curLang from "@/common/lang";


export default {
  name: 'commonCURD',
  components: {
    NFormItemRow,
    NForm,
    NInput,
    NSpace,
    NButton,
  },
  methods:{
    modify(){
      this.modifyHandle(this.tempData);
      this.tempData={};
    },
    cancel(){
      this.cancelHandle();
      this.tempData={};
    },
    setOldValue(data){
      try {
        let temp = JSON.parse(data)
        for (let key in temp){
          this.tempData[key] = temp[key];
        }
      }catch(err){
        this.tempData = {};
      }


    }
  },
  mounted() {
      this.setOldValue(this.oldValue)
  },
  props:{
    template:Object,
    oldValue:String,
    modifyHandle: Function,
    cancelHandle: Function,
  },
  setup(){
    return{
      curLang,
      tempData: reactive({}),
    }
  }
}
</script>


<style>



</style>

