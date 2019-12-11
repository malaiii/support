import React from 'react'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import KPI from '../KPI/KPI'
import styles from './KPITile.style'

const KPITile = props => {
  const { data, classes, hideBorder } = props
  const { kpis } = data
  const colorMapping = new Map()

  colorMapping.set("GROSS SALES", "#79A3A7");
  colorMapping.set("LOT DEPLETION", "#922437");
  colorMapping.set("AGED OFF", "#e67c84");
  colorMapping.set("COMMISSION EARNED", "#333333");


  return (
    <Grid container justify="space-between" alignItems="center" className={hideBorder ? classes.noBorder : classes.border}>
      {kpis.map(kpi => (
        <KPI key={kpi.name} label={kpi.label} subLabel={kpi.subLabel != undefined ? kpi.subLabel : ''} value={kpi.value} color={colorMapping.get(kpi.name)}></KPI>
      ))}
    </Grid>
  )

}


export default withStyles(styles, { withTheme: true })(KPITile)