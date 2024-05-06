<template>
  <div class="pdfBox">
    <VueOfficePdf :src="url" />
  </div>

</template>

<script>
import VueOfficePdf from '@vue-office/pdf'

export default {
  name: 'pdfBox',
  components: {
    VueOfficePdf,
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



</style>
