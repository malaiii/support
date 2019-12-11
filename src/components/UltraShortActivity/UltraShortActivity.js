import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { format } from "d3-format";

import style from "./UltraShortActivity.style";
import ExpansionTileContainer from "../../containers/expansionTileContainer";
import KPITile from "../KPITile/KPITile";
import LineChart from "../LineChart/LineChart";
import TrendTile from '../TrendTile/TrendTile';
import buttons from '../../../__mocks__/buttonPanel.json';
import ButtonPanel from '../ButtonPanel/ButtonPanel';
import DateRangePickerWrapper from '../DateRangePickerWrapper/DateRangePickerWrapper';

/**
 * @description - This is the main component that assembles the header, summary and details sections for "Ultra Short Activity" tile.
 */
class UltraShortActivity extends React.PureComponent {

    formatAccountKPIs = (kpis) => {
        return kpis.map(kpi => ({
            ...kpi,
            label: kpi.name.toUpperCase(),
            value: format('($,.0f')(kpi.value),
            color: kpi.value > 0 ?
                "#424242" :
                "#DE505A"
        }))
    }

    spliceAccountKPIs = (accountKpis) => {
        const allowedKPIs = ["GROSS SALES", "COMMISSION EARNED", "CURRENT LOT BALANCE"];
        if (accountKpis && Array.isArray(accountKpis) && accountKpis.length) {
            return (accountKpis).filter(item => allowedKPIs.indexOf(item.name) > -1);
        }
        return [];
    }

    renderSummary = () => {
        const { trendTileData, theme } = this.props;
        const { FTYD_COMMISSION, FYTD_ACCOUNT_KPIS } = trendTileData;

        if (!FTYD_COMMISSION || !FYTD_ACCOUNT_KPIS) {
            return null;
        }

        const KPIsData = [...FYTD_ACCOUNT_KPIS.data];
        const FYTD_ACCOUNT_KPIS_FORMATTED = this.formatAccountKPIs(this.spliceAccountKPIs(KPIsData));

        return <>
            <Grid item md={12}>
                <KPITile item hideBorder={true} data={{
                    kpis: FYTD_ACCOUNT_KPIS_FORMATTED,
                }} />
            </Grid>
            <LineChart
                lines={[
                    {
                        data: FTYD_COMMISSION.data,
                        label: "Current Lot Balance",
                        color: theme.palette.gold[500],
                    },
                ]}
                height={450}
                dataPoints={true}
            />
        </>
    }

    renderDetails = () => {
        const { GROSS_FLOWS_MONTHLY_EXISTING, ACCOUNT_KPIS, ADVISOR, FIRM } = this.props.trendTileData;
        const { trendTileWrapper } = this.props.classes;

        return <div className={trendTileWrapper}>
            <TrendTile
                data={{
                    GROSS_FLOWS_MONTHLY_EXISTING: GROSS_FLOWS_MONTHLY_EXISTING.data,
                    ADVISOR: ADVISOR.data,
                    FIRM: FIRM.data
                }}
                ACCOUNT_KPIS={ACCOUNT_KPIS}
            />
        </div>
    }

    renderExpandedHeader = () => {
        const { isDeselected, theme, dateReducer, onChangeDate, onDateSelect } = this.props;

        const selectedColor = theme.palette.primary[700];
        const unselectedColor = theme.palette.primary[300];
        return <>
            <ButtonPanel
                buttons={buttons}
                isDeselected={isDeselected}
                initialSelections={isDeselected ? [] : ['fytd']}
                onClick={onChangeDate}
                selectedColor={selectedColor}
                unselectedColor={unselectedColor}
            />
            <DateRangePickerWrapper
                startDate={dateReducer.startDate}
                endDate={dateReducer.endDate}
                onDateSelect={onDateSelect}
            />
        </>
    }


    render() {
        const { onTileExpand, onTileCollapse } = this.props;

        return <ExpansionTileContainer
            onTileCollapse={onTileCollapse}
            onTileExpand={onTileExpand}
            tileId="ultraStortActivity"
            collapsedTileTitle="ULTRA SHORT ACTIVITY (FYTD)"
            expandedTileTitle="ULTRA SHORT ACTIVITY"
            expandedHeader={this.renderExpandedHeader()}
            summary={this.renderSummary()}
            details={this.renderDetails()}
        />
    }
}

/**
 * @exports UltraShortActivity
 */
export default withStyles(style, { withTheme: true })(UltraShortActivity) 