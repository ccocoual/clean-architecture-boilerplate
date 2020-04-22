import { mount, Wrapper } from '@vue/test-utils';
import Logo from '~/components/Logo.vue';

describe('Logo', () => {
  it('is a Vue instance', () => {
    const wrapper: Wrapper<Logo> = mount(Logo);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
