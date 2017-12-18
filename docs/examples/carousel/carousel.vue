<template>
  <vd-carousel :imgSource="imgList"></vd-carousel>
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
export default class CarouselBasic extends Vue {
  imgList = [
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXeRz6oMVYF8tIWEqIqxDBTRS1whMG4kpU343W3vmrw67Pphzorw',
    },
    {
      src: 'http://img.mp.itc.cn/upload/20170711/c465e7bcf08f46559382ecb96aa61411_th.jpg',
    },
    {
      src: 'http://d.5857.com/kadmmbz_120501/005.jpg',
    },
    {
      src:
        'http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/0D/01/ChMkJlgq0z-IC78PAA1UbwykJUgAAXxIwMAwQcADVSH340.jpg',
    },
    {
      src:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzrFcYazjgEzKIQlQZbTGBCEq_ZmvcKdgmhxkmYwjCUQtf30Pz',
    },
    {
      src:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThvkhgUE60PUFq1ZLgY4As7j-Nq5nvHODNx1-C_aw59hddCx5tBw',
    },
    {
      src:
        'http://img-download.pchome.net/download/1k1/mo/2k/oql7us-22uz.jpg',
    },
  ];
}
</script>
