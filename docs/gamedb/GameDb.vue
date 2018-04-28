<template>
  <div class="game-db">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch,
} from 'vue-property-decorator';

/**
 * Index for game database demo
 */
@Component
export default class GameDb extends Vue {}
</script>