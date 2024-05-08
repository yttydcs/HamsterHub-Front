<template>
  <div class="settingBox">

    <n-list hoverable bordered>
      <template #header>
        <n-thing :title="curLang.lang.storeSetting.title" />
      </template>

      <n-list-item >
        <n-thing
            :title="curLang.lang.storeSetting.device.title"
            :description="curLang.lang.storeSetting.device.description"
        />
        <template #suffix>

          <n-button  @click="curdHandle(curLang.lang.storeSetting.device.title,deviceConfig.model,deviceConfig.fun)">
            {{ curLang.lang.settingBtn }}
          </n-button>

        </template>
      </n-list-item>

      <n-list-item >
        <n-thing
            :title="curLang.lang.storeSetting.strategy.title"
            :description="curLang.lang.storeSetting.strategy.description"
        />
        <template #suffix>

          <n-button  @click="curdHandle(curLang.lang.storeSetting.strategy.title,strategyConfig.model,strategyConfig.fun)">
            {{ curLang.lang.settingBtn }}
          </n-button>

        </template>
      </n-list-item>



    </n-list>

  </div>


</template>

<script>
import {
  NLayout,
  NLayoutSider,
  NH2,
  NMenu,
  NIcon,
  NButton,
  useThemeVars,
  NListItem,
  NList,
  NThing,
  NAvatar, NFormItemRow, NModal, NForm, NInput, NSwitch,
} from "naive-ui";
import {computed, h, nextTick, reactive, ref} from "vue";
import curLang from "../../common/lang";
import {deviceConfig} from "@/common/curd/option/deviceConfig";
import {strategyConfig} from "@/common/curd/option/strategyConfig";

export default {
  name: 'userSetting',
  components: {
    NThing, NList, NListItem, NButton
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
      deviceConfig,
      strategyConfig,
      curdData:reactive({
        title: "",
        show: ref(false),
        model: deviceConfig.model,
        fun: deviceConfig.fun
      }),
    }
  }
}
</script>

<style scoped>



</style>
