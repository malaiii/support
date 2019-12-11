export default theme => ({
  container: {
    position: 'relative'
  },
  line: {
    strokeWidth: 2,
    opacity: 0.5,
    fill: theme.palette.gold[300],
  },
  band: {
    opacity: 0,
    '&:hover': {
      opacity: 1
    }
  },
  bandRect: {
    opacity: 0
  },
  bandLine: {
    strokeWidth: 1,
    stroke: theme.palette.grey[400]
  },
  tooltip: {
    position: 'fixed',
    fontSize: theme.typography.pxToRem(16)
  },
  tooltipText: {
    fontSize: theme.typography.pxToRem(12)
  },
  legendContainer: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)'
  },
  legendItem: {
    margin: '0 10px'
  },
  legendLabel: {
    fontSize: 12,
    color: theme.palette.grey[600]
  },
  legendLine: {
    marginLeft: 5,
    width: 20,
    height: 3,
    transform: 'translateY(-50%)'
  },
  inlineBlock: {
    display: 'inline-block'
  },
  xAxis: {
    color: theme.palette.grey[600]
  },
  yAxis: {
    color: theme.palette.grey[600]
  }
})