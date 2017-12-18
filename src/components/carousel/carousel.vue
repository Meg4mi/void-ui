<template>
  <div class="vd-carousel">
    <div class="slide-wrapper">
      <div class="big-img-item"
           v-for="(item, index) in imgSource"
           :key="index"
           >
           <a  :href="item.link" target="_blank">
        <img class="big-img"
             :src="item.src"
             :alt="item.alt || ''" />
           </a>
      </div>
    </div>
    <div class="control-wrapper">
      <div ref="smallImg"
           class="small-img-wrapper">
        <div class="small-img-item"
             v-for="(item, index) in imgSource"
            :class="index === currentBigImgIndex ? 'select' : ''"
             :key="index"
             @click="smallImageClick(index)">
          <img class="small-img"
               :src="item.src"/>
        </div>
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
import anime from 'animejs';

const easing = 'easeInOutCirc';
const duration = 320;
let moving = false

@Component
export default class VdCarousel extends Vue {
  currentBigImgIndex: number = 0;
  slideImgIndex: number = 0;
  bigImgs: NodeList;
  smallImgs: NodeList;

  @Prop({ default: 0 })
  currentImgIndex: number;

  @Prop() imgSource: Object[];

  get calculateIndex() {
    const visualSmallImgCount: number = 4;
    return this.imgSource.length - visualSmallImgCount;
  }

  mounted() {
    this.initSlideStatus();
    this.moveSmallImg();
  }

  initSlideStatus() {
    this.currentBigImgIndex = this.currentImgIndex;
    this.bigImgs = this.$el.querySelectorAll('.big-img-item');
    this.smallImgs = this.$el.querySelectorAll('.small-img-item');


    this.slideImgIndex = Math.min(this.currentImgIndex, this.calculateIndex);
  }

  moveSmallImg() {
    const marginRight = 8;
    let smallImgItem = this.smallImgs[0] as HTMLElement;

    anime({
      targets: this.smallImgs,
      translateX: -(smallImgItem.offsetWidth + marginRight) * this.slideImgIndex,
      easing,
      duration,
    });
  }

  smallImageClick(index: number) {
    if (moving) {
      return
    }
    if (index === this.currentBigImgIndex) {
      return;
    }

    anime({
      targets: this.bigImgs,
      translateX: `-= ${(index - this.currentBigImgIndex) * 100}%`,
      easing: 'linear',
      duration,
      begin: () => {
        this.currentBigImgIndex = index;
        moving = true
      },
      complete:() => {
        moving = false
      }
    });
  }

  goToPrev() {
    if (this.slideImgIndex <= 0) {
      return;
    }
    this.slideImgIndex -= 1;
    this.moveSmallImg();
  }

  goToNext() {
    if (this.slideImgIndex >= this.calculateIndex) {
      return;
    }
    this.slideImgIndex += 1;
    this.moveSmallImg();
  }
}
</script>
