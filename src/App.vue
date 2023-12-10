<template>
  <n-config-provider style="height: 100%" :theme="theme.data">
    <NGlobalStyle></NGlobalStyle>
    <NMessageProvider>
      <MessageApi></MessageApi>
      <router-view></router-view>
    </NMessageProvider>
  </n-config-provider>
</template>

<script>
import {NConfigProvider, NGlobalStyle ,NMessageProvider} from "naive-ui";
import {theme} from "@/common/theme";
import MessageApi from "@/components/common/MessageApi.vue";

export default {
  name: 'App',
  components:{
    NGlobalStyle,
    NMessageProvider,
    NConfigProvider,
    MessageApi
  },
  setup(){
    return{
      theme
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
