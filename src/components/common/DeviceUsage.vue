<template>
  <div class="box">
    <div class="text">
      <span  v-show="!mini">{{title}}</span>
      <span class="textData"  v-show="!mini"> {{usedString}} / {{totalString}}</span>

    </div>

    <n-progress
        type="line"
        :show-indicator="false"
        status="success"
        :percentage="percentage"
    />
  </div>
</template>

<script>
import {NProgress } from "naive-ui";
import {reactive, ref} from "vue";
import calc from "@/common/calc";

export default {
  name: 'DeviceUsage',
  components: {NProgress},
  computed:{
    usedString(){
      return calc.toSizeString(this.total-this.free);
    },
    freeString(){
      return calc.toSizeString(this.free);
    },
    totalString(){
      return calc.toSizeString(this.total);
    },
    percentage(){
      let total = Number(this.total);
      let free = Number(this.free);
      return (total-free)/total*100;
    }
  },
  props: {
    title:String,
    total:String,
    free:String,
    mini:Boolean,
  },
  setup(){
    return {
    }
  }
}
</script>

<style scoped>

  .box{
    text-align: left;
    width: 100%;
    height: 100%;
  }

  .text{
    margin-left: 3px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
  }

  .textData{
    float: right;
  }

</style>
