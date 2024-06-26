<template>
  <div class="docxBox">
    <vue-office-docx
        :src="url"
    />
  </div>
</template>

<script setup>
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'
defineProps({url:String})
</script>

<style scoped>
.docxBox{
  text-align: center;
  width: 100%;
}



</style>
