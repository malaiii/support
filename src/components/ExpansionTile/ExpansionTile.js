import React from "react";
import { Grid, Paper, Typography } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

import expandIcon from "../../../public/images/png/expand.png";
import collapseIcon from "../../../public/images/png/collapse.png";
import style from "./ExpansionTile.style";

/**
 * @description - This component is used to create the expansion-tiles that can be expanded to full-size of the viewport and vice-versa.
 *
 * @props tileTitle - Component that gets rendered at the header of the tile in collapsed state.
 * @props expandedHeader - Component that gets rendered at the header of the tile in expanded state.
 * @props summary - Component that gets rendered at the body section of the tile in collapsed state.
 * @props details - Component that gets rendered at the body section of the tile in expanded state.
 * @props tileColumnSize - A number between 1 to 12 that tells the number of grid columns needs to be given to the tile. By default it is "6".
 * @props tileId - Unique string ID that will be used to identify the expanded tile.
 */
class ExpansionTile extends React.PureComponent {
    state = {
        isExpanded: false,
    }

    /**
     * @description - This method is used to toggle between the state of the tile i.e. Collapsed/Expanded.
     * Also it sets the "expandedTileId" equals to "tileId" into the store on expansion and clears it on collapse.
     */
    toggleTitleHandler = () => {
        const { onExpansionTileToggle, tileId, onTileExpand, onTileCollapse } = this.props;
        if (this.state.isExpanded) {
            onExpansionTileToggle(null);
            this.invokeCallback(onTileCollapse);
        } else {
            onExpansionTileToggle(tileId);
            this.invokeCallback(onTileExpand);
        }
        this.setState(prevState => {
            return { isExpanded: !prevState.isExpanded }
        });
    }

    // Invoke the callback function on expanding/collapsing the tile.
    invokeCallback = (callback) => {
        if (callback && typeof callback === "function") {
            callback(this.props.tileId);
        }
    }

    /**
     * @description - This method is used to render the different components of the tile (Header, Toggle Icon, Tile Body ).
     *
     * @prop {React-Component} tileTitle - Component that needs to be rendered at the header of the tile.
     * @prop {Image} toggleIcon - Image that needs to be shown on the toggle link.
     * @prop {React-Component} bodyComponent - Component that needs to be rendered at the body of the tile.
     * @prop {Number} tileColumnSize - The coulmn size that should be given to the tile from Grid's 12 columns.
     *
     * @returns {React-Component} - It returns the constructed tile.
     */
    renderTile = (tileTitle, toggleIcon, bodyComponent, headerComponent) => {
        const { paper, headerWrapper, header, expansionIconWrapper, expansionIcon, tileHeader, dinProBold, flexGrid, tileHeight, rightHeader } = this.props.classes;

        return <Grid item sm={12} md={this.state.isExpanded ? 12 : this.props.tileColumnSize || 6} >
            <Paper className={`${paper} ${!this.state.isExpanded && tileHeight}`} >
                <div className={headerWrapper}>
                    <div className={`${header} ${flexGrid}`}>
                        <Typography className={`${tileHeader} ${dinProBold}`} variant="body1" align="left">
                            {tileTitle}
                        </Typography>
                        <div className={rightHeader}>
                            {headerComponent}
                        </div>
                    </div>
                    <div className={expansionIconWrapper} >
                        <img src={toggleIcon} className={expansionIcon} onClick={this.toggleTitleHandler} />
                    </div>
                </div>
                {bodyComponent}
            </Paper>
        </Grid>
    }


    render() {
        const { isExpanded } = this.state;
        const { expandedTileTitle, collapsedTileTitle, expandedHeader, collaspedHeader, summary, details, tileId, expandedTileId } = this.props;

        const tileTitle = expandedTileTitle && this.state.isExpanded ? expandedTileTitle : collapsedTileTitle;

        return <>
            {
                !isExpanded && !expandedTileId
                    ? this.renderTile(tileTitle, expandIcon, summary, collaspedHeader) // Collapsed
                    : (tileId === expandedTileId) ? this.renderTile(tileTitle, collapseIcon, details, expandedHeader) : null // Expanded
            }
        </>
    }
}

/**
 * @exports ExpansionTile.
 */
export default withStyles(style, { withTheme: true })(ExpansionTile)