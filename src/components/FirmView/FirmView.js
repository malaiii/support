import React, { Component } from 'react';
import styles from './FirmView.style';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Table from '../Table/Table';
import RadioPanel from '../RadioPanel/RadioPanel';
class FirmView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailRadioGroup: [
        { value: 'fa', label: 'All Financial Advisors' },
        { value: 'firm', label: 'All Firm' }
      ],
      viewName: ''
    };
    this.onViewChange = this.onViewChange.bind(this);
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
      <div data-test="component-firm-view">
        <div>
          <Typography
            data-test="firm-view-description"
            className={classes.title}
            variant="h5"
            color="inherit"
          >
            FIRM ACTIVITY BY DATE:
            <span className={classes.greenKnockout}>
              {selectedParams ? selectedParams.data.firm : ''}
            </span>
            <br />
          </Typography>
        </div>
        <div className={classes.container}>
          <RadioPanel
            data-test="radio-panel-firm-component"
            radioGroup={detailRadioGroup}
            onClick={this.onViewChange}
          />
        </div>
        <div>
          <Table data-test="firm-view-table" data={data} />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(FirmView);
