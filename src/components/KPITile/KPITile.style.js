export default theme => ({
  paper: {
    padding: theme.spacing.unit * 2
  },
  divider: {
    margin: 'auto',
    height: 80,
    width: 1,
    borderLeft: `1px solid ${theme.palette.grey[300]}`
  },
  border: {
    border: '1px solid lightgray',
    padding: '24px 60px 24px 60px',
    borderRadius: '3px'
  },
  noBorder: {
    border: "none",
    padding: "0 0 16px 0",
  }
})