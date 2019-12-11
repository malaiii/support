import React from "react";
import { withStyles } from "@material-ui/core/styles";

import ExpansionTileContainer from "../../containers/expansionTileContainer";
import MetricsTile from '../MetricsTile/MetricsTile'
import style from "./IncentiveMetrics.style.js";

const tileDetails = {
    tileName: "INCENTIVE METRICS",
    tileId: "incentiveMetrics"
}

class IncentiveMetrics extends React.PureComponent {

    moveArrayElements = (metricsData, selectedRM) => {
        let filteredIndex = metricsData.findIndex(x => x.code == selectedRM);
        if (filteredIndex == -1)
            return 0;
        else if (filteredIndex < metricsData.length - 10)
            return filteredIndex < 3 ? filteredIndex : filteredIndex - 3;
        else
            return metricsData.length - 10;
    }

    renderSummary = () => {
        const { metricsData, selectedRM } = this.props;
        const { tileId } = tileDetails;
        const slicePosition = selectedRM && metricsData.length > 0 ? this.moveArrayElements(JSON.parse(JSON.stringify(metricsData)), selectedRM) : [];
        return <div>
            <MetricsTile
                data={{
                    metricsSummary: metricsData.slice(slicePosition, slicePosition + 10),
                    metricsExpanded: metricsData
                }}
                selectedRM={selectedRM}
                collapsed={true}
                showSummary={true}
                tileId={tileId}
            />
        </div>
    }

    renderDetails = () => {
        const { metricsData, selectedRM } = this.props;
        const { tileId } = tileDetails;
        const { trendTileWrapper } = this.props.classes;

        return <div className={trendTileWrapper}>
            <MetricsTile
                data={{
                    metricsExpanded: metricsData
                }}
                selectedRM={selectedRM}
                collapsed={false}
                showSummary={true}
                tileId={tileId}
            />
        </div>
    }

    render() {
        const { tileName, tileId } = tileDetails;

        return <ExpansionTileContainer
            tileId={tileId}
            collapsedTileTitle={tileName}
            summary={this.renderSummary()}
            details={this.renderDetails()}
        />
    }
}

/**
 * @exports IncentiveMetrics
 */
export default withStyles(style, { withTheme: true })(IncentiveMetrics)