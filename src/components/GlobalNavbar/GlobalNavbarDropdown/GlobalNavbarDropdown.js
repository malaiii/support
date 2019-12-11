import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { GridList, GridListTile, Typography } from '@material-ui/core'
// import globalAppList from '../../../../__mocks__/globalAppList.json'
import styles from './GlobalNavbarDropdown.styles'


class GlobalNavbarDropdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }

    this.handleDropdown = this.handleDropdown.bind(this)
  }

  handleDropdown() {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const { classes, globalAppList } = this.props
    const { open } = this.state

    return (
      <div data-test="dropdown-container">
        <span
          data-test="toggle"
          className={ `icon-dropdown-black ${classes.toggleButton}` }
          onClick={ this.handleDropdown }
        />

        { open ? <div data-test="grid-list-container" className={ classes.gridListContainer }>
          <GridList data-test="grid-list" cellHeight={ 300 } className={ classes.gridList }>

            { globalAppList.map((tile, i) =>
              <GridListTile data-test="grid-list-tile" key={ i } cols={ 1 }>

                { tile.tileContent.map(app =>
                  <div key={ app.name } className={ classes.appGroup }>

                    <a data-test="app-link" className={ classes.appLink } href={ app.url } target="_blank">
                      <Typography data-test="app-label"
                        className={ classes.appLabel }
                        variant="h6"
                        color="inherit">{ app.name }</Typography>
                    </a>

                    { app.subApps.map(subApp =>
                      <a data-test="sub-app-link"
                        key={ subApp.name }
                        className={ classes.appLink }
                        href={ subApp.url }
                        target="_blank">
                        <Typography data-test="sub-app-label"
                          className={ classes.subAppLabel }
                          variant="body2"
                          color="inherit">{ subApp.name }</Typography>
                      </a>
                    ) }

                  </div>
                ) }

              </GridListTile>
            ) }

          </GridList>
        </div> : null }
      </div>
    )
  }
}

GlobalNavbarDropdown.propTypes = {
  globalAppList: PropTypes.array.isRequired
}

export default withStyles(styles)(GlobalNavbarDropdown)