<template>
  <div class="nav-top">
    <div class="nav-logo"></div>
    <div class="nav-left">
      <n-input v-model:value="searchText" type="text" :placeholder="curLang.lang.searchBoxPlaceholder" >
        <template #prefix>
          <n-icon :component="SearchOutline" />
        </template>
      </n-input>


    </div>
    <div class="nav-right">
      <n-space align="stretch">

        <n-button text style="font-size: 24px" @click="switchThemeFunc" >
          <n-icon>
            <Contrast />
          </n-icon>
        </n-button>

        <n-button text style="font-size: 24px" @click="switchLanguage">
          <n-icon>
            <LanguageOutline />
          </n-icon>
        </n-button>

        <router-link to="/setting">
          <n-button text style="font-size: 24px">
            <n-icon>
              <SettingsOutline />
            </n-icon>
          </n-button>
        </router-link>

        <n-divider vertical />

        <router-link to="/share" v-if="loginData.loginState">
          <n-button text style="font-size: 24px" >
            <n-icon>
              <ShareSocialOutline />
            </n-icon>
          </n-button>
        </router-link>

        <router-link to="/" v-if="loginData.loginState">
          <n-button text style="font-size: 24px" >
            <n-icon>
              <FolderOpenOutline />
            </n-icon>
          </n-button>
        </router-link>

        <router-link to="/login" v-if="!loginData.loginState">
          <n-button text style="font-size: 24px">
            <n-icon>
              <PersonOutline />
            </n-icon>
          </n-button>
        </router-link>

        <n-button text style="font-size: 24px" v-else >
          <n-avatar
              round
              :size="24"
              :src="loginData.user.avatarSrc"
          >
          </n-avatar>
        </n-button>



      </n-space>
    </div>
  </div>

</template>

<script>
import { defineComponent, h, ref } from "vue";
import {NIcon, NAvatar, NButton, NSpace, NInput, NDivider} from "naive-ui";
import {
  SettingsOutline,
  Contrast,
  PersonOutline,
  SearchOutline,
  LanguageOutline,
  FolderOpenOutline,
  ShareSocialOutline,
} from "@vicons/ionicons5";

import  loginData  from "@/common/loginData"

import curLang, {switchLang} from "@/common/lang";


export default defineComponent({
  name: 'NavTop',
  components: {
    NButton,
    NIcon,
    NAvatar,
    NInput,
    NDivider,
    SettingsOutline,
    NSpace,
    Contrast,
    PersonOutline,
    LanguageOutline,
    FolderOpenOutline,
    ShareSocialOutline,
  },
  props: {
    switchThemeFunc: Function
  },
  methods: {
    switchLanguage (){
      if(curLang.name === "zh"){
        switchLang(1)
      }else{
        switchLang(0)
      }
    },
  },
  setup() {

    return {
      searchText: ref(null),
      loginData: loginData,
      SearchOutline,
      curLang
    };
  }
});
</script>

<style lang="css">
.nav-top{
  height: 60px;
  line-height: 60px;
  text-align: left;
  overflow: hidden;
}

.nav-logo,.nav-left,.nav-right {
  margin-top: 0px;
  display: inline-block;
  height: 60px;
  line-height: 60px;
  vertical-align: center;
  overflow: hidden;
  padding-left: 5px;
  padding-right: 5px;

}


.nav-logo{
  width: 240px;
}

/*  to do
响应式右边距
响应式隐藏
*/
.nav-right{
  height: 100%;
  margin-right: 100px;
  float: right;
}

.nav-right n-space{
  height: 100%;
}

.nav-left{
  margin-top: 2px;
  text-align: left;
}

/* vertically */
.nav-right button{
  height: 100%;
}

</style>