import React, { Component } from 'react';
import { connect } from 'react-redux';
import FATable from '../FATable/FATable';
import { Typography } from '@material-ui/core';
import style from './FATile.style';
import { withStyles } from '@material-ui/core/styles';
import { actions } from '../../actions/index';
import RadioPanel from '../RadioPanel/RadioPanel';
import DropdownWithAutosuggest from '../DropdownWithAutosuggest/DropdownWithAutosuggest';
import FAView from '../FAView/FAView';
import FirmTable from '../FirmTable/FirmTable';
import FirmView from '../FirmView/FirmView';
import ExportBtn from '../../../public/images/png/export-btn.png';

class FATile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFADrillSelected: false,
      FADrillData: null,
      FirmDrillData: null,
      detailsType: 'fa',
      faRadioGroup: [
        { value: 'byfa', label: 'By Financial Advisor' },
        { value: 'byfirm', label: 'By Firm' }
      ],
      detailId: '',
      view: 'byfa',
      childView: '',
      faDescription: 'COMMISSION DETAILS BY FINANCIAL ADVISOR - ',
      firmDescription: 'COMMISSION DETAILS BY FIRM - '
    };
    this.child = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.dateReducer.startDate != this.props.dateReducer.startDate ||
      prevProps.dateReducer.endDate != this.props.dateReducer.endDate ||
      prevProps.rmInfo != this.props.rmInfo
    ) {
      let rmCode = this.props.rmInfo ? this.props.rmInfo.code.trim() : '';
      this.props.getFirmDetails(
        this.props.dateReducer.startDate,
        this.props.dateReducer.endDate,
        this.state.detailId,
        rmCode,
        this.state.detailsType
      );
    }
  }

  onCellClicked = (params, viewName) => {
    if (
      params.colDef.field == 'financial_advisor' ||
      (params.colDef.field == 'firm' && viewName == 'firm')
    ) {
      this.setState({ view: viewName });
      let startDate = this.props.dateReducer.startDate;
      let endDate = this.props.dateReducer.endDate;
      let rmCode = this.props.rmInfo ? this.props.rmInfo.code.trim() : '';
      if (viewName == 'fa') {
        this.setState({ FADrillData: params });
        let detailIdByFA = params.data.rr_num;
        this.setState({ detailId: detailIdByFA });
        this.setState({ detailsType: 'fa' });
        this.props.getFirmDetails(
          startDate,
          endDate,
          detailIdByFA,
          rmCode,
          this.state.detailsType
        );
      } else if (viewName == 'firm') {
        this.setState({ detailsType: 'firm' });
        console.log(this.state.detailsType);
        this.setState({ FirmDrillData: params });
        let detailIdByfirm = params.data.client_id;
        this.setState({ detailId: detailIdByfirm });
        this.props.getFirmDetails(
          startDate,
          endDate,
          detailIdByfirm,
          rmCode,
          this.state.detailsType
        );
      }
    }
  };
  onViewChange = viewName => {
    this.setState({ view: viewName });
  };
  formatOptionsForAdvisor(options) {
    if (options.length > 0) {
      return options.map(option => ({
        ...option,
        label: option.financial_advisor,
        value: option.financial_advisor
      }));
    }
    return [];
  }
  formatOptionsForFirm(options) {
    if (options.length > 0) {
      return options.map(option => ({
        ...option,
        label: option.firm,
        value: option.firm
      }));
    }
    return [];
  }

  onBtExport() {
    this.child.current.exportCsv();
  }

  firmSelected = selectedOption => {
    //The selected option will be available here
    if (selectedOption != null) {
      this.child.current.externalFilterChanged(selectedOption);
    } else {
      selectedOption = {
        financial_advisor: ''
      };
      this.child.current.externalFilterChanged(selectedOption);
    }
  };

  firmSelectedForFirmView = selectedOption => {
    //The selected option will be available here
    if (selectedOption != null) {
      this.child.current.externalFilterChanged(selectedOption);
    } else {
      selectedOption = {
        firm: ''
      };
      this.child.current.externalFilterChanged(selectedOption);
    }
  };

  render() {
    const { classes, advisorData } = this.props;
    const {
      FADrillData,
      faRadioGroup,
      view,
      FirmDrillData
    } = this.state;

    if (
      view == 'fa' &&
      this.props.data.ADVISORDETAILS &&
      this.props.data.ADVISORDETAILS.data
    ) {
      return (
        <FAView
          onViewChange={this.onViewChange}
          selectedParams={FADrillData}
          data={this.props.data.ADVISORDETAILS.data}
        />
      );
    } else if (
      view == 'firm' &&
      this.props.data.FIRMDETAILS &&
      this.props.data.FIRMDETAILS.data
    ) {
      return (
        <FirmView
          onViewChange={this.onViewChange}
          selectedParams={FirmDrillData}
          data={this.props.data.FIRMDETAILS.data}
        />
      );
    } else {
      return (
        <div data-test="component-fa-tile">
          <div data-test="component-fatile-description">
            <Typography className={classes.title} variant="h5" color="inherit">
              {view == 'byfa'
                ? this.state.faDescription
                : this.state.firmDescription}
              <span className={classes.greenKnockout}>
                {this.props.dateReducer.endDate.toDate().toLocaleDateString()}
              </span>
            </Typography>
            <img
              data-test="export-btn"
              className={classes.exportBtn}
              src={ExportBtn}
              onClick={() => this.onBtExport()}
            />
          </div>
          <div className={classes.radioSearchContainer}>
            <div style={{ padding: '0px 0px 0px 40px' }}>
              <RadioPanel
                data-test="radio-panel-fatile"
                radioGroup={faRadioGroup}
                defaultValue={view}
                onClick={this.onViewChange}
              />
            </div>
            <div className={classes.autoSuggest}>
              {view == 'byfa' ? (
                <DropdownWithAutosuggest
                  onSelect={this.firmSelected}
                  isClearable={true}
                  options={this.formatOptionsForAdvisor(advisorData.ADVISOR)}
                  placeholder={'Search'}
                />
              ) : (
                  <DropdownWithAutosuggest
                    onSelect={this.firmSelectedForFirmView}
                    isClearable={true}
                    options={this.formatOptionsForFirm(advisorData.FIRM)}
                    placeholder={'Search'}
                  />
                )}
            </div>
          </div>
          <div>
            {view == 'byfa' ? (
              <FATable
                data-test="fa-table-component"
                ref={this.child}
                onCellClicked={this.onCellClicked}
                data={advisorData.ADVISOR}
              />
            ) : (
                <FirmTable
                  data-test="fa-table-component"
                  ref={this.child}
                  onCellClicked={this.onCellClicked}
                  data={advisorData.FIRM}
                />
              )}
          </div>
        </div>
      );
    }
  }
}

export default connect(
  state => state,
  dispatch => {
    return {
      getFirmDetails: (startDate, endDate, detailId, rmCode, detailsType) =>
        dispatch(
          actions.getFirmDetails(
            startDate,
            endDate,
            detailId,
            rmCode,
            detailsType
          )
        )
    };
  }
)(withStyles(style, { withTheme: true })(FATile));
