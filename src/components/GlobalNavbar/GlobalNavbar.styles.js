export default theme => ({
  root: {
    boxShadow: "none",
    minHeight: 40
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[900]
  },
  toolbarRoot: {
    height: 40,
    minHeight: 0
  },
  logo: {
    height: '100%'
  },
  spacer: {
    margin: "0 24px",
    width: 3,
    height: 20,
    backgroundColor: theme.palette.primary.main
  },
  text: {
    textTransform: "uppercase"
  },
  kcLabel: {
    marginLeft: 24
  },
  avatar: {
    boxSizing: "border-box",
    display: "flex",
    paddingLeft: "20px",
    alignItems: "center"
  },
  typography: {
    color: "white",
    // paddingTop: "20px",
    paddingLeft: "5px"
  },
  autoSuggest: {
    width: 200,
    marginRight: 10,
    fontFamily: [
      'DinProRegular',
      'sans-serif'
    ],
    fontSize: 14
  },
  avatarSearch: {
    position: "absolute",
    right: 20,
    display: 'flex',
    alignItems: 'center'
  },
  control: {
    'height': '26',
    'min-height': '26',
    'border-radius': 'unset'
  }
})