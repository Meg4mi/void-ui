<template>
  <Vd--carousel :imgSource="imgList"></Vd--carousel>
</template>
<script lang="ts">
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Vue,
  Watch,
} from 'vue-property-decorator';

@Component
export default class carouselBasic extends Vue {
  imgList = [
    {
      src: 'https://cdn.pixabay.com/photo/2017/11/16/08/35/box-2953722_960_720.jpg'
    },
    {
      src: 'https://cdn.pixabay.com/photo/2017/12/08/13/04/poinsettia-3005795_960_720.jpg'
    },
    {
      src: 'https://cdn.pixabay.com/photo/2017/12/03/14/30/christmas-2995010_960_720.jpg'
    },
    {
      src: 'https://cdn.pixabay.com/photo/2017/12/03/18/04/christmas-balls-2995437_960_720.jpg'
    },
    {
      src: 'https://cdn.pixabay.com/photo/2017/12/04/16/20/background-2997277_960_720.jpg'
    },
    {
      src: 'https://cdn.pixabay.com/photo/2017/10/31/15/13/background-2905526_960_720.png'
    },
    {
      src: 'https://cdn.pixabay.com/photo/2017/11/26/21/00/christmas-gift-2979922_960_720.jpg'
    }
  ]
}
</script>
