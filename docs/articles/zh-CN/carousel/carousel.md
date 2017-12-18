## carousel 轮播组件 1

### 基本使用

```html
  <vd-carousel :imgSource="imgList"></vd-carousel>
```

<example-board :component="VdcarouselBasic" :source="VdcarouselBasicSource"></example-board>

<script>
import VdcarouselBasic from 'docs/examples/carousel/carousel'
import VdcarouselBasicSource from 'docs/examples/carousel/carousel.txt'

export default {
  data () {
    return {
      VdcarouselBasic,
      VdcarouselBasicSource,

    }
  }
}
</script>
