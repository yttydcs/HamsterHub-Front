<template>
  <div class="testBox">

    <video src="https://bj29-enet.cn-beijing.data.alicloudccp.com/7VBLBqVT%2F1043355820%2F65b4c9dbd2f673ecb6d14399a3245f3e5ba52970%2F65b4c9db4ec954f6fe6c45269843bbfcb1b7e3fc?callback=eyJjYWxsYmFja1VybCI6Imh0dHA6Ly9iajI5LmFwaS1ocC5hbGl5dW5wZHMuY29tL3YyL2ZpbGUvZG93bmxvYWRfY2FsbGJhY2siLCJjYWxsYmFja0JvZHkiOiJodHRwSGVhZGVyLnJhbmdlPSR7aHR0cEhlYWRlci5yYW5nZX1cdTAwMjZidWNrZXQ9JHtidWNrZXR9XHUwMDI2b2JqZWN0PSR7b2JqZWN0fVx1MDAyNmRvbWFpbl9pZD0ke3g6ZG9tYWluX2lkfVx1MDAyNnVzZXJfaWQ9JHt4OnVzZXJfaWR9XHUwMDI2ZHJpdmVfaWQ9JHt4OmRyaXZlX2lkfVx1MDAyNmZpbGVfaWQ9JHt4OmZpbGVfaWR9XHUwMDI2cGRzX3BhcmFtcz0ke3g6cGRzX3BhcmFtc30iLCJjYWxsYmFja0JvZHlUeXBlIjoiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkIiwiY2FsbGJhY2tTdGFnZSI6ImJlZm9yZS1leGVjdXRlIiwiY2FsbGJhY2tGYWlsdXJlQWN0aW9uIjoiaWdub3JlIn0%3D&callback-var=eyJ4OmRvbWFpbl9pZCI6ImJqMjkiLCJ4OnVzZXJfaWQiOiI2ZWUxNWIyODU5OTY0OTIyYTMwZjUyM2RiNWViODIzYSIsIng6ZHJpdmVfaWQiOiIxMjM5NTY4NzIwIiwieDpmaWxlX2lkIjoiNjViNGRhYWMzOTg4YzI1NGYzYjI0MTdjOWExMjk0YzY0NjJjZDUwYSIsIng6cGRzX3BhcmFtcyI6IntcImFwXCI6XCJwSlpJbk5ITjJkWldrOHFnXCJ9In0%3D&di=bj29&dr=1239568720&f=65b4daac3988c254f3b2417c9a1294c6462cd50a&pds-params=%7B%22ap%22%3A%22pJZInNHN2dZWk8qg%22%7D&security-token=CAIS%2BgF1q6Ft5B2yfSjIr5bbG9P%2BrItR5KfcO1TijmcBfLdcnajnuDz2IHFPeHJrBeAYt%2FoxmW1X5vwSlq5rR4QAXlDfNV2uTxjqqFHPWZHInuDox55m4cTXNAr%2BIhr%2F29CoEIedZdjBe%2FCrRknZnytou9XTfimjWFrXWv%2Fgy%2BQQDLItUxK%2FcCBNCfpPOwJms7V6D3bKMuu3OROY6Qi5TmgQ41Uh1jgjtPzkkpfFtkGF1GeXkLFF%2B97DRbG%2FdNRpMZtFVNO44fd7bKKp0lQLukMWr%2Fwq3PIdp2ma447NWQlLnzyCMvvJ9OVDFyN0aKEnH7J%2Bq%2FzxhTPrMnpkSlacGoABOIjxr72hjxCY8FN7FCtDyZeYt%2B1lfLArXwkKTn8dRpqbI2UXvhBvJdl%2FY1qUKA3Af3nV1CagkTcuS3cdEv01ujKzQeZa3I1lZfwUDicHBoU%2BefufCcEj87ft5DSDcPqy8%2FBFqQbVAmHyaagF2E%2FSJXAqGR7KKX8RFJyXfcQZjhUgAA%3D%3D&u=6ee15b2859964922a30f523db5eb823a&x-oss-access-key-id=STS.NUnPiJATpSe79rSjgTp8prmLZ&x-oss-expires=1706540415&x-oss-signature=PGPKxJZFXKz8d4FQ%2B2cMOjMyB8tEAksPT6HQbjPaNGM%3D&x-oss-signature-version=OSS2" controls style="width: 100%"></video>

  </div>

</template>

<script>
import {NList, NButton, NListItem, NThing, NSwitch, NGridItem} from "naive-ui";
import curLang from "@/common/lang";
import CommonCURD from "@/components/common/CommonCURD.vue";
import device from "@/api/device";

import ShareLayout from "@/view/share/ShareLayout.vue";




export default {
  name: 'mainSetting',
  methods: {
  },
  components: {

  },

  setup() {
    return {
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
