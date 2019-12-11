import React from 'react';
import PropTypes from 'prop-types'
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import styles from './DropdownWithAutosuggest.styles'

class DropdownWithAutosuggest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isClearable: props.isClearable,
      selectedOption: (typeof props.defaultValue == "object") ? props.defaultValue :
        this.defaultSelection(props.options, props.defaultValue)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.options.length != this.props.options.length) {
      this.setState({
        selectedOption: (typeof nextProps.defaultValue == "object") ? nextProps.defaultValue :
          this.defaultSelection(nextProps.options, nextProps.defaultValue)
      });
    }
  }

  defaultSelection = (passedOptions, defaultValue) => {
    if (passedOptions.length > 0 && defaultValue) {
      return passedOptions.find(option => option.label == defaultValue);
    }
    return null;
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.onSelect(selectedOption);
  }

  render() {
    const { selectedOption, isClearable } = this.state;
    const { options, placeholder, selectStyles } = this.props;
    const customStyles = {
      control: (base, state) => ({
        ...base,
        ...{
          'height': '26',
          'min-height': '26',
          'border-radius': 'unset',
          'align-content': 'center',
          '&:hover': { borderColor: 'none' }, // border style on hover
          'border': '1px solid lightgray', // default border color
          'boxShadow': 'none' // no box-shadow
        },
        ...(selectStyles && selectStyles.control) ? selectStyles.control : {}
      }),
      indicatorSeparator: base => ({
        ...base,
        'display': 'none',
        ...(selectStyles && selectStyles.indicatorSeparator) ? selectStyles.indicatorSeparator : {}
      }),
      menu: base => ({
        ...base,
        ...{
          'border-radius': 'unset',
          'color': '#000000'
        },
        ...(selectStyles && selectStyles.menu) ? selectStyles.menu : {}
      }),
      placeholder: base => ({
        ...base,
        ...{ color: '#000000' },
        ...(selectStyles && selectStyles.placeholder) ? selectStyles.placeholder : {}
      }),
      option: (base, { isFocused, isSelected }) => ({
        ...base,
        ...{ 'backgroundColor': isSelected ? '#345457' : isFocused ? '#9ABABD' : null },
        ...(selectStyles && selectStyles.option) ? selectStyles.option : {}
      })
    };

    return (
      <div data-test="dropdown-autosuggest-container">
        <Select
          classNamePrefix="list"
          styles={customStyles}
          isClearable={isClearable}
          placeholder={placeholder}
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
      </div>
    );
  }
}

DropdownWithAutosuggest.propTypes = {
  onSelect: PropTypes.func,
  options: PropTypes.array.isRequired,
  isClearable: PropTypes.bool,
  placeholder: PropTypes.string
}

DropdownWithAutosuggest.defaultProps = {
  isClearable: false
};

export default withStyles(styles)(DropdownWithAutosuggest);