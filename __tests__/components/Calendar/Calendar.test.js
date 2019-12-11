import React from 'react';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {
  setupDefault,
  findByAttr,
  findBySelectorAttr
} from '../../../src/utils/test/index';
import Calendar from '../../../src/components/Calendar/Calendar';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const { setupShallow, setupMount } = setupDefault({
  defaultValue: new Date().toString()
});

describe('<Calendar/>', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setupShallow(Calendar, { dive: true });
  });
  test('Render Calender component without error', () => {
    const calendarComponent = findByAttr(
      wrapper,
      'calendar-container'
    );
    expect(calendarComponent.length).toBe(1);
  })
  describe('Calendar update date', () => {
    let wrapper
    let initialDate
    beforeEach(() => {
      initialDate = new Date('2019-02-10')
      wrapper = setupShallow(Calendar, { dive: true }, {
        selectedDate: initialDate
      })
    })

    test('Calendar validate initialDate provided', () => {
      wrapper.update()
      const initialDate = wrapper.state('selectedDate')

      expect(initialDate).toBe(initialDate);
    })
    test('Calender handle change of date', () => {
      const calendar = wrapper.find('.inline-picker');
      const selectedDate = new Date('2019-02-05')
      calendar.simulate('change', selectedDate);
      wrapper.update()
      const changedDate = wrapper.state('selectedDate')
      expect(changedDate).toBe(selectedDate);
    })
  })

})