<template>
  <div class="cab-dummy-list-item">
    <span>{{ dummy.value }}</span>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { DummyResponseInterface } from '../../../back/src/infrastructure/rest/models/dummy-response.interface';

export default Vue.extend({
  props: {
    dummy: { required: true } as PropOptions<DummyResponseInterface>,
  },
});
</script>
