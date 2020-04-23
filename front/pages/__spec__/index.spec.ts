import { shallowMount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';

import Root from '../index.vue';

describe('pages/index', () => {
  it('should use redirectToPage middleware', () => {
    // when
    const root: Wrapper<Vue> = shallowMount(Root);

    // then
    expect(root.vm.$options.middleware).toBe('redirectToPage.middleware');
  });
});
