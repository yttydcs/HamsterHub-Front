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
        this.download("https://4vr3j8-my.sharepoint.com/personal/admin_4vr3j8_onmicrosoft_com/_layouts/15/download.aspx?SourceUrl=%2Fpersonal%2Fadmin%5F4vr3j8%5Fonmicrosoft%5Fcom%2FDocuments%2F%E8%BD%AF%E4%BB%B6%2F%E5%8E%8B%E7%BC%A9%E5%8C%85%2Fgeek%2E7z","test.zip")
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
