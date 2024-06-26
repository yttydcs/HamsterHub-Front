<template>
  <n-layout style="height: 100%">
    <n-layout-header bordered style="height: 64px;">
      <navTop :switch-theme-func="switchTheme"/>
    </n-layout-header>
    <router-view></router-view>
  </n-layout>
</template>

<script setup>
import navTop from "@/components/nav/NavTop.vue";
import {NLayout, NLayoutHeader, useLoadingBar} from "naive-ui";
import {switchTheme} from "@/common/theme";
import {onMounted} from "vue";

onMounted(() =>{
  window.loading = useLoadingBar();
})
</script>

<style>

</style>
