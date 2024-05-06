<template>
  <div class="docxBox">
    <vue-office-docx
        :src="url"
    />


  </div>

</template>

<script>
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'


export default {
  name: 'markdownBox',
  components: {
    VueOfficeDocx,
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
.docxBox{
  text-align: center;
  width: 100%;
}



</style>
