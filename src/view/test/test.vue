<template>
  <div class="container">
<!--    <previewVideo url="http://127.0.0.1:8088/api/download?ticket=egivvpvVgJ&fileName=QQ2024510-153114.mp4" />-->
  </div>

</template>

<script>
import danma from "@/api/danma"


export default {
  name: 'testPage',
  components: {
    // previewVideo
  },
  mounted() {
    this.test()
  },
  methods: {
    async test(){
      let res = (await danma.queryCidDirect(null,"BV1di421C7ZY")).data[0].cid
      console.log(res)
      console.log(await danma.queryXmlForBiliDirect(res))
    },

  },
  setup() {
    return {}

  }
}
</script>

<style>


</style>
