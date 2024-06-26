<template>
  <div class="pdfBox">
    <PDF class="pdf" :src="url" />
  </div>

</template>

<script setup>
import PDF from "pdf-vue3";
defineProps({ url:String })
</script>

<style scoped>
.pdfBox{
  height: calc(100vh - 250px) ;
}
</style>
