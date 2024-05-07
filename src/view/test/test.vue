<template>
  <div class="container">
    <div class="children" draggable="true">aaa</div>
  </div>

</template>

<script>
import previewMarkdown from "@/components/preview/previewMarkdown.vue";
import {NInput} from "naive-ui";
import {ref} from "vue";


export default {
  name: 'testPage',
  components: {

  },
  methods: {
    test(){

    },

  },
  setup() {
    return {}

  }
}
</script>

<style>


.children{
  background: #bf2525;
}

</style>
