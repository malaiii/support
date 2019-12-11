import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Avatar,
  Typography,
  MenuItem,
  Popover
} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import style from './AvatarMenu.style';
import lockIcon from '../../../public/images/png/lock_u6.png';
import mailIcon from '../../../public/images/png/u10.png';

class AvatarMenu extends Component {
  state = {
    user: {
      username: ''
    },
    anchorEl: null
  };
  handleDropdown = evt => {
    this.setState({
      anchorEl: evt.currentTarget
    });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  componentDidMount() {
    let userObj = localStorage.getItem('user');
    if (userObj !== undefined && userObj !== null && userObj !== '') {
      let user = JSON.parse(atob(userObj));
      this.setState({ user });
    }
  }

  render() {
    const { classes } = this.props;
    const { user, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const abbrName =
      user && user.firstName
        ? `${getAbbreviatedName(user.firstName) +
        getAbbreviatedName(user.lastName)}`
        : '';
    const openClass = open ? classes.arrowUp : classes.arrowDown;
    return (
      <React.Fragment>
        <div className={classes.avatarMenu}>
          <Button
            disabled={true}
            data-test="component-button"
            onClick={this.handleDropdown}
          >
            <Avatar className={classes.avatar}>{abbrName}</Avatar>

            <Typography component="span" className={classes.name}>
              {user.firstName || 'User'}
            </Typography>
            {this.props.disabled ? <div className={openClass} /> : null}
          </Button>

          <Popover
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            onClose={this.handleClose}
            autoHeight={true}
          >
            <MenuItem onClick={this.handleClose} className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <img data-test="logo" className={classes.logo} src={lockIcon} />
              </ListItemIcon>
              <Typography
                style={{ whiteSpace: 'normal' }}
                className={classes.menuItemText}
              >
                Freeze April 2019 Commissions{' '}
              </Typography>
            </MenuItem>
            <MenuItem onClick={this.handleClose} className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <img data-test="logo" className={classes.logo} src={mailIcon} />
              </ListItemIcon>
              <Typography
                style={{ whiteSpace: 'normal' }}
                className={classes.menuItemText}
              >
                Download & Append April 2019
                <br />
                Commissions to Email
              </Typography>
            </MenuItem>
          </Popover>
        </div>
      </React.Fragment>
    );
  }
}

const getAbbreviatedName = name => {
  return name.charAt(0);
};

export default withStyles(style, { withTheme: true })(AvatarMenu);
