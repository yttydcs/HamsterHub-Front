<template>
  <div>
aaa
    {{test}}
  </div>

</template>

<script>
import md5 from "crypto-js/md5"
// let a2 = require("crypto");
let res1 = md5("asd")



export default {
  name: 'mainSetting',
  methods: {
    test1(){
      // bcryptjs.hash()
      // crypto.md5("asd")
      return "asd";
    }
  },
  components: {

  },
  computed: {

  },

  setup() {
    return {
      test:md5("asd"),
    }
  }
}
</script>

<style>


.testBox{
  max-width: 1200px;
  margin: 10px auto;
  text-align: left;

}

</style>
