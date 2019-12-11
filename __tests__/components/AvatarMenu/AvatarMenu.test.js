import React from 'react';
import { configure, shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { createShallow } from '@material-ui/core/test-utils';
import { setupDefault, findByAttr, findBySelectorAttr } from '../../../src/utils/test/index';
import AvatarMenu from '../../../src/components/AvatarMenu/AvatarMenu';
configure({ adapter: new EnzymeAdapter() });
const { setupShallow } = setupDefault();


describe('test Login Avatar', () => {
  const wrapper = setupShallow(
    AvatarMenu,
    { dive: true }
  );

  beforeEach(function () {
    localStorage.clear();
  });

  test('componentDidMount when userObj is defined in the localStorage', () => {
    const key = 'user';
    const value = 'eyAidXNlcm5hbWUiOiJ0ZXN0dW5hbWUiLCAiZmlyc3ROYW1lIjoidGVzdGZuYW1lIiwgImxhc3ROYW1lIjoidGVzdGxuYW1lIn0=';
    const expectOutput = value;
    localStorage.setItem(key, value);
    wrapper.instance().componentDidMount();
    expect(wrapper.state().user).toEqual(JSON.parse(atob(expectOutput)));
  });
});

describe('test Login Avatar with no user Obj', () => {
  const wrapper = setupShallow(
    AvatarMenu,
    { dive: true }
  );

  beforeEach(function () {
    localStorage.clear();
  });

  test('componentDidMount when userObj is undefined in the localStorage', () => {
    const expectOutput = "";
    wrapper.instance().componentDidMount();
    expect(wrapper.state().user.username).toBe(expectOutput);
  });
  describe('Button is rendered without error', () => {
    beforeEach(() => {
      const wrapper = setupShallow(
        AvatarMenu, { dive: true }
      );
    })
    test('Button renders', () => {
      let componentButton = findByAttr(wrapper, 'component-button')
      expect(componentButton.length).toBe(1)
    })
  })
});
