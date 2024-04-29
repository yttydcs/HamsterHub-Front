<template>
  <FileExplorer
      ref="explorer"
      :file-menu ="fileMenu"
      :file-service="fileService"
  />
</template>

<script>
import FileExplorer from "@/components/explorer/FileExplorer.vue";
import curLang from "@/common/lang";
import fileService from "@/service/hamster/file"
import fileMenu from "@/service/hamster/fileMenu"


export default {
  name: 'fileLayout',
  components: {
    FileExplorer,
  },
  setup(){
    return{
      curLang,
      fileMenu,
      fileService,
    }
  }
}
</script>

<style>
.menu-left{
  text-align: left;
}

.DeviceUsageBox{
  padding: 10px;
}

.menuBox{
  height: calc(100vh - 140px);
  overflow-y: auto;
}
</style>
