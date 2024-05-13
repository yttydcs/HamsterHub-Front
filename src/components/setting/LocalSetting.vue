<template>
  <div class="settingBox">

    <n-list hoverable bordered>
      <template #header>
        <n-thing :title="curLang.lang.localSetting.title" />
      </template>


      <!--   黑暗模式调整   -->
      <n-list-item>
        <n-thing
            :title="curLang.lang.localSetting.darkMode.title"
            :description="curLang.lang.localSetting.darkMode.description"
        />
        <template #suffix>

          <n-switch :round="false"
                    @update:value="setDark"
                    v-model:value="theme.settingData"
          />

        </template>
      </n-list-item>

      <!--   语言调整   -->
      <n-list-item>
        <n-thing
            :title="curLang.lang.localSetting.languageSwitch.title"
            :description="curLang.lang.localSetting.languageSwitch.description"
        />
        <template #suffix>

          <n-select
              style="width: 120px"
              placeholder=""
              v-model:value="curLangIndex"
              :options="langSelectOption"
              @update:value="switchLang"
          />

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
  NAvatar, NFormItemRow, NModal, NForm, NInput, NSelect, NSwitch,
} from "naive-ui";
import curLang from "../../common/lang";
import {setDark,theme} from "@/common/theme";
import { switchLang , langSelectOption, curLangIndex} from "../../common/lang";

export default {
  name: 'localSetting',
  components: {
    NSwitch,
    // NSelect,
    NThing, NList, NListItem, NSelect
  },
  methods:{
    setDark,
    switchLang,
  },
  setup(){
    return{
      curLang,
      theme,
      langSelectOption,
      curLangIndex
    }
  }
}
</script>

<style scoped>



</style>
