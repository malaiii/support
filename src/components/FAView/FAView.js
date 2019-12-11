import React, { Component } from 'react';
import styles from './FAView.style';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Table from '../Table/Table';
import RadioPanel from '../RadioPanel/RadioPanel';
class FAView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailRadioGroup: [
        { value: 'fa', label: 'All Financial Advisors' },
        { value: 'firm', label: 'All Firm' }
      ],
      viewName: ''
    };
  }
  onViewChange = viewName => {
    this.setState({ viewName: viewName });
    if (viewName == 'fa') this.props.onViewChange('byfa');
    if (viewName == 'firm') this.props.onViewChange('byfirm');
  };

  render() {
    const { classes, data, selectedParams } = this.props;
    const { detailRadioGroup } = this.state;
    return (
      <div>
        <div>
          <Typography
            data-test="fa-view-description"
            className={classes.title}
            variant="h5"
            color="inherit"
          >
            FINANCIAL ADVISOR ACTIVITY BY DATE:
            <span className={classes.greenKnockout}>
              {selectedParams ? selectedParams.data.financial_advisor : ''}
            </span>
            <br />
            <span className={classes.company}>
              {selectedParams
                ? selectedParams.data
                  ? selectedParams.data.firm
                  : ''
                : ''}
            </span>
          </Typography>
        </div>
        <div className={classes.container}>
          <RadioPanel
            data-test="radio-panel-fa-component"
            radioGroup={detailRadioGroup}
            onClick={this.onViewChange}
          />
        </div>
        <div>
          <Table data-test="fa-view-table" data={data} />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(FAView);
