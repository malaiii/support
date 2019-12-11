import React from 'react'
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { createRender } from '@material-ui/core/test-utils'
import { setupDefault } from '../../../src/utils/test/index'
import LineChart from '../../../src/components/LineChart/LineChart'

Enzyme.configure({ adapter: new EnzymeAdapter() });

const lines = [{ "data": [{ "x": "Oct-2017", "value": 2700000000 }, { "x": "Nov-2017", "value": 2750000000 }, { "x": "Dec-2017", "value": 2800000000 }, { "x": "Jan-2018", "value": 2790000000 }, { "x": "Feb-2018", "value": 2800000000 }, { "x": "Mar-2018", "value": 2850000000 }, { "x": "Apr-2018", "value": 2800000000 }, { "x": "May-2018", "value": 2900000000 }, { "x": "Jun-2018", "value": 2910000000 }, { "x": "Jul-2018", "value": 2920000000 }, { "x": "Aug-2018", "value": 3000000000 }, { "x": "Sep-2018", "value": 3180000000 }], "label": "Existing", "color": "#A39161" }, { "data": [{ "x": "Oct-2017", "value": 2650000000 }, { "x": "Nov-2017", "value": 2700000000 }, { "x": "Dec-2017", "value": 2750000000 }, { "x": "Jan-2018", "value": 2670000000 }, { "x": "Feb-2018", "value": 2700000000 }, { "x": "Mar-2018", "value": 2750000000 }, { "x": "Apr-2018", "value": 2700000000 }, { "x": "May-2018", "value": 2800000000 }, { "x": "Jun-2018", "value": 2810000000 }, { "x": "Jul-2018", "value": 2820000000 }, { "x": "Aug-2018", "value": 2900000000 }, { "x": "Sep-2018", "value": 2910000000 }], "label": "New", "color": "#588D92" }]

const { setupShallow, setupMount,setupTheme } = setupDefault({ lines: [] })

describe('Component/LineChart', () => {
  /* <LineChart lines=[] /> */
  describe('LineChart', () => {
    const { wrapper, dismountWrapper } = setupTheme(LineChart)

    test('render container', () => {
      const el = wrapper.find('[data-test="container"]')
      expect(el.length).toBe(1)
    })

    test('render svg', () => {
      const el = wrapper.find('[data-test="svg"][width="100%"]')
      expect(el.length).toBe(1)
    })

    test('render x axis', () => {
      const el = wrapper.find('[data-test="x-axis"]')
      expect(el.length).toBe(1)
    })

    test('render y axis', () => {
      const el = wrapper.find('[data-test="y-axis"]')
      expect(el.length).toBe(1)
    })

    test('render plot', () => {
      const el = wrapper.find('[data-test="plot"]')
      expect(el.length).toBe(1)
    })

    test('render no lines', () => {
      const el = wrapper.find('[data-test="line-group"]')
      expect(el.length).toBe(0)
    })

    test('render legend', () => {
      const el = wrapper.find('[data-test="legend"]')
      expect(el.length).toBe(1)
    })

    test('render no legend items', () => {
      const el = wrapper.find('[data-test="legend-item"]')
      expect(el.length).toBe(0)
    })

    test('render no tooltip', () => {
      const el = wrapper.find('[data-test="tooltip"]')
      expect(el.length).toBe(0)
    })

    dismountWrapper()
  })

  /* <LineChart lines=[] showAxes=false /> */
  describe('LineChart no Axes', () => {
    const { wrapper, dismountWrapper } = setupTheme(LineChart, { showAxes: false })

    test('render no x axis', () => {
      const el = wrapper.find('[data-test="x-axis"]')
      expect(el.length).toBe(0)
    })

    test('render no y axis', () => {
      const el = wrapper.find('[data-test="y-axis"]')
      expect(el.length).toBe(0)
    })

    dismountWrapper()
  })

  /* <LineChart lines=lines /> */
  describe('LineChart with data', () => {
    const { wrapper, dismountWrapper } = setupTheme(LineChart, { lines: lines })

    test('render 2 legend items', () => {
      const el = wrapper.find('[data-test="legend-item"]')
      expect(el.length).toBe(2)
    })

    test('render 2 legend labels', () => {
      const el = wrapper.find('Typography[data-test="legend-label"]')
      expect(el.length).toBe(2)
    })

    test('render 2 legend lines', () => {
      const el = wrapper.find('[data-test="legend-line"]')
      expect(el.length).toBe(2)
    })

    dismountWrapper()
  })
})