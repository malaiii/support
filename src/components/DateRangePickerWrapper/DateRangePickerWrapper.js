import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import momentPropTypes from "react-moment-proptypes";
import 'react-dates/initialize';
import "react-dates/lib/css/_datepicker.css";
import omit from "lodash/omit";
import { DateRangePicker } from "react-dates";
import styles from './DateRangePickerWrapper.style';
import { withStyles } from '@material-ui/core/styles';
import './DateRangePickerWrapper.css'


const propTypes = {
  ...styles,
  // example props for the demo
  autoFocus: PropTypes.bool,
  autoFocusEndDate: PropTypes.bool,
  initialStartDate: momentPropTypes.momentObj,
  initialEndDate: momentPropTypes.momentObj,
  ...omit({}, [
    "startDate",
    "endDate",
    "onDatesChange",
    "focusedInput",
    "onFocusChange"
  ])
};

const defaultProps = {
  // example props for the demo
  autoFocus: false,
  autoFocusEndDate: false,
  initialStartDate: null,
  initialEndDate: null,


  // input related props
  startDateId: "startDate",
  startDatePlaceholderText: "Start Date",
  endDateId: "endDate",
  endDatePlaceholderText: "End Date",
  disabled: false,
  required: true,
  screenReaderInputMessage: "",
  showClearDates: false,
  showDefaultInputIcon: true,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,
  block: false,
  small: true,
  regular: false,

  // calendar presentation and interaction related props
  renderMonthText: null,
  orientation: "horizontal",
  anchorDirection: "left",
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  isRTL: false,


  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() { },
  onNextMonthClick() { },
  onClose() { },

  // day presentation and interaction related props
  renderDayContents: null,
  minimumNights: 0,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: () => { },
  isDayHighlighted: () => false,

  // internationalization
  displayFormat: () => moment.localeData().longDateFormat("L"),
  monthFormat: "MMMM YYYY"
};

class DateRangePickerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // startDate: props.startDate,
      // endDate: props.endDate,
      focusedInput: null
    };
  }

  onDatesChange = ({ startDate, endDate }) => {
    // this.setState({ startDate, endDate });
    if (startDate && endDate != null)
      this.props.onDateSelect(startDate, endDate);

  }


  onFocusChange = (focusedInput) => this.setState({ focusedInput });

  render() {

    const props = omit(this.props, [
      "autoFocus",
      "autoFocusEndDate",
      "initialStartDate",
      "initialEndDate"
    ]);
    return (

      <DateRangePicker
        {...props}
        startDate={this.props.startDate}
        endDate={this.props.endDate}
        onDatesChange={this.onDatesChange}
        focusedInput={this.state.focusedInput}
        onFocusChange={this.onFocusChange}
      />

    );
  }
}

DateRangePickerWrapper.propTypes = propTypes;
DateRangePickerWrapper.defaultProps = defaultProps;

function isSameDay(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  // Compare least significant, most likely to change units first
  // Moment's isSame clones moment inputs and is a tad slow
  return (
    a.date() === b.date() && a.month() === b.month() && a.year() === b.year()
  );
}

export default withStyles(styles)(DateRangePickerWrapper);
