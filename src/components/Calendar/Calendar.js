import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { InlineDatePicker } from 'material-ui-pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import Event from '@material-ui/icons/Event';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import './Calendar.css';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 150
  }
});

class Calendar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedDate: this.props.defaultValue
    }

    this.handleDateChange = this.handleDateChange.bind(this)

  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    return (
      <div data-test="calendar-container" className={`${this.props.classes.container} ${this.props.className}`}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
          <InlineDatePicker
            keyboard
            value={this.state.selectedDate}
            onChange={this.handleDateChange}
            format="MM/dd/yyyy"
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            keyboardIcon={<Event />}
            leftArrowIcon={<KeyboardArrowLeft />}
            rightArrowIcon={<KeyboardArrowRight />}
            maxDate={this.props.maxDate}
            minDate={this.props.minDate}
            className="inline-picker"
          />
        </MuiPickersUtilsProvider>
      </div>
    )
  }
}

Calendar.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

export default withStyles(styles)(Calendar);