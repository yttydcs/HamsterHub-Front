<template>
  <div>
    <div @click="test1">test</div>
    <a href="https://4vr3j8-my.sharepoint.com/personal/admin_4vr3j8_onmicrosoft_com/_layouts/15/download.aspx?SourceUrl=%2Fpersonal%2Fadmin%5F4vr3j8%5Fonmicrosoft%5Fcom%2FDocuments%2F%E8%BD%AF%E4%BB%B6%2F%E5%8E%8B%E7%BC%A9%E5%8C%85%2Fgeek%2E7z" download='file.zip'>aaa</a>
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
        this.download("https://cn-beijing-data.aliyundrive.net/q3bWwT3h%2F8890517%2F66126cb06388d138b86b4157b5b1396f36e140f6%2F66126cb00d8bde2e538f4110aaab654e9809a28e?callback=eyJjYWxsYmFja1VybCI6Imh0dHA6Ly9iajI5LmFwaS1ocC5hbGl5dW5wZHMuY29tL3YyL2ZpbGUvZG93bmxvYWRfY2FsbGJhY2siLCJjYWxsYmFja0JvZHkiOiJodHRwSGVhZGVyLnJhbmdlPSR7aHR0cEhlYWRlci5yYW5nZX1cdTAwMjZidWNrZXQ9JHtidWNrZXR9XHUwMDI2b2JqZWN0PSR7b2JqZWN0fVx1MDAyNmRvbWFpbl9pZD0ke3g6ZG9tYWluX2lkfVx1MDAyNnVzZXJfaWQ9JHt4OnVzZXJfaWR9XHUwMDI2ZHJpdmVfaWQ9JHt4OmRyaXZlX2lkfVx1MDAyNmZpbGVfaWQ9JHt4OmZpbGVfaWR9XHUwMDI2cGRzX3BhcmFtcz0ke3g6cGRzX3BhcmFtc30iLCJjYWxsYmFja0JvZHlUeXBlIjoiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkIiwiY2FsbGJhY2tTdGFnZSI6ImJlZm9yZS1leGVjdXRlIiwiY2FsbGJhY2tGYWlsdXJlQWN0aW9uIjoiaWdub3JlIn0%3D&callback-var=eyJ4OmRvbWFpbl9pZCI6ImJqMjkiLCJ4OnVzZXJfaWQiOiI2ZWUxNWIyODU5OTY0OTIyYTMwZjUyM2RiNWViODIzYSIsIng6ZHJpdmVfaWQiOiI4ODkwNTE3IiwieDpmaWxlX2lkIjoiNjYxMjZjYjA2Mzg4ZDEzOGI4NmI0MTU3YjViMTM5NmYzNmUxNDBmNiIsIng6cGRzX3BhcmFtcyI6IntcImFwXCI6XCJwSlpJbk5ITjJkWldrOHFnXCJ9In0%3D&di=bj29&dr=8890517&f=66126cb06388d138b86b4157b5b1396f36e140f6&pds-params=%7B%22ap%22%3A%22pJZInNHN2dZWk8qg%22%7D&response-content-disposition=attachment%3B%20filename%2A%3DUTF-8%27%27a1f4b1688b8382469a70cae78b2e6c58&security-token=CAIS8gF1q6Ft5B2yfSjIr5WNOs%2FxuK8SxbOgcBPwrGgdZc5hiI2ahjz2IHhMf3NpBOkZvvQ1lGlU6%2Fcalq5rR4QAXlDfNSa%2BMQTUqFHPWZHInuDox55m4cTXNAr%2BIhr%2F29CoEIedZdjBe%2FCrRknZnytou9XTfimjWFrXWv%2Fgy%2BQQDLItUxK%2FcCBNCfpPOwJms7V6D3bKMuu3OROY6Qi5TmgQ41Uh1jgjtPzkkpfFtkGF1GeXkLFF%2B97DRbG%2FdNRpMZtFVNO44fd7bKKp0lQLs0ARrv4r1fMUqW2X543AUgFLhy2KKMPY99xpFgh9a7j0iCbSGyUu%2FhqAAWEIx3daVFeCsZEydo4wEbKMBKCTP6Kp56IcwcxD%2BHKPln%2FblAoy3f8yOgGAUytiJ75A8O8%2F7DuzzbipEPWN%2FSJj7L146QNEen9HuU1aoF10fWPsWXGHqcsXCZwutnnOUX24Jen8LyWle7zH9FbwUZKtakh0uzsuV4bSL0whSyR8IAA%3D&u=6ee15b2859964922a30f523db5eb823a&x-oss-access-key-id=STS.NV8quEUp3rqKr5AHhHiAMgH1d&x-oss-expires=1712484420&x-oss-signature=Es3DA7zHW8CUuXRt1jX8AoWSwjuqiqybL27TE09YKoY%3D&x-oss-signature-version=OSS2","test.zip")
      return "asd";
    },

    async download(downloadUrl, downloadFileName ) {
      const blob = await this.getBlob(downloadUrl)
      this.saveAs(blob, downloadFileName )
    },

    async getBlob(url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(new Error(`Request failed with status`));
          }
        };
        xhr.onerror = () => {
          reject();
        };

        xhr.send();
      });
    },

    async saveAs(blob, filename) {
      const link = document.createElement('a');
      const body = document.body;

      link.href = window.URL.createObjectURL(blob);
      link.download = filename;

      // hide the link
      link.style.display = 'none';
      body.appendChild(link);

      link.click();
      body.removeChild(link);

      window.URL.revokeObjectURL(link.href);
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
