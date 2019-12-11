import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import styles from './KPI.style'

const KPI = props => {
  const { classes } = props

  return (
    <div data-test="kpi-container" className={classes.kpiContainer}>
      <Typography data-test="label"
        className={classes.label}
        variant="caption">{props.label}</Typography>
      {props.subLabel &&
        <Typography data-test="label"
          className={classes.label}
          variant="caption">{props.subLabel}</Typography>
      }
      <Typography data-test="value"
        className={classes.value} style={{ color: props.color }}
        variant="body1">{props.value}</Typography>
    </div>
  )
}

KPI.propTypes = {
  label: PropTypes.string
}

export default withStyles(styles)(KPI)