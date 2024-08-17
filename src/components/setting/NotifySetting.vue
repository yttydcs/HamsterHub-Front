<template>
  <div class="settingBox">
    <n-list hoverable bordered>
      <template #header>
        <n-thing :title="curLang.lang.notifySetting.title" />
      </template>
      <KVStr
          :title="curLang.lang.notifySetting.gocqUrl.title"
          :description="curLang.lang.notifySetting.gocqUrl.description"
          configKey="bot.gocq.url"
          :is-admin="true"
      />

    </n-list>
  </div>
</template>

<script setup>
import { NList, NThing, } from "naive-ui";
import curLang from "../../common/lang";
import KVStr from "@/components/setting/KV/KVStr.vue";
</script>

<style scoped>

.settingBox{
  max-width: 900px;
  margin: 10px auto;
  text-align: left;
}

</style>
