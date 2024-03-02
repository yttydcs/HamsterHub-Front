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
import {NLayout, NLayoutHeader, useLoadingBar} from "naive-ui";
import {switchTheme} from "@/common/theme";



export default {
  name: 'mainPage',
  methods:{
    switchTheme: switchTheme
  },
  components: {
    navTop,
    NLayout,
    NLayoutHeader,
  },
  mounted() {
    // 设置全局的加载对象
    window.loading = useLoadingBar();
  },
  setup(){
    return{
    }
  }
}
</script>

<style>

</style>
