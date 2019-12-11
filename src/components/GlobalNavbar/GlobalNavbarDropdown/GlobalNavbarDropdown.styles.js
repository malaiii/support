export default theme => ({
  toggleButton: {
    marginLeft: 20,
    cursor: 'pointer'
  },
  gridListContainer: {
    position: 'fixed',
    top: 40,
    left: 0,
    padding: '0 24px',
    width: '100%',
    height: 'calc(100% - 40px)',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: 'black'
  },
  gridList: {
    width: '90%',
    height: '500px'
  },
  appGroup: {
    marginTop: 40
  },
  appLink: {
    color: '#C8D2BF',
    textDecoration: 'none'
  },
  appLabel: {
    paddingLeft: 20,
    borderLeft: `3px solid ${theme.palette.primary[500]}`,
    textTransform: 'uppercase',
  },
  subAppLabel: {
    marginTop: 20,
    paddingLeft: 23
  }
})