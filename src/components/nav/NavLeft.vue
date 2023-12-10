<template>
  <div class="nav-left">

  </div>

</template>

<script>
import { defineComponent, h, ref } from "vue";
import {NIcon,NAvatar , NMenu} from "naive-ui";
import { SettingsOutline } from "@vicons/ionicons5";
import { Icon } from "@vicons/utils";


const MenuOption = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
    href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199'
  },
]



export default defineComponent({
  name: 'NavTop',
  components: {
    // Icon,

    NIcon,
    NAvatar,
    SettingsOutline
  },
  setup() {
    return {
      collapsed: ref(true),
      MenuOption
    };
  }
});
</script>

<style lang="css">
.nav-top{
  background: aqua;
}



</style>