<template>
  <div class="nav-top">
    <div class="nav-logo">
      <img src="/favicon.ico" alt="">
      <span class="nav-name">{{ appName }}</span>


    </div>
    <div class="nav-left" v-show="false">
      <n-input v-model:value="searchText" type="text" :placeholder="curLang.lang.searchBoxPlaceholder" >
        <template #prefix>
          <n-icon :component="SearchOutline" />
        </template>
      </n-input>
    </div>

    <div class="nav-right">
      <n-space align="stretch">

        <n-button class="switch-theme" text style="font-size: 24px" @click="switchThemeFunc" >
          <n-icon>
            <Contrast />
          </n-icon>
        </n-button>

        <n-button class="switch-language" text style="font-size: 24px" @click="switchLanguage">
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


<!--        <router-link to="/task" v-if="loginData.loginState">-->
<!--          <n-button text style="font-size: 24px" >-->
<!--            <n-icon>-->
<!--              <TaskListSquareRtl24Regular />-->
<!--            </n-icon>-->
<!--          </n-button>-->
<!--        </router-link>-->

<!--        <router-link to="/share" v-if="loginData.loginState">-->
<!--          <n-button text style="font-size: 24px" >-->
<!--            <n-icon>-->
<!--              <ShareSocialOutline />-->
<!--            </n-icon>-->
<!--          </n-button>-->
<!--        </router-link>-->

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

        <n-dropdown :options="userOptions" @select="handleSelect" v-else>
          <n-button text style="font-size: 24px"  >
            <n-avatar
                round
                :size="24"
                :src="loginData.user.avatarSrc"
            >

            </n-avatar>
            <span class="user-name">
<!--              {{ loginData.user.name }}-->
            </span>

          </n-button>

        </n-dropdown>

      </n-space>
    </div>
    <!--  修改密码  -->
    <n-modal
        v-model:show="changePwdShow"
        class="alertBox"
        preset="card"
        title="修改密码"
        size="medium"
    >
      <n-form :model="formData">
        <n-form-item-row label="旧密码">
          <n-input v-model:value="formData.newPwd"/>
        </n-form-item-row>
        <n-form-item-row label="新密码">
          <n-input v-model:value="formData.oldPwd"/>
        </n-form-item-row>
      </n-form>
      <n-button type="primary" block secondary strong @click="confirmChangePwd">
        提交
      </n-button>
    </n-modal>

  </div>

</template>

<script setup>
import {computed, defineComponent, h, reactive, ref} from "vue";
import {NIcon, NAvatar, NButton, NSpace, NInput, NDivider, NDropdown, NFormItemRow, NForm, NModal} from "naive-ui";
import {
  SettingsOutline,
  Contrast,
  PersonOutline,
  SearchOutline,
  LanguageOutline,
  FolderOpenOutline,
  LogOutOutline,
} from "@vicons/ionicons5";


import loginData, {removeLoginData} from "@/common/loginData"
import login from "@/api/login";
import curLang, {switchLang} from "@/common/lang";

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    });
  };
};
const userOptions= [
  {
    label: "退出登录",
    key: "logout",
    icon: renderIcon(LogOutOutline)
  }
];
const props = defineProps({switchThemeFunc: Function});
const name = ref("HamsterHub");
const searchText =  ref(null);
const changePwdShow =  ref(false);
const formData = reactive({newPwd:"",oldPwd:""});
const appName = computed(() => window.hamsterHubConfig.name || process.env["VUE_APP_NAME"])

function switchLanguage (){
  if(curLang.name === "zh"){
    switchLang(1)
  }else{
    switchLang(0)
  }
}

async function handleSelect(key) {
  switch (key) {
    case "logout" :
      await login.logout();
      break
    case "change" :
      changePwdShow.value = true
      break
  }
}

async function confirmChangePwd(){
  login.changePwd(formData.oldPwd,formData.newPwd).then(res=>{
    removeLoginData();
    changePwdShow.value = false;
  })
}

</script>

<style scoped lang="css">
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
  -webkit-user-select:none;/*webkit浏览器*/
  -moz-user-select:none;/*火狐*/
  -ms-user-select:none;/*IE10*/
  user-select:none;

  padding-left: 32px;
  width: 240px;
  font-weight: 500;
  font-size: 16px;
}

.nav-logo img{
  position: relative;
  width: 24px;
  height: 24px;
  top: 4px;
}

/*  to do
响应式右边距
响应式隐藏
*/
.nav-right{
  height: 100%;
  margin-right: 40px;
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

.user-name{
  margin-left: 6px;
  font-weight: lighter;
  font-size: 16px;
}

.nav-name{
  margin-left: 6px;
}

/* 改善小屏幕的体验 */
@media all and (max-width: 550px){
  .nav-name{
    display: none;
  }

  .nav-logo{
    width: 30px;
  }
}

@media all and (max-width: 340px){
  .switch-theme{
    display: none;
  }

  .switch-language{
    display: none;
  }
}


</style>