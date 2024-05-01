<template>
  <div>
    <n-modal
        :show="show"
        class="alertBox"
        preset="card"
        :title=title
        size="medium"
        @close="cancelFunc"
    >
      <n-form v-model:model="model" label-placement="left">
        <n-form-item path="value" :label="curLang.lang.form.name">
          <n-input  v-model:value="model.value" type="text" />
        </n-form-item>
      </n-form>

        <n-space class="=control-btn" align="stretch" justify="end">

          <n-button type="primary" block secondary strong @click="confirmFunc(model.value)" >
            {{ curLang.lang.confirmBtn.ok }}
          </n-button>
          <n-button  type="primary" block secondary strong @click="cancelFunc">
            {{ curLang.lang.confirmBtn.cancel }}
          </n-button>
        </n-space>

    </n-modal>

  </div>
</template>

<script>
import {NButton, NInput, NModal, NSpace, NForm, NFormItem} from "naive-ui";
import {reactive, ref} from "vue";
import curLang from "@/common/lang";

export default {
  name: 'InputBox',
  components: {NInput, NButton, NModal, NSpace, NForm, NFormItem},
  props: {
    title:String,
    show:Boolean,
    confirmFunc:Function,
    cancelFunc:Function
  },
  setup(){
    return {
      curLang,
      model:reactive({
        value:""
      })


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
