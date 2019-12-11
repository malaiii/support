import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import styles from './RadioPanel.style'

class RadioPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    }
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
    this.props.onClick(event.target.value);
  };
  render() {
    const { classes, radioGroup } = this.props;
    return (
      <Grid container data-test="component-radio-panel" alignItems="flex-start">
        <Grid item>
          <FormControl data-test="radio-panel-form" component="fieldset" className={classes.formControl}>
            <RadioGroup
              row
              data-test="radio-panel-group"
              aria-label="view"
              name="view"
              value={this.state.value}
              className={classes.group}
              onChange={this.handleChange}
            >
              {radioGroup.map(radio =>

                <FormControlLabel
                  key={radio.value}
                  value={radio.value}
                  control={<Radio data-test="radio-button" color="primary" />}
                  label={radio.label}
                  labelPlacement="end"
                />
              )}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

RadioPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  radioGroup: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string
  })).isRequired
};

export default withStyles(styles, { withTheme: true })(RadioPanel);