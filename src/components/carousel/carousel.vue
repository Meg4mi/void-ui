<template>
<div class="vd-carousel">
  <div class="slide-wrapper">
    <li v-for="(item, index) in imgSource" v-show="index === currentIndex" class="big-image">
      <img :src="item.src" class="image" :alt="item.alt || ''" />>
    </li>
  </div>
  <div class="control-wrapper">
    <li v-for="(item.index) in imgSource" class="small-image">
      <img :src="item.src" class="img" :src="item.src" :alt="item.alt || ''" />
    </li>
    <span class="prev" @click="goToPrev"><<</span>
    <span class="next" @click="goToNext">>></span>
  </div>
</div>
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
export default class VdCarousel extends Vue {
  currentIndex = 0;

  @Prop()
  imgSource: Array;

goToPrev() {
  console.log('prev')
}
goToNext() {
  console.log('next')
}

}
</script>
