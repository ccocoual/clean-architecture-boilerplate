import Vue from 'vue';
import { mount, Wrapper } from '@vue/test-utils';
import CabLogo from '~/components/base-components/cab-logo.vue';

describe('components/base-components/CabLogo', () => {
  it('is a Vue instance', () => {
    const wrapper: Wrapper<Vue> = mount(CabLogo);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
