import React from 'react'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import {
  setupDefault,
  findByAttr,
  findBySelectorAttr
} from '../../../src/utils/test/index';
import TrendTile from '../../../src/components/TrendTile/TrendTile'
import { theme } from '../../../src/assets/Jss/withRoot'


Enzyme.configure({ adapter: new EnzymeAdapter() })



const data = {
  GROSS_FLOWS_MONTHLY_EXISTING: [{ "x": "Oct-2017", "value": 2700000000 }, { "x": "Nov-2017", "value": 2750000000 }, { "x": "Dec-2017", "value": 2800000000 }, { "x": "Jan-2018", "value": 2790000000 }, { "x": "Feb-2018", "value": 2800000000 }, { "x": "Mar-2018", "value": 2850000000 }, { "x": "Apr-2018", "value": 2800000000 }, { "x": "May-2018", "value": 2900000000 }, { "x": "Jun-2018", "value": 2910000000 }, { "x": "Jul-2018", "value": 2920000000 }, { "x": "Aug-2018", "value": 3000000000 }, { "x": "Sep-2018", "value": 3180000000 }]
}
const ACCOUNT_KPIS = { data: [{ "name": "GROSS SALES", "value": "$16,733,336.12" }, { "name": "GROSS REDEMPTIONS", "value": "(5,619,836.77)" }, { "name": "AGED OFF", "value": "0" }, { "name": "COMMISSION EARNED", "value": "$1735.47" }] }

const { setupShallow, setupTheme } = setupDefault({ data, theme })

describe('Trend Tile ', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setupShallow(TrendTile, { dive: true }, { theme, ACCOUNT_KPIS })
  })
  test('<TrendTile /> renders without render', () => {
    const trendTileComponent = findByAttr(wrapper, 'component-trend-tile')
    expect(trendTileComponent.length).toBe(1);
  })
})