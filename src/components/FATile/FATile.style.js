export default theme => ({
  radioSearchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  autoSuggest: {
    width: 250,
    marginRight: 41,
    fontFamily: [
      'OpenSansRegular',
      'sans-serif'
    ],
    fontSize: 14,
    textAlign: 'left'
  },
  title: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    paddingLeft: '40px',
    textAlign: 'left',
    textTransform: 'uppercase'
  },
  greenKnockout: {
    backgroundColor: '#79A3A7',
    color: '#fff',
    padding: '4px 3px 2px 3px',
    fontWeight: 'bold',
    borderRadius: '2px',
    fontSize: '0.9rem',
    textTransform: 'uppercase'
  },
  company: {
    textDecoration: 'underline'
  },
  exportBtn: {
  width: '32px',
  color: '#fff',
  height: '32px',
  float: 'right',
  top: '26px',
  position: 'relative',
  right: '37px'
  }
})