<template>
  <div></div>
</template>

<script>
import {useMessage, useNotification} from "naive-ui";

export default {
  name: 'messageApi',
  setup(){
    // 设置message对象
    window.$message = useMessage()
    window.$notification = useNotification()
  }
}
</script>

