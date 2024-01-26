<template>
  <div class="shareLayout">

    <div class="list">
      <div
          class="item-box borderHover switchTheme"
          :class="[fileSelect? 'box-selected' : 'box-unselected']"
      >
        <!--    todo:icon    -->
        <div class="item-name">name</div>
        <div class="item-ticket">ticket</div>
        <div class="item-action">do</div>
      </div>
    </div>

  </div>


</template>

<script>
import {NDataTable, useThemeVars} from "naive-ui";
import {computed, reactive, ref} from "vue";
import share from "@/api/share";






export default {
  name: 'ShareLayout',
  components: {

  },
  methods:{
    flushData(){
      let that = this
      share.query().then((res)=>{
        console.log(res)

      })
    },
  },
  mounted() {
    this.flushData()
  },
  activated() {
    this.flushData()
  },
  setup(){
    let theme = useThemeVars();
    return{
      borderColor : computed(() => theme.value.borderColor),
      borderHover : computed(() => theme.value.primaryColorHover),
      borderSelected : computed(() => theme.value.primaryColorSuppl),
      cubicBezierEaseInOut : theme.value.cubicBezierEaseInOut,
      fileSelect: false,
      shareListData:reactive({
        data:{},
      }),
    }
  }
}
</script>

<style scoped>
.shareLayout{
  max-width: 900px;
  margin: 0 auto;
}


@media only screen and (max-width: 900px){
  .shareLayout{
    padding: 0 0;
    width: 100%;
  }
}

.item{

}


.box-unselected{
  border-color: v-bind(borderColor);
}

.box-selected{
  border-color: v-bind(borderSelected);
}

.borderHover:hover{
  border-color: v-bind(borderHover);
}

.borderHover:hover .file-name{
  border-color: v-bind(borderHover);
}

.item-box{
  //display: inline-block;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: left;
  //overflow: hidden;
  position: relative;
  display: flex;
  flex-wrap: wrap;
}

.switchTheme{
  transition:border 0.3s v-bind(cubicBezierEaseInOut);
}

.item-name{
  margin-left: 5px;
  flex:1 1 100px
}

.item-ticket{
  margin-left: 5px;
  flex:1 1 100px
}

.item-action{
  margin-left: 5px;
  flex:0 0 150px

}


</style>
