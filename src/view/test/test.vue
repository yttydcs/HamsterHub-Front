<template>
  <div>
    <previewMarkdown :md-text="testMd" :show-catalog="true"></previewMarkdown>
  </div>

</template>

<script>
import previewMarkdown from "@/components/preview/previewMarkdown.vue";
import {NInput} from "naive-ui";
import {ref} from "vue";


export default {
  name: 'testPage',
  methods: {
    test(){
      console.log(this.testMd);
    },

  },
  components: {
    previewMarkdown,
  },
  computed: {

  },

  setup() {
    return {
      testMd:ref("## 😲 md-editor-v3\n" +
          "\n" +
          "Markdown Editor for Vue3, developed in jsx and typescript, support different themes、beautify content by prettier.\n" +
          "\n" +
          "### 🤖 Base\n" +
          "\n" +
          "**bold**, <u>underline</u>, _italic_, ~~line-through~~, superscript<sup>26</sup>, subscript<sub>1</sub>, `inline code`, [link](https://github.com/imzbf)\n" +
          "\n" +
          "> quote: I Have a Dream\n" +
          "\n" +
          "1. So even though we face the difficulties of today and tomorrow, I still have a dream.\n" +
          "2. It is a dream deeply rooted in the American dream.\n" +
          "3. I have a dream that one day this nation will rise up.\n" +
          "\n" +
          "- [ ] Friday\n" +
          "- [ ] Saturday\n" +
          "- [x] Sunday\n" +
          "\n" +
          "![Picture](https://imzbf.github.io/md-editor-rt/imgs/mark_emoji.gif)\n" +
          "\n" +
          "## 🤗 Code\n"+"## 😲 md-editor-v3\n" +
          "\n" +
          "Markdown Editor for Vue3, developed in jsx and typescript, support different themes、beautify content by prettier.\n" +
          "\n" +
          "### 🤖 Base\n" +
          "\n" +
          "**bold**, <u>underline</u>, _italic_, ~~line-through~~, superscript<sup>26</sup>, subscript<sub>1</sub>, `inline code`, [link](https://github.com/imzbf)\n" +
          "\n" +
          "> quote: I Have a Dream\n" +
          "\n" +
          "1. So even though we face the difficulties of today and tomorrow, I still have a dream.\n" +
          "2. It is a dream deeply rooted in the American dream.\n" +
          "3. I have a dream that one day this nation will rise up.\n" +
          "\n" +
          "- [ ] Friday\n" +
          "- [ ] Saturday\n" +
          "- [x] Sunday\n" +
          "\n" +
          "![Picture](https://imzbf.github.io/md-editor-rt/imgs/mark_emoji.gif)\n" +
          "\n" +
          "## 🤗 Code\n"),
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
