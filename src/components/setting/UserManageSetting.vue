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

      <n-list-item >
        <n-thing
            :title="curLang.lang.userManageSetting.curdUser.title"
            :description="curLang.lang.userManageSetting.curdUser.description"
        />
        <template #suffix>

          <n-button
              @click="curdHandle(
                  curLang.lang.userManageSetting.curdUser.title,
                  userManageConfig.model,
                  userManageConfig.fun
              )"
          >
            {{ curLang.lang.settingBtn }}
          </n-button>

        </template>
      </n-list-item>

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
import {userManageConfig} from "@/common/curd/option/userManageConfig";

export default {
  name: 'userManageSetting',
  components: {
    KVBool,
    NThing, NList,
    NListItem,
    NButton,
  },
  props:{
    curdHandle:Function
  },
  methods:{


  },

  setup(){
    let theme = useThemeVars();
    return{
      curLang,
      userManageConfig,
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
