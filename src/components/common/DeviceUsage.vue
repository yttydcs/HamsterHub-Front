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

<script setup>
import { NProgress } from "naive-ui";
import { computed } from "vue";
import calc from "@/common/calc";
const props = defineProps({
  title:String,
  total:String,
  free:String,
  mini:Boolean,
})
const usedString = computed(()=>calc.toSizeString(props.total-props.free));
const freeString = computed(()=>calc.toSizeString(props.free));
const totalString = computed(()=>calc.toSizeString(props.total));
const percentage = computed(()=>{
  let total = Number(props.total);
  let free = Number(props.free);
  return (total-free)/total*100;
});
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
