<template>
  <div class="container">
<!--    <previewVideo url="http://127.0.0.1:8088/api/download?ticket=egivvpvVgJ&fileName=QQ2024510-153114.mp4" />-->
  </div>

</template>

<script setup>
import danma from "@/api/danma"
import {defineComponent, onMounted} from "vue";

defineComponent({
  name: 'TestLayout',
});

async function test(){
  let res = (await danma.queryCidDirect(null,"BV1di421C7ZY")).data[0].cid
}

onMounted(()=>{
  test()
})

</script>

<style>


</style>
