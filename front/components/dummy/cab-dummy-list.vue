<template>
  <div class="cab-dummy-list">
    <cab-dummy-list-item v-for="dummy in dummies" :key="dummy.id" :dummy="dummy" />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { DummyResponseInterface } from '../../../back/src/infrastructure/rest/models/dummy-response.interface';
import CabDummyListItem from './cab-dummy-list-item.vue';

export default Vue.extend({
  components: {
    CabDummyListItem,
  },
  props: {
    dummies: { required: true } as PropOptions<DummyResponseInterface[]>,
  },
});
</script>

<style lang="scss" scoped>
.cab-dummy-list-item {
  margin-bottom: 14px;
}
</style>
