import React from "react";
import { withStyles } from "@material-ui/core/styles";

import ExpansionTileContainer from "../../containers/expansionTileContainer";
import MetricsTile from '../MetricsTile/MetricsTile'
import style from "./EngagementMetrics.style.js";

const tileDetails = {
    tileName: "AC ENGAGEMENT METRICS",
    tileId: "engagementMetrics"
}

class EngagementMetrics extends React.PureComponent {

    renderSummary = () => {
        const { metricsData } = this.props;
        const { tileId } = tileDetails;

        return <div>
            <MetricsTile
                data={{
                    metricsSummary: metricsData.slice(0, 10),
                    metricsExpanded: metricsData
                }}
                collapsed={true}
                showSummary={false}
                tileId={tileId}
            />
        </div>
    }

    renderDetails = () => {
        const { classes, metricsData } = this.props;
        const { tileId } = tileDetails;
        const { trendTileWrapper } = classes;

        return <div className={trendTileWrapper}>
            <MetricsTile
                data={{
                    metricsExpanded: metricsData
                }}
                collapsed={false}
                showSummary={false}
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
 * @exports EngagementMetrics
 */
export default withStyles(style, { withTheme: true })(EngagementMetrics)