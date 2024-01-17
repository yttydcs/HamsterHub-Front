<template>
  <div class="testBox">
    <ShareLayout></ShareLayout>



  </div>

</template>

<script>
import {NList, NButton, NListItem, NThing, NSwitch, NGridItem} from "naive-ui";
import curLang from "@/common/lang";
import CommonCURD from "@/components/common/CommonCURD.vue";
import device from "@/api/device";

import ShareLayout from "@/view/share/ShareLayout.vue";




export default {
  name: 'mainSetting',
  methods: {
  },
  components: {
    ShareLayout
  },

  setup() {
    return {
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
