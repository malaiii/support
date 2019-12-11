export default theme => ({
  name: {
    color: "white",
    marginLeft: "10px",
    marginRight: "5px"
  },
  avatar: {
    width: '32px',
    height: '32px',
    fontSize: '18px',
    color: '#fff',
    backgroundColor: '#673ab7',
  },
  avatarMenu: {
    display: 'flex',
    alignItems: "center"
  },
  arrowUp: {
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderBottom: '8px solid white'
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '8px solid white'
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  logo: {
    height: '100%'
  },
  menuItemText: {
    textDecoration: 'underline'
  },
  menu: {

  }

})