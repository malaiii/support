export default theme => ({
    paper: {
        padding: theme.spacing.unit * 2
    },
    headerWrapper: {
        display: "flex",
        padding: "0 0 16px"
    },
    header: {
        width: "calc(100% - 24px)",
        textAlign: "left"
    },
    expansionIconWrapper: {
        width: "24px",
        display: "flex",
        alignItems: "center",
    },
    expansionIcon: {
        cursor: "pointer"
    },
    modal: {
        margin: "64px 24px",
        height: "calc(100vh - 88px)",
        background: "#fff",
        maxHeight: "100vh",
        overflow: "hidden",
        overflowY: "scroll",
    },
    tileHeader: {
        color: theme.palette.grey[500]
    },
    dinProBold: {
        fontFamily: "DinProBold"
    },
    flexGrid: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rightHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    tileHeight: {
        minHeight: "630px"
    }
})