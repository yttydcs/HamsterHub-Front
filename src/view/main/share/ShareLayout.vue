<template>
  <div class="shareLayout">

    <div class="list">
      <div
          class="item-box borderHover switchTheme"
          :class="[fileSelect? 'box-selected' : 'box-unselected']"
      >
        <!--    todo:lang    -->
        <div class="item-name">Name</div>
        <div class="item-ticket">Ticket</div>
        <div class="item-expiry">Expiry</div>
        <div class="item-action">Action</div>
      </div>
      <div
          class="item-box borderHover switchTheme"
          :class="[fileSelect? 'box-selected' : 'box-unselected']"
          v-for="(item,index) in shareListData.data"
          :key="index"
      >
        <!--    todo:icon    -->
        <div class="item-name">{{item.id}}</div>
        <div class="item-ticket">{{item.ticket}}</div>
        <div class="item-expiry">{{item.expiry.replace("T"," ")}}</div>
        <div class="item-action">
          <n-space align="stretch"  style="width: 100%; height: 100%">
            <n-button class="button" text @click="handleDelete(item.id)">
              <n-icon>
                <BanOutline />
              </n-icon>
            </n-button>

            <n-button v-if="item.type===0" class="button" text  @click="handleDownload(item.ticket,item.key)">
              <n-icon>
                <CloudDownloadOutline />
              </n-icon>
            </n-button>

            <n-button v-if="item.type!==0" class="button" text  disabled>
              <n-icon>
                <CloudDownloadOutline />
              </n-icon>
            </n-button>

            <router-link :to="`/s/`+item.ticket+`?key=`+item.key">
              <n-button class="button" text >
                <n-icon>
                  <OpenOutline />
                </n-icon>
              </n-button>
            </router-link>


          </n-space>


        </div>
      </div>
    </div>

  </div>


</template>

<script>
import {NButton, NDataTable, NIcon, NSpace, useThemeVars} from "naive-ui";
import {computed, reactive, ref} from "vue";
import share from "@/api/share";
import {BanOutline, CloudDownloadOutline, OpenOutline} from "@vicons/ionicons5";






export default {
  name: 'ShareLayout',
  components: {
    NSpace,
    NButton,
    NIcon,
    BanOutline,
    CloudDownloadOutline,
    OpenOutline,
  },
  methods:{
    flushData(){
      let that = this
      share.query().then((res)=>{
        that.shareListData.data = res.data
      })
    },
    handleDelete(id){
      let that = this
      share.delete(id).then(res=>{
        that.flushData()
      })
    },
    handleDownload(ticket,key){
      let that = this
      share.download(ticket,key)
    }
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
        data:[],
      }),
    }
  }
}
</script>

<style scoped>
.shareLayout{
  max-width: 900px;
  margin: 10px auto;
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
  flex:1 1 80px
}

.item-expiry{
  margin-left: 5px;
  flex:1 1 140px
}

.item-action{
  margin-left: 5px;
  flex:0 0 150px
}

.button{
  height: 100%;
  font-size: 16px
}


</style>
