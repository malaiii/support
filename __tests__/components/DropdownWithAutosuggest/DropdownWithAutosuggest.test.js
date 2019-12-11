import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {
  setupDefault,
  findByAttr,
} from '../../../src/utils/test/index';
import DropdownWithAutosuggest from '../../../src/components/DropdownWithAutosuggest/DropdownWithAutosuggest';
Enzyme.configure({ adapter: new EnzymeAdapter() });

const { setupShallow, setupMount } = setupDefault();

describe('render <DropdownWithAutosuggest>', () => {
  const wrapper = setupShallow(
    DropdownWithAutosuggest,
    { dive: true },
    { options: [], placeholder: '', selectStyles: { control: {} }, onSelect: jest.fn() }
  );

  test('render container', () => {
    const container = findByAttr(wrapper, 'dropdown-autosuggest-container');
    expect(container.length).toBe(1);
  });

  const instance = wrapper.instance();

  const passedOptions = [{
    name: 'Acab, Jason',
    label: 'Acab, Jason',
    code: '112484',
  },
  {
    name: 'Ahrberg, William',
    label: 'Ahrberg, William',
    code: '3917',
  },
  {
    name: 'Ardis, Lindsay',
    label: 'Ardis, Lindsay',
    code: '2901',
  }]

  it('should select the default option', async () => {
    wrapper.setProps({ options: passedOptions });
    const data = instance.defaultSelection(passedOptions, "Acab, Jason");
    expect(data).toEqual({
      name: 'Acab, Jason',
      label: 'Acab, Jason',
      code: '112484',
    });
  })

  it('should handle the change', async () => {
    instance.handleChange({
      name: 'Acab, Jason',
      label: 'Acab, Jason',
      code: '112484',
    });
    expect(wrapper.state().selectedOption).toEqual({
      name: 'Acab, Jason',
      label: 'Acab, Jason',
      code: '112484',
    });
  })

});

describe('render <DropdownWithAutosuggest> test with options in drop down', () => {

  const { wrapper, dismountWrapper } = setupMount(DropdownWithAutosuggest, {
    options: [{ "label": "test", "value": "test", "name": "test" }, { "name": "test1", "label": "test1", "value": "test1" }], placeholder: 'Test Placeholder', isClearable: true
  });

  test('test if place holder is as passed by the props', () => {
    const placeholderText = wrapper.find('.list__placeholder').text();
    expect(placeholderText).toEqual('Test Placeholder');
  });

  dismountWrapper();

});