<template>
  <div class="shareLayout">

    <div class="list">
      <div
          class="item-box borderHover switchTheme"
          :class="[fileSelect? 'box-selected' : 'box-unselected']"
      >
        <!--    todo:icon    -->
        <div class="item-name">name</div>
        <div class="action">do</div>
      </div>
    </div>

  </div>


</template>

<script>
import {NDataTable, useThemeVars} from "naive-ui";
import {computed, ref} from "vue";







export default {
  name: 'ShareLayout',
  components: {

  },
  methods:{

  },

  setup(){
    let theme = useThemeVars();
    return{
      borderColor : computed(() => theme.value.borderColor),
      borderHover : computed(() => theme.value.primaryColorHover),
      borderSelected : computed(() => theme.value.primaryColorSuppl),
      cubicBezierEaseInOut : theme.value.cubicBezierEaseInOut,
      fileSelect: false,
    }
  }
}
</script>

<style>
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
  display: inline-block;
  border-width: 1px;
  border-style: solid;
  //color:rgba(255, 255, 255, 0.82);
  border-radius: 5px;
  width: 100%;

  height: 40px;
  line-height: 40px;
  text-align: left;
  overflow: hidden;
  position: relative;
}

.item-name{
  margin-left: 5px;
}

.switchTheme{
  transition:border 0.3s v-bind(cubicBezierEaseInOut);
}
</style>
