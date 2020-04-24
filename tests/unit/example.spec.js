import { shallowMount } from '@vue/test-utils'

describe('Fake component rendering', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount( {template: '<div>{{ msg }}</div>', props: { msg: {default: '', type: String}}}, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg)
  })
});
