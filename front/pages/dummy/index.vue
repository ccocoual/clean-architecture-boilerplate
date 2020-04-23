<template>
  <div class="container">
    <div>
      <cab-logo />
      <h1 class="title">
        clean-architecture-boilerplate-front
      </h1>
    </div>
    <div>
      <cab-dummy-list :dummies="getDummies" />
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import Vue from 'vue';
import { mapGetters } from 'vuex';
import CabLogo from '~/components/base-components/cab-logo.vue';
import CabDummyList from '~/components/dummy/cab-dummy-list.vue';

export default Vue.extend({
  components: {
    CabLogo,
    CabDummyList,
  },
  async asyncData(ctx: Context): Promise<void> {
    await ctx.store.dispatch('dummy-module/setDummies', { apiService: ctx.app.$apiService });
  },
  computed: {
    ...mapGetters('dummy-module', ['getDummies']),
  },
});
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 24px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
