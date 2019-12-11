import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {
  setupDefault,
  findByAttr,
  findBySelectorAttr
} from '../../../src/utils/test/index';
import GlobalNavbar from '../../../src/components/GlobalNavbar/GlobalNavbar';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const { setupShallow, setupMount } = setupDefault({
  showDropdownAppList: true
});

describe(`GlobalNavbar Component`, () => {
  // ShowDropdownAppList
  describe('render <GlobalNavbar />', () => {
    let wrapper
    beforeEach(() => {
      wrapper = setupShallow(GlobalNavbar, { dive: true });
    })

    test('render the global nav bar component', () => {
      const globalNavbarComponent = findByAttr(
        wrapper,
        'global-navbar-container'
      );
      expect(globalNavbarComponent.length).toBe(1);
    });

    test('render the logo', () => {
      const logo = findByAttr(wrapper, 'logo');
      expect(logo.length).toBe(1);
    });

    test('render GlobalNavbarDropdown', () => {
      const dropdown = findByAttr(wrapper, 'dropdown');
      expect(dropdown.length).toBe(1);
    });

    test('render app label', () => {
      const appLabel = findByAttr(wrapper, 'app-label');
      expect(appLabel.length).toBe(1);
    });
  });

  // set appname
  describe('render with appname prop set', () => {
    const { wrapper, dismountWrapper } = setupMount(GlobalNavbar, {
      appname: 'Institutional Dashboard'
    });

    test('render app label with text', () => {
      const appLabel = findBySelectorAttr(wrapper, 'Typography', 'app-label');
      expect(appLabel.text()).toEqual('Institutional Dashboard');
    });

    dismountWrapper();
  });

  // don't show dropdown applist
  describe('render with showDropdownAppList=true', () => {
    const wrapper = setupShallow(
      GlobalNavbar,
      { dive: true },
      { showDropdownAppList: false }
    );

    test("don't render GlobalNavbarDropdown when showDropdownAppList=false", () => {
      const dropdown = findByAttr(wrapper, 'dropdown');
      expect(dropdown.length).toBe(0);
    });
  });
});
