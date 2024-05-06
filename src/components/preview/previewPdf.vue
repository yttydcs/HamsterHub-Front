<template>
  <div class="pdfBox">
    <PDF class="pdf" :src="url" />
  </div>

</template>

<script>
import PDF from "pdf-vue3";
export default {
  name: 'pdfBox',
  components: {
    PDF
  },
  props:{
    url:String,
  },
  setup(){
    return{
    }
  }
}
</script>

<style scoped>
.pdfBox{
  height: calc(100vh - 250px) ;
}

</style>
