<template>
  <div class="vd-carousel">
    <div class="slide-wrapper">
      <transition-group tag="ul"
                        :name="'move-' + computedTransitionName">
        <li v-for="(item, index) in imgSource"
            :key="index"
            v-show="index === currentBigImgIndex"
            class="big-image">
          <img :src="item.src"
               class="image"
               :alt="item.alt || ''" />
        </li>
      </transition-group>
    </div>
    <div class="control-wrapper">
      <div class="small-image-wrapper"
           @click="smallImageClick">
        <li v-for="(item, index) in imgSource"
            :key="index"
            class="small-image"
            :class="index === currentBigImgIndex ? 'select-image' : ''"
            :style="smallImageStyle">
          <img :src="item.src"
               class="img"
               :data-index="index"
               :alt="item.alt || ''" />
        </li>
      </div>

      <span class="prev"
            @click="goToPrev">
      </span>
      <span class="next"
            @click="goToNext">
      </span>
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
  currentBigImgIndex = 0;
  slideImgIndex = 0;
  computedTransitionName = 'left';

  @Prop({ default: 0 })
  currentImgIndex: number;

  @Prop() imgSource: Object[];

  @Watch('currentBigImgIndex')
  oncurrentBigImgIndexChange(val: number, oldVal: number) {
    this.computedTransitionName = val > oldVal ? 'left' : 'right';
  }
  get smallImageStyle() {
    const marginRight = 0.08;
    return {
      transform: `translateX(-${(1.91 + marginRight) * this.slideImgIndex}rem)`,
    };
  }

  get calculateIndex() {
    const visualSmallImgCount = 4;
    return this.imgSource.length - visualSmallImgCount;
  }
  mounted() {
    this.initSlideStatus();
  }

  initSlideStatus() {
    this.currentBigImgIndex = this.currentImgIndex;
    this.slideImgIndex = Math.min(this.currentImgIndex, this.calculateIndex);
  }

  smallImageClick(e: any) {
    if (e.target.nodeName.toLowerCase() === 'img') {
      const index = parseInt(e.target.dataset.index);
      this.currentBigImgIndex = index;
    }
  }
  goToPrev() {
    if (this.slideImgIndex <= 0) return;
    this.slideImgIndex -= 1;
  }

  goToNext() {
    if (this.slideImgIndex >= this.calculateIndex) return;
    this.slideImgIndex += 1;
  }
}
</script>
