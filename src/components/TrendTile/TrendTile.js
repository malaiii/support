import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { format } from 'd3-format'
import style from './TrendTile.style'
import KPITile from '../KPITile/KPITile'
import OverviewTile from '../OverviewTile/OverviewTile'
import ButtonPanel from '../ButtonPanel/ButtonPanel'
import FATile from '../FATile/FATile'


class TrendTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedView: 'OVERVIEW',
      buttons: [
        { name: "OVERVIEW", label: "OVERVIEW" },
        { name: "ADVISOR/FIRM", label: "ADVISOR/FIRM" },
      ]
    }
  }
  onSelectView = (name) => {
    this.setState({
      selectedView: name
    })
  }
  render() {
    const { theme, data, ACCOUNT_KPIS } = this.props
    const ACCOUNT_KPIS_FORMATTED = formatAccountKPIs(ACCOUNT_KPIS.data)
    const { selectedView } = this.state
    return (
      <div data-test="component-trend-tile">
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <KPITile item style={{ padding: '0px 0px 0px 40px' }} data={{
              kpis: ACCOUNT_KPIS_FORMATTED,
            }} />
          </Grid>
          {(selectedView == "OVERVIEW") ?
            <Grid item xs={12}>
              <OverviewTile data={data} />
            </Grid> :
            <Grid item xs={12}>
              <FATile advisorData={data} />
            </Grid>
          }
          <Grid item xs={12}>
            <ButtonPanel
              buttons={this.state.buttons}
              initialSelections={['OVERVIEW']}
              onClick={this.onSelectView}
              style={{
                // marginTop: 20,
                width: '20%',
                height: 25,
                paddingTop: 5,
                paddingBottom: 5,
                border: `1px solid ${theme.palette.grey[300]}`
              }} />
          </Grid>
        </Grid>
      </div>
    )
  }
}
TrendTile.propTypes = {
  data: PropTypes.shape({
    GROSS_FLOWS_MONTHLY_EXISTING: PropTypes.array
  }).isRequired
}

function formatAccountKPIs(kpis) {
  return kpis.map(kpi => ({
    ...kpi,
    label: kpi.name.toUpperCase(),
    value: format('($,.0f')(kpi.value),
    color: kpi.value > 0 ?
      "#424242" :
      "#DE505A"
  }))
}
export default withStyles(style, { withTheme: true })(TrendTile)