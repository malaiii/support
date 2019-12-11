import React, { Component } from 'react'
import LineChart from '../LineChart/LineChart'
import RadioPanel from '../RadioPanel/RadioPanel'
import Table from '../Table/Table'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import style from './OverviewTile.style'

class OverviewTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewName: "chart",
      radioGroup: [
        { value: "chart", label: "Chart" },
        { value: "table", label: "Table" }
      ]
    }

  }
  onViewChange = (viewName) => {
    this.setState({ viewName });
  }

  render() {
    const { theme, data } = this.props
    const { viewName, radioGroup } = this.state
    return (
      <Grid container>
        <Grid item style={{ padding: '0px 0px 0px 40px' }} xs={12}>
          <RadioPanel defaultValue={"chart"} radioGroup={radioGroup} onClick={this.onViewChange} />
        </Grid>
        {(viewName == "chart") ?
          <Grid item xs={12}>
            <LineChart
              lines={[
                {
                  data: data.GROSS_FLOWS_MONTHLY_EXISTING,
                  label: 'Current Lot Balance',
                  color: theme.palette.gold[500],
                },
              ]}
              height={450}
              dataPoints={true} />
          </Grid> :
          <Grid item xs={12}>
            <Table data={data.GROSS_FLOWS_MONTHLY_EXISTING} />
          </Grid>}
      </Grid>
    );
  }
}
export default withStyles(style, { withTheme: true })(OverviewTile)