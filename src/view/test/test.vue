<template>
  <div>
<!--    <previewMarkdown :md-text="testMd"></previewMarkdown>-->
  </div>

</template>

<script>
import previewMarkdown from "@/components/markdown/previewMarkdown.vue";
import {NInput} from "naive-ui";
import {ref} from "vue";


export default {
  name: 'testPage',
  methods: {
    test(){
      console.log(this.testMd);
    },

  },
  components: {
    // previewMarkdown,
  },
  computed: {

  },

  setup() {
    return {
      testMd:ref("# test"),
    }

  }
}
</script>

<style>


.testBox{
  max-width: 1200px;
  margin: 10px auto;
  text-align: left;

}

</style>
