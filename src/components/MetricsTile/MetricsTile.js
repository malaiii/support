import React, { Component } from 'react';
import MetricGrid from './MetricsGrid/MetricGrid';
import { Grid } from '@material-ui/core';
import style from './MetricsTile.style';
import { withStyles } from '@material-ui/core/styles';
import KPITile from '../KPITile/KPITile'
import { format } from "d3-format";
import exportIcon from '../../../public/images/png/export-btn.png';
import moment from 'moment';

const SUMMARY_FORMAT = [
  {
    "name": "RANK",
    "value": "-",
    "label": "RANK",
    "subLabel": ""
  },
  {
    "name": "Overall Incentive Tier",
    "value": "-",
    "label": "Overall Incentive Tier",
    "subLabel": ""
  },
  {
    "name": "TOTAL POINTS",
    "value": "-",
    "label": "TOTAL POINTS",
    "subLabel": ""
  },
  {
    "name": "TIEBREAKER SALES",
    "value": "-",
    "label": "TIEBREAKER SALE",
    "subLabel": "(FF $100K PRODUCERS)"
  }
]



class MetricsTile extends Component {
  constructor(props) {
    super(props);
  }

  metricsGrid = React.createRef();

  onExportMetrics = () => {
    if (this.metricsGrid.current) {
      this.metricsGrid.current.exportCsv();
    }
  }
  /**
  * This is used to construct the SUmmary details.
  */
  summaryRMAccounts = () => {
    const { selectedRM, data } = this.props;
    let result;
    const filteredRM = data.metricsExpanded.filter(val => {
      return parseInt(val.code) == selectedRM;
    });
    if (filteredRM.length > 0) {
      result = SUMMARY_FORMAT.map((data) => {
        if (data.name == 'RANK') {
          data.value = filteredRM[0].rank;
        } else if (data.name == 'Overall Incentive Tier') {
          data.value = filteredRM[0].overallIncentiveTier;
        } else if (data.name == 'TOTAL POINTS') {
          data.value = filteredRM[0].totalPoints;
        } else if (data.name == 'TIEBREAKER SALES') {
          data.value = format('($,.4s')(filteredRM[0].tiebreakerSales);
        }
        return data;
      });
    } else {
      result = SUMMARY_FORMAT;
    }
    return result;
  }

  /**
   * This is used to construct the running quarter details.
   */
  renderRunningQuarter = (data) => {
    if (data && data.length && data[0].runningQuarter) {
      const asOfDate = moment().format('MM/DD/YYYY');
      const currentYear = moment().year();
      return `${asOfDate} [FY ${data[0].runningQuarter}, ${currentYear}]`;
    }
  }

  /*
   * This is used to format the "Last refresh date".
   */
  renderLastRefreshDate = (data) => {
    if (data && data.length && data[0].lastRefresh) {
      return moment(data[0].lastRefresh).format('MM/DD/YYYY hh:mm:ss');
    }
  }

  render() {
    const { classes, data, collapsed, showSummary, selectedRM, tileId } = this.props;
    const summaryData = data.metricsExpanded.length > 0 && selectedRM != undefined && this.summaryRMAccounts();
    const selectedRMCode = selectedRM ? parseInt(selectedRM) : 0;
    const legendArray = (tileId == 'incentiveMetrics') ? ['1', '2', '3'] : ['1', '2', '3', '4'];
    const legendText = (tileId == 'incentiveMetrics') ? 'Overall Incentive Tier:' : 'Quartile:';

    const legend = legendArray.map((val) =>
      (<span className={classes.legendSpan} key={val}>
        <span className={`${classes[`overAllIncentiveTier_${val}`]} ${classes.overAllIncentiveTier}`}>
        </span>
        <span>{val}</span>
      </span>));
    return (
      <div data-test="component-fa-tile">
        <Grid container spacing={16}>
          <Grid item xs={12}>
            {summaryData && showSummary &&
              <KPITile item hideBorder={collapsed ? true : false} style={{ padding: '0px 0px 0px 40px' }} data={{
                kpis: summaryData,
              }} />}
          </Grid>
          {collapsed &&
            <Grid item xs={12} className={classes.legendOuter}>
              <div className={`${classes.alignLeft} ${classes.collapsedLegend}`}>
                <span className={classes.legendText}>{legendText}</span>
                <span>{legend}</span>
              </div>
            </Grid>
          }
          {!collapsed &&
            (<Grid container className={classes.mainContainer}>
              <Grid item xs={6} className={classes.legendsContainer}>
                <div className={classes.legendsWrapper}>
                  <span className={classes.spanText}>Overall Incentive Tier:</span>
                  <span className={classes.spanText}>{legend} </span>
                </div>
                <div className={classes.alignLeft}>
                  <img src={exportIcon} className={classes.exportIcon} onClick={this.onExportMetrics} />
                </div>
              </Grid>
              <Grid item xs={6} className={classes.refreshDetails} aligncontent="flex-end">
                <div className={classes.alignRight}>
                  <span>Running Quarter as of </span>
                  <span className={classes.fontBold}>{this.renderRunningQuarter(data.metricsExpanded)}</span>
                </div>
                <div className={classes.alignRight}>
                  <span>Last Refresh: </span>
                  <span className={classes.fontBold}>{this.renderLastRefreshDate(data.metricsExpanded)}</span>
                </div>
              </Grid>
            </Grid>)
          }

          <Grid item xs={12}>
            <MetricGrid
              data-test="fa-table-component"
              data={collapsed ? data.metricsSummary : data.metricsExpanded}
              collapsed={collapsed}
              selectedRMCode={selectedRMCode}
              ref={this.metricsGrid}
              tileId={tileId}
            />
          </Grid>
        </Grid>
      </div >
    );
  }
}

export default withStyles(style, { withTheme: true })(MetricsTile)