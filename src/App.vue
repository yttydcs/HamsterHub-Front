<template>
  <NLoadingBarProvider>
  <n-config-provider style="height: 100%" :theme="theme.data">
    <NGlobalStyle></NGlobalStyle>
      <NNotificationProvider>
        <NMessageProvider>

            <MessageApi></MessageApi>
            <router-view></router-view>

        </NMessageProvider>
      </NNotificationProvider>
  </n-config-provider>
  </NLoadingBarProvider>
</template>

<script>
import {
  NConfigProvider,
  NGlobalStyle,
  NMessageProvider,
  NNotificationProvider,
  NLoadingBarProvider,
} from "naive-ui";
import {theme} from "@/common/theme";
import MessageApi from "@/components/common/MessageApi.vue";

export default {
  name: 'App',
  components:{
    NGlobalStyle,
    NMessageProvider,
    NConfigProvider,
    NNotificationProvider,
    MessageApi,
    NLoadingBarProvider
  },
  // mounted() {
  //   const loadingBar = useLoadingBar();
  //   loadingBar.start();
  // },
  setup(){
    // const loadingBar = useLoadingBar();
    // loadingBar.start();
    return{
      theme,
    }
  }
}
</script>

<style>

html,body,#app{
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
