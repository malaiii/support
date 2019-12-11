import React from 'react'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import {
  setupDefault,
  findByAttr,
  findBySelectorAttr
} from '../../src/utils/test/index'

import App from '../../src/pages/App'

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('App', () => {
  test('render <App/> without error', () => {

  })
})

