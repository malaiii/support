import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './GlobalNavbar.styles';
class GlobalNavbar extends Component {
  render() {
    const {
      classes,
      user
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
            <Typography
              data-test="app-label"
              className={`${classes.text} ${classes.kcLabel}`}
              variant="h4"
              color="inherit"
            >
              {user}
            </Typography>

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

GlobalNavbar.propTypes = {
  user: PropTypes.string
};

export default withStyles(styles)(GlobalNavbar);
