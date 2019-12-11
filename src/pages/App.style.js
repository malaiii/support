export default theme => ({
  multiSelect: {
    position: 'absolute',
    right: 615
  },
  content: {
    marginTop: 40,
    padding: `${theme.spacing.unit * 3}px`,
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden'
  },
  paper: {
    padding: theme.spacing.unit * 2
  },
  showCell: {
    background: 'white',
    borderLeft: {
      width: '1px',
      style: 'solid',
      color: 'lightgrey'
    },
    borderRight: {
      width: 1,
      style: 'solid',
      color: 'lightgrey'
    },
    borderBottom: {
      width: 1,
      style: 'solid',
      color: 'lightgrey'
    },
  },

  showClientName: {
    fontWeight: 'bold'
  },

  showClientProperties: {
    fontStyle: 'italic'
  },

  gridPostion: {
    alignItems: 'center'
  },

  alignRight: {
    textAlign: 'right'
  },

  alignLeft: {
    textAlign: 'left'
  },

  viewButtonsList: {
    textAlign: 'left',
    padding: '0px 8px 20px'
  },
  tileTitle: {
    color: theme.palette.grey[500]
  },
  DinProBold: {
    fontFamily: "DinProBold"
  },
  tilePadding: {
    padding: '0px 0px 0px 40px'
  }
});