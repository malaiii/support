import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../actions/index';
import { Grid } from '@material-ui/core';
import GlobalNavbar from '../components/GlobalNavbar/GlobalNavbar';
import styles from './App.style';
import { withStyles } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader';
import withRoot from '../assets/Jss/withRoot';
import moment from 'moment';
import '../../public/styles/global.css';
import UltraShortActivity from "../components/UltraShortActivity/UltraShortActivity";
import IncentiveMetrics from "../components/IncentiveMetrics/IncentiveMetrics";
import ExperienceMetrics from "../components/ExperienceMetrics/ExperienceMetrics";
import EngagementMetrics from "../components/EngagementMetrics/EngagementMetrics";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRM: null,
      user: {},
      isSRMView: false,
      isRMView: false,
      isVisitor: true,
      showSearch: false,
      showTile: true,
      initialStartDate: '',
      initialEndDate: '',
      isDeselected: false,
      fytdStartDate: "",
      fytdEndDate: "",
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.RM != this.props.data.RM) {
      this.setState({ selectedRM: nextProps.data.RM.data[0] });
      this.props.updateRM(nextProps.data.RM.data[0]);
    }
  }

  getSelectedRMCode = () => {
    return this.state.selectedRM ? this.state.selectedRM.code.trim() : '';
  }

  componentDidUpdate(prevProps, prevState) {
    const rmCode = this.getSelectedRMCode();
    if (
      prevProps.dateReducer.startDate != this.props.dateReducer.startDate ||
      prevProps.dateReducer.endDate != this.props.dateReducer.endDate ||
      prevState.selectedRM != this.state.selectedRM
    ) {
      if (prevProps.dateReducer.startDate && prevProps.dateReducer.endDate) {
        this.props.onLoad(
          this.props.dateReducer.startDate,
          this.props.dateReducer.endDate,
          rmCode
        );
        this.props.updateChart(
          this.props.dateReducer.startDate,
          this.props.dateReducer.endDate,
          rmCode
        );
        this.props.updateFAView(
          this.props.dateReducer.startDate,
          this.props.dateReducer.endDate,
          rmCode
        );
        this.props.updateFirmView(
          this.props.dateReducer.startDate,
          this.props.dateReducer.endDate,
          rmCode
        );
      }

      /**
       * This code is used to update the FYTD data for commission tile in the case RM, fyStartDate or asOfDate has been changed.
       */
      if (prevProps.dateReducer.fyStartDate != this.props.dateReducer.fyStartDate ||
        prevProps.dateReducer.asOfDate != this.props.dateReducer.asOfDate ||
        prevState.selectedRM != this.state.selectedRM) {
        const fyStartDate = this.props.dateReducer.fyStartDate;
        const asOfDate = this.props.dateReducer.asOfDate;
        // Hit the service call only if all the required parameters are available.
        if (fyStartDate && asOfDate && rmCode) {
          this.props.loadFYTDAccountKPIs(fyStartDate, asOfDate, rmCode)
          this.props.loadFYTDCommission(fyStartDate, asOfDate, rmCode)
        }
      }
    }
  }
  componentDidMount() {
    this.props.getMaxDate().then(result => {
      let maxDate = moment(result.payload.data.max);
      this.props.getDates(maxDate).then(res => {
        const fyStartDate = moment(res.payload.data.fy_start_dt);
        const asOfDate = moment(res.payload.data.as_of_dt);
        const startDate = fyStartDate;
        const endDate = moment(res.payload.data.most_recent_bus_dt);
        this.setState({ fytdStartDate: startDate, fytdEndDate: endDate });
        this.props.updateDate({
          fyStartDate,
          asOfDate,
          startDate,
          endDate
        });
      });
    });

    this.handleRequest('/api/v1/validate').then(() => {
      if (this.state.isSRMView) {
        this.props.getListOfRM();
        this.setState({ showSearch: true });
      } else if (this.state.isRMView) {
        let userObj = localStorage.getItem('user');
        let user = JSON.parse(atob(userObj));
        this.props.getRMCode(user.username).then(res => {
          let selectedRM = {
            name: res.payload.data.SALES_EMP_NAME,
            code: res.payload.data.SALES_EMP_CODE
          };
          this.setState({ selectedRM, showSearch: false });
          this.props.updateRM(selectedRM);
        });
      } else if (this.state.isVisitor) {
        this.setState({ showTile: false });
      }
    });
    this.props.getMetricsDetails();
    this.props.getExperienceMetrics();
    this.props.getEngagementMetrics();
  }

  onChangeDate = (name) => {
    this.setState({ isDeselected: false });
    let mappedDates = mappedData(this.props.data.CALENDAR.data, {
      '1y_start_dt': '1Y',
      mon_start_dt: 'mtd',
      qtr_start_dt: 'qtd',
      fy_start_dt: 'fytd'
    });

    let startDate = moment(mappedDates[name]);

    let endDate = moment(this.props.data.MAXCALENDAR.data.max);
    this.props.updateDate({
      startDate,
      endDate
    });
  };

  onDateSelect = (startDate, endDate) => {
    this.setState({ isDeselected: true });
    this.props.updateDate({
      startDate,
      endDate
    });
  };

  selectedRM = selectedOption => {
    this.setState({ selectedRM: selectedOption });
    this.props.updateRM(selectedOption);
  };

  handleRequest = url => {
    let headers = { 'Content-Type': 'application/json' };
    let accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      headers['X-CSRF-TOKEN'] = accessToken;
    }

    return fetch(url, {
      method: 'POST',
      headers: headers
    })
      .then(response => {
        if (!response.ok) throw response;

        return response.json();
      })
      .then(result => {
        this.setState({
          isSRMView: result.isSRM,
          isRMView: result.isRM,
          isVisitor: result.isVisitor
        });
      })
      .catch(error => {
        console.error({ error });
      });
  };

  formatOptions(options) {
    if (options.length > 0) {
      return options.map(option => ({
        ...option,
        label: option.name,
        value: option.name
      }));
    }
    return [];
  }

  /**
   * Refresh the FYTD data for commission tile on collapsing the tile.
   */
  updateFYTDCommissionTile = () => {
    const rmCode = this.getSelectedRMCode();
    const { fyStartDate, asOfDate } = this.props.dateReducer;
    // Hit the service call only if all the required parameters are available.
    if (fyStartDate && asOfDate && rmCode) {
      this.props.loadFYTDAccountKPIs(fyStartDate, asOfDate, rmCode);
      this.props.loadFYTDCommission(fyStartDate, asOfDate, rmCode);
    }
  }

  refreshCommissionFYTDSelection = () => {
    const rmCode = this.getSelectedRMCode();
    const { fytdStartDate, fytdEndDate } = this.state;
    // Hit the service call only if all the required parameters are available.
    if (fytdStartDate && fytdEndDate && rmCode) {
      this.setState({ isDeselected: false });
      this.props.updateDate({ startDate: fytdStartDate, endDate: fytdEndDate });
      this.props.onLoad(fytdStartDate, fytdEndDate, rmCode);
      this.props.updateChart(fytdStartDate, fytdEndDate, rmCode);
      this.props.updateFAView(fytdStartDate, fytdEndDate, rmCode);
      this.props.updateFirmView(fytdStartDate, fytdEndDate, rmCode);
    }
  }

  /*
   * Verify Selectd RM under Incentive metric List.
   * Trigger To Tiles list view When we dont have data on expanded.
   */
  filterIncentiveMetricsList = () => {
    const rmCode = this.getSelectedRMCode();
    const { METRICSDETAILS } = this.props.data;
    const matchMetrics = METRICSDETAILS.data.some(function (val) {
      return val.code == rmCode;
    });

    if (!matchMetrics && this.props.expansionTileInfo.expandedTileId == 'incentiveMetrics') {
      this.props.onExpansionTileToggle(null)
    }

    return matchMetrics
  }

  render() {
    const { classes, data } = this.props;
    const { selectedRM } = this.state;
    const { RM, METRICSDETAILS, EXPERIENCE_METRICS, ENGAGEMENTMETRICS } = data;

    const formattedRMData =
      RM.data.length > 0 ? this.formatOptions(RM.data) : [];
    const showIncentiveTile = this.filterIncentiveMetricsList();
    return (
      <div data-test="component-app" className="App">
        <GlobalNavbar
          appname="Client Services Portal"
          showDropdownAppList={false}
          showSearch={this.state.showSearch}
          options={formattedRMData}
          selectedRM={this.selectedRM}
        />
        <div className={classes.content}>
          <Grid container spacing={24}>
            {this.state.showTile &&
              <UltraShortActivity
                onTileCollapse={this.updateFYTDCommissionTile}
                onTileExpand={this.refreshCommissionFYTDSelection}
                isDeselected={this.state.isDeselected}
                trendTileData={data}
                dateReducer={this.props.dateReducer}
                onChangeDate={this.onChangeDate}
                onDateSelect={this.onDateSelect}
              />
            }
            {this.state.showTile && showIncentiveTile &&
              <IncentiveMetrics
                trendTileData={data}
                metricsData={METRICSDETAILS.data}
                selectedRM={selectedRM && parseInt(selectedRM.code)}
              />
            }
            <EngagementMetrics
              metricsData={ENGAGEMENTMETRICS.data}
            />
            <ExperienceMetrics
              metricsData={EXPERIENCE_METRICS.data}
            />
          </Grid>
        </div>
      </div>
    );
  }
}

const mappedData = (updateObj, mappedKeys) => {
  let replacedItems = Object.keys(updateObj).map(key => {
    const newKey = mappedKeys[key] || key;
    return { [newKey]: updateObj[key] };
  });
  return replacedItems.reduce((a, b) => Object.assign({}, a, b));
};

export default hot(module)(
  connect(
    state => state,
    dispatch => {
      return {
        dataConnect: () => dispatch(actions.dataConnect()),
        getDates: asOfDate => dispatch(actions.getDates(asOfDate)),
        updateDate: payload => dispatch(actions.updateDate(payload)),
        onLoad: (startDate, endDate, rmCode) =>
          dispatch(actions.updateConnection(startDate, endDate, rmCode)),
        updateChart: (startDate, endDate, rmCode) =>
          dispatch(actions.updateChart(startDate, endDate, rmCode)),
        updateFAView: (startDate, endDate, rmCode) =>
          dispatch(actions.updateFAView(startDate, endDate, rmCode)),
        updateRM: selectedRM => dispatch(actions.updateRM(selectedRM)),
        getListOfRM: () => dispatch(actions.getListOfRM()),
        getRMCode: networkId => dispatch(actions.getRMCode(networkId)),
        getMaxDate: () => dispatch(actions.getMaxDate()),
        updateFirmView: (startDate, endDate, rmCode) =>
          dispatch(actions.updateFirmView(startDate, endDate, rmCode)),
        getMetricsDetails: () => dispatch(actions.getMetricsDetails()),
        getExperienceMetrics: () => dispatch(actions.getExperienceMetrics()),
        getEngagementMetrics: () => dispatch(actions.getEngagementMetrics()),
        loadFYTDAccountKPIs: (fyStartDate, asOfDate, rmCode) =>
          dispatch(actions.getFYTDAccountKPIs(fyStartDate, asOfDate, rmCode)),
        loadFYTDCommission: (fyStartDate, asOfDate, rmCode) =>
          dispatch(actions.getFYTDCommission(fyStartDate, asOfDate, rmCode)),
        onExpansionTileToggle: expandedTileId => dispatch(actions.handleExpansionTileToggle(expandedTileId)),
      };
    }
  )(withRoot(withStyles(styles, { withTheme: true })(App)))
);
