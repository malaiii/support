import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import GlobalNavbarDropdown from './GlobalNavbarDropdown/GlobalNavbarDropdown';
import LALogo from '../../../public/images/png/LA logo@2x.png';
import globalAppList from '../../../__mocks__/globalAppList.json';
import styles from './GlobalNavbar.styles';
import LetterAvatar from '../AvatarMenu/AvatarMenu';
import DropdownWithAutosuggest from '../DropdownWithAutosuggest/DropdownWithAutosuggest';
class GlobalNavbar extends Component {
  render() {
    const {
      classes,
      appname,
      showDropdownAppList,
      showSearch,
      options,
      selectedRM
    } = this.props;

    return (
      <div data-test="global-navbar-container">
        <AppBar
          position="fixed"
          color="primary"
          classes={{
            root: classes.root,
            colorPrimary: classes.colorPrimary
          }}
        >
          <Toolbar classes={{ root: classes.toolbarRoot }}>
            <img data-test="logo" className={classes.logo} src={LALogo} />

            {showDropdownAppList ? (
              <GlobalNavbarDropdown
                data-test="dropdown"
                globalAppList={globalAppList}
              />
            ) : null}

            <Typography
              data-test="app-label"
              className={`${classes.text} ${classes.kcLabel}`}
              variant="body2"
              color="inherit"
            >
              {appname}
            </Typography>

            <div className={classes.avatarSearch}>
              {showSearch ? (
                <div className={classes.autoSuggest}>
                  <DropdownWithAutosuggest
                    onSelect={selectedRM}
                    options={options}
                    placeholder={'Select RM'}
                    defaultValue={options.length > 0 ? options[0] : null}
                  />
                </div>
              ) : null}
              <div className={classes.avatar}>
                <LetterAvatar disabled={false} />
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

GlobalNavbar.propTypes = {
  appname: PropTypes.string,
  showDropdownAppList: PropTypes.bool.isRequired,
  options: PropTypes.array,
  placeholder: PropTypes.string
};

export default withStyles(styles)(GlobalNavbar);
