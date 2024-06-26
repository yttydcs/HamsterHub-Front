<template>
  <FileExplorer
      ref="explorer"
      :file-menu ="fileMenu"
      :file-service="fileService"
  />
</template>

<script setup>
import FileExplorer from "@/components/explorer/FileExplorer.vue";
import curLang from "@/common/lang";
import fileService from "@/service/hamster/file"
import fileMenu from "@/service/hamster/fileMenu"
import {defineComponent} from "vue";

defineComponent({
  name: 'MainIndex',
});
</script>

<style>
</style>
