<template>
  <div class="settingBox">

    <n-list hoverable bordered>
      <template #header>
        <n-thing :title="curLang.lang.userManageSetting.title" />
      </template>
      <KVBool
          :title="curLang.lang.userManageSetting.canRegister.title"
          :description="curLang.lang.userManageSetting.canRegister.description"
          configKey="user.register"
      />

    </n-list>
  </div>


</template>

<script>
import {
  NButton,
  useThemeVars,
  NListItem,
  NList,
  NThing,
} from "naive-ui";

import curLang from "../../common/lang";
import KVBool from "@/components/setting/KV/KVBool.vue";

export default {
  name: 'userManageSetting',
  components: {
    KVBool,
    NThing, NList,
    // NListItem
  },
  props:{

  },
  methods:{


  },

  setup(){
    let theme = useThemeVars();
    return{
      curLang,

    }
  }
}
</script>

<style scoped>

.settingBox{
  max-width: 900px;
  margin: 10px auto;
  text-align: left;
}

</style>
