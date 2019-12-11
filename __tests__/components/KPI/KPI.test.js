import React from 'react';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { createMount } from '@material-ui/core/test-utils';
import {
  setupDefault,
  findByAttr,
  findBySelectorAttr
} from '../../../src/utils/test/index';
import KPI from '../../../src/components/KPI/KPI';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const { setupShallow } = setupDefault();

describe('Component/KPI', () => {
  /* <KPI></KPI> */
  describe('KPI', () => {
    const wrapper = setupShallow(KPI, { dive: true });

    test('render KPI Container', () => {
      const container = findByAttr(wrapper, 'kpi-container');
      expect(container.length).toBe(1);
    });

    test('render label Typography', () => {
      const label = wrapper.find('[data-test="label"][variant="caption"]');
      expect(label.length).toBe(1);
    });

    test('render value Typography', () => {
      const value = wrapper.find('[data-test="value"][variant="body1"]');
      expect(value.length).toBe(1);
    });
  });

});
