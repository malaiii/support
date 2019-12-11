import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import styles from './Header.styles'

const Header = props => {
  const { classes, children, title } = props

  return (
    <div data-test="header-container">
      <AppBar data-test="app-bar"
        position="fixed"
        classes={{
          root: classes.root
        }}>
        <Toolbar data-test="toolbar" className={classes.toolbar}>
          <Typography data-test="header-label"
            className={classes.title}
            variant="h5"
            color="inherit">{title}</Typography>

          {children}

        </Toolbar>
      </AppBar>
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

export default withStyles(styles)(Header)
