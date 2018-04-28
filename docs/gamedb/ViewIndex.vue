<template>
  <div class="view-index">
    <router-link to="/gamedb/platform/6">MicroSoft Windows</router-link>
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
 * View Index
 */
@Component
export default class ViewIndex extends Vue {}
</script>