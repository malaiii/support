import react from 'react'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { setupDefault, findByAttr } from '../../../src/utils/test/index'
import Radio from '@material-ui/core/Radio';
import RadioPanel from '../../../src/components/RadioPanel/RadioPanel'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const radioGroup = [
  { value: "option1", label: "Option1" },
  { value: "option2", label: "Option2" }
]

const { setupShallow, setupTheme } = setupDefault({ radioGroup: [], onClick: (eventName) => { } })

describe("<RadioPanel/>", () => {
  let wrapper
  beforeEach(() => {
    wrapper = setupShallow(RadioPanel, { dive: true })
  })
  test('render <RadioPanel/> without error', () => {
    let radioPanelComponent = findByAttr(wrapper, 'component-radio-panel');
    expect(radioPanelComponent.length).toBe(1)
  })
  test('render RadioPanel form', () => {
    let radioForm = findByAttr(wrapper, 'radio-panel-form')
    expect(radioForm.length).toBe(1)
  })
  test('render RadioPanel group', () => {
    let radioGroup = findByAttr(wrapper, 'radio-panel-group')
    expect(radioGroup.length).toBe(1)
  })
})
describe("<RadioPanel/> with radio", () => {
  const wrapper = setupShallow(RadioPanel, { dive: true }, { radioGroup: radioGroup })

  test('render RadioPanel with data', () => {
    let radioPanelComponent = findByAttr(wrapper, 'component-radio-panel');
    expect(radioPanelComponent.length).toBe(1)
  })

  test('check radio Button 1 with data', () => {
    let radioButton = wrapper.find('[value="option1"]')
    expect(radioButton.length).toBe(1)
  })
  test('check radio Button 2 with data', () => {
    let radioButton = wrapper.find('[value="option2"]')
    expect(radioButton.length).toBe(1)
  })
})

describe('check radioPanel onChange', () => {
  const wrapper = setupShallow(RadioPanel, { dive: true }, { radioGroup: radioGroup })

  test('check radio panel on Change', () => {
    let radioButton = findByAttr(wrapper, 'radio-panel-group')
    radioButton.simulate('change', { target: { value: "option1" } })
    const selectedValue = wrapper.state('value')
    expect(selectedValue).toBe('option1')
  })

})