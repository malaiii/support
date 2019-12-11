import React from 'react';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {
  setupDefault,
  findByAttr,
  findBySelectorAttr
} from '../../../../src/utils/test/index';
import GlobalNavbarDropdown from '../../../../src/components/GlobalNavbar/GlobalNavbarDropdown/GlobalNavbarDropdown';

const globalAppList = [
  {
    tileContent: [
      {
        name: 'Daily Mutual Fund Flows',
        url: 'https://knowledgecenter.lordabbett.com/dailyflows/',
        subApps: []
      },
      {
        name: 'Assets Under Management',
        url: '#',
        subApps: [
          {
            name: 'Report Builder',
            url: 'https://knowledgecenter.lordabbett.com/aum/report-builder'
          },
          { name: 'Key Word Definition', url: '#' }
        ]
      },
      {
        name: 'Managed Accounts',
        url: '#',
        subApps: []
      }
    ]
  },
  {
    tileContent: [
      {
        name: 'Product Knowledge Center',
        url: '#',
        subApps: [
          { name: 'Mutual Funds Comparison', url: '#' },
          { name: 'UCITS Funds Comparison', url: '#' },
          { name: 'Composite Comparison', url: '#' },
          { name: 'Competitive Analysis', url: '#' },
          { name: 'Product News', url: '#' }
        ]
      }
    ]
  }
];

Enzyme.configure({ adapter: new EnzymeAdapter() });

const { setupShallow, setupMount } = setupDefault();

// GlobalNavbarDropdown
describe(`render <GlobalNavbarDropdown>`, () => {
  // <GlobalNavbarDropdown />
  describe('render <GlobalNavbarDropdown>', () => {
    const wrapper = setupShallow(
      GlobalNavbarDropdown,
      { dive: true },
      { globalAppList: [] }
    );

    test('render container', () => {
      const container = findByAttr(wrapper, 'dropdown-container');
      expect(container.length).toBe(1);
    });

    test('render dropdown toggle button', () => {
      const toggle = findByAttr(wrapper, 'toggle');
      expect(toggle.length).toBe(1);
    });

    test('grid list container should be closed', () => {
      const gridListContainer = findByAttr(wrapper, 'grid-list-container');
      expect(gridListContainer.length).toBe(0);
    });
  });

  // <GlobalNavbarDropdown /> Closed State click
  describe('render <GlobalNavbarDropdown /> closed state', () => {
    const wrapper = setupShallow(
      GlobalNavbarDropdown,
      { dive: true },
      { globalAppList: [] },
      { open: false }
    );

    test('click on toggle button when closed', () => {
      const toggleButton = findByAttr(wrapper, 'toggle');
      toggleButton.simulate('click');
      wrapper.update();
      const newState = wrapper.state('open');
      expect(newState).toBe(true);
    });
  });

  // <GlobalNavbarDropdown /> Open State click
  describe('render <GlobalNavbarDropdown /> open state', () => {
    const wrapper = setupShallow(
      GlobalNavbarDropdown,
      { dive: true },
      { globalAppList: [] },
      { open: true }
    );

    test('click on toggle button when open', () => {
      const toggleButton = findByAttr(wrapper, 'toggle');
      toggleButton.simulate('click');
      wrapper.update();
      const newState = wrapper.state('open');
      expect(newState).toBe(false);
    });
  });

  // <GlobalNavbarDropdown /> Open State empty app list
  describe('render <GlobalNavbarDropdown /> open state', () => {
    const wrapper = setupShallow(
      GlobalNavbarDropdown,
      { dive: true },
      { globalAppList: [] },
      { open: true }
    );

    test('render grid list container', () => {
      const gridListContainer = findByAttr(wrapper, 'grid-list-container');
      expect(gridListContainer.length).toBe(1);
    });

    test('render GridList', () => {
      const gridList = findByAttr(wrapper, 'grid-list');
      expect(gridList.length).toBe(1);
    });

    test('render 0 GridListTiles', () => {
      const gridListTile = findByAttr(wrapper, 'grid-list-tile');
      expect(gridListTile.length).toBe(0);
    });
  });

  // <GlobalNavbarDropdown /> open state globalAppList
  describe('render <GlobalNavbarDropdown /> open state globalAppList', () => {
    const wrapper = setupShallow(
      GlobalNavbarDropdown,
      { dive: true },
      { globalAppList },
      { open: true }
    );

    test('render 2 GridListTiles', () => {
      const gridListTile = findByAttr(wrapper, 'grid-list-tile');
      expect(gridListTile.length).toBe(2);
    });

    test('render 4 app links with target="_blank', () => {
      const appLink = wrapper.find('[data-test="app-link"][target="_blank"]');
      expect(appLink.length).toBe(4);
    });

    test('first link should have url equal to "https://knowledgecenter.lordabbett.com/dailyflows/"', () => {
      const appLinkHref = findByAttr(wrapper, 'app-link')
        .first()
        .prop('href');
      expect(appLinkHref).toEqual(
        'https://knowledgecenter.lordabbett.com/dailyflows/'
      );
    });

    test('render 4 app labels', () => {
      const appLabel = wrapper.find(
        '[data-test="app-label"][variant="h6"][color="inherit"]'
      );
      expect(appLabel.length).toBe(4);
    });

    test('render 7 subApp links with target="_blank"', () => {
      const subAppLink = wrapper.find(
        '[data-test="sub-app-link"][target="_blank"]'
      );
      expect(subAppLink.length).toBe(7);
    });

    test('first subApp link should have url equal to "https://knowledgecenter.lordabbett.com/aum/report-builder"', () => {
      const subAppLinkHref = findByAttr(wrapper, 'sub-app-link')
        .first()
        .prop('href');
      expect(subAppLinkHref).toEqual(
        'https://knowledgecenter.lordabbett.com/aum/report-builder'
      );
    });

    test('render 7 sub app labels', () => {
      const subAppLabel = wrapper.find(
        '[data-test="sub-app-label"][variant="body2"][color="inherit"]'
      );
      expect(subAppLabel.length).toBe(7);
    });
  });

  /* Typography text values */
  describe('mount <GlobalNavbarDropdown globalAppList={ globalAppList } /> state: { open: true }', () => {
    const { wrapper, dismountWrapper } = setupMount(GlobalNavbarDropdown, {
      globalAppList
    });
    const toggleButton = findByAttr(wrapper, 'toggle');
    toggleButton.simulate('click');
    wrapper.update();

    test('first appname should equal "Daily Mutual Fund Flows"', () => {
      const appName = findBySelectorAttr(wrapper, 'Typography', 'app-label')
        .first()
        .text();
      expect(appName).toEqual('Daily Mutual Fund Flows');
    });

    test('first subApp label should equal "Report Builder"', () => {
      const subAppName = findBySelectorAttr(
        wrapper,
        'Typography',
        'sub-app-label'
      )
        .first()
        .text();
      expect(subAppName).toEqual('Report Builder');
    });

    dismountWrapper();
  });
});
