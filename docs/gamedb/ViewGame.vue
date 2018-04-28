<template>
  <div class="view-game">

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
import axios from 'axios';

/**
 * View Game
 */
@Component
export default class ViewGame extends Vue {
  private mounted(): void {
    axios
      .post('/graphql', {
        query: `
{
  platform(id:19) {
    id,
    name,
    games {
      name
    }
  }
}
      `,
      })
      .then(({ data }) => console.log(data));
  }
}
</script>