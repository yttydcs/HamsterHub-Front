<template>
  <n-layout style="height: 100%">
    <n-layout-header style="height: 64px;" bordered>
      <navTop :switch-theme-func="switchTheme" />
    </n-layout-header>
    <router-view></router-view>
  </n-layout>
</template>

<script>
import navTop from "@/components/nav/NavTop.vue";
import {NLayout, NLayoutHeader, darkTheme, useMessage} from "naive-ui";
import {theme} from "@/common/theme";



export default {
  name: 'mainPage',
  methods:{
    switchTheme: function (){
      if(this.theme.data !== null){
        this.theme.data = null;
      }else{
        this.theme.data = darkTheme;
      }
    }
  },
  components: {
    navTop,
    NLayout,
    NLayoutHeader,
  },
  setup(){
    // 设置message对象
    // window.$message = useMessage()
    return{
      darkTheme,
      theme
    }
  }
}
</script>

<style>

</style>
