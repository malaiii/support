import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Tooltip, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import style from './LineChart.style'

import { extent } from 'd3-array'
import { select } from 'd3-selection'
import { format } from 'd3-format'
import { scalePoint, scaleLinear, scaleBand } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
import { area } from 'd3-shape'
import { nest } from 'd3-collection'
import moment from 'moment'

import './LineChart.css'

class LineChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 0,
      axisWidth: this.props.showAxes ? 45 : 0,
      axisHeight: this.props.showAxes ? 20 : 0,
      plotPadding: 5,
      tooltipOpen: false,
      tooltipLeft: 3,
      tooltipTop: 3
    }

    this.renderChart = this.renderChart.bind(this)
    this.setChartWidth = this.setChartWidth.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.setChartWidth)
    this.setChartWidth()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setChartWidth)
  }

  setChartWidth() {
    this.setState({
      width: this.node.getBoundingClientRect().width
    })
  }

  componentDidUpdate() {
    this.renderChart()
  }

  renderChart() {
    const { width, axisWidth, axisHeight, plotPadding } = this.state
    const { classes, lines, height } = this.props

    const svg = select(this.node)
    const xDomain = [].concat.apply([], lines.map(line => (
      line.data.map(d => d.calendar_date)
    )))

    const xScale = scalePoint()
      .domain(xDomain)
      .range([plotPadding, width - axisWidth - plotPadding])

    const xScaleBand = scaleBand()
      .domain(xDomain)
      .range([plotPadding - xScale.step() / 2, width - axisWidth - plotPadding + xScale.step() / 2])

    const yScale = scaleLinear()
      .domain(extent([].concat.apply([], lines.map(line => (
        line.data.map(d => d.current_lot_balance)
      )))))
      .range([height - axisHeight - plotPadding, plotPadding])


    /* ================================
        Line Group
    ================================ */
    const plotG = svg.select('.plot-g')

    const lineGroupData = plotG.selectAll('.line-group')
      .data(lines)

    const lineGroupEnter = lineGroupData
      .enter()
      .append('g')
      .attr('class', `line-group`)
      .attr('data-test', 'line-group')

    const lineGroupMerge = lineGroupEnter.merge(lineGroupData)

    lineGroupData.exit().remove()


    /* ================================
        Line
    ================================ */
    const lineGen = area()
      .x(d => xScale(d.calendar_date))
      .y0(height - axisHeight - plotPadding)
      .y1(d => yScale(d.current_lot_balance))

    const lineData = lineGroupMerge.selectAll('.line')
      .data(d => [d])

    lineData
      .enter()
      .append('path')
      .attr('class', `line ${classes.line}`)
      .merge(lineData)
      .attr('d', d => lineGen(d.data))
      .style('stroke', d => d.color)
      .style('fill', d => d.fill)

    lineData.exit().remove()


    /* ================================
        Points
    ================================ */
    const pointData = lineGroupMerge.selectAll('.point')
      .data(d => d.data.map(point => ({
        ...point,
        color: d.color
      }))
      )

    pointData
      .enter()
      .append('circle')
      .attr('class', `point`)
      .attr('r', 3)
      .merge(pointData)
      .attr('cx', d => xScale(d.calendar_date))
      .attr('cy', d => yScale(d.current_lot_balance))
      .style('fill', d => d.color)

    pointData.exit().remove();

    /* ================================
        Hover Bands
    ================================ */
    const flattenedData = [].concat.apply([], lines.map(line => (
      line.data.map(data => ({
        ...data,
        label: line.label
      }))
    )))

    const monthNestedData = nest()
      .key(d => d.calendar_date)
      .rollup(lvs => lvs)
      .entries(flattenedData)

    const bandData = plotG.selectAll('.band')
      .data(monthNestedData)

    const self = this
    const bandEnter = bandData
      .enter()
      .append('g')
      .attr('class', `band ${classes.band}`)
      .on('mouseover', function (d) {
        const { left, top, width } = this.getBoundingClientRect()

        self.setState({
          tooltipOpen: true,
          tooltipLeft: left + (width / 2),
          tooltipTop: top,
          tooltipTitle: (
            <div>
              <div className={classes.tooltipText}><b>{moment(d.key).format('L')}</b></div>
              {d.value.map(value => (
                <div key={value.label} className={classes.tooltipText}>
                  {value.label}: <b>{format('$.3s')(value.current_lot_balance).replace(/G/, 'B')}</b><br />
                  Gross Sales: <b> {format('$.3s')(value.gross_sales).replace(/G/, 'B')}</b><br />
                  Lot Depletion:<b> {format('$.3s')(value.lot_depletion).replace(/G/, 'B')}</b><br />
                  Aged Off: <b>{format('$.3s')(value.aged_off).replace(/G/, 'B')}</b><br />
                  Commission Earned: <b>{format('$,.2f')(value.commission_earned)}</b>
                </div>
              ))}
            </div>
          )
        })
      })
      .on('mouseout', function () {
        self.setState({ tooltipOpen: false })
      })

    const bandUpdate = bandEnter.merge(bandData)

    bandData.exit().remove()


    const bandRectData = bandUpdate.selectAll('.band-rect')
      .data(d => [d])

    bandRectData
      .enter()
      .append('rect')
      .attr('class', `band-rect ${classes.bandRect}`)
      .merge(bandRectData)
      .attr('x', d => xScaleBand(d.key))
      .attr('y', 0)
      .attr('width', xScaleBand.bandwidth())
      .attr('height', yScale.range()[0])


    const bandLineData = bandUpdate.selectAll('.band-line')
      .data(d => [d])

    bandLineData
      .enter()
      .append('line')
      .attr('class', `band-line ${classes.bandLine}`)
      .merge(bandLineData)
      .attr('x1', d => xScale(d.key))
      .attr('y1', yScale.range()[1])
      .attr('x2', d => xScale(d.key))
      .attr('y2', yScale.range()[0])


    /* ================================
        Axes
    ================================ */
    const xAxisG = svg.select('.x-axis-g')
    const yAxisG = svg.select('.y-axis-g')

    const xAxisTickValues = [xScale.domain()[0], xScale.domain()[xScale.domain().length - 1]]
    const xAxis = axisBottom(xScale)
      .tickSize(2)
      .tickValues(xScale.domain().length ? xAxisTickValues : null)

    const yAxis = axisLeft(yScale)
      .tickSizeOuter(0)
      .tickSizeInner(-(width - axisWidth))
      .ticks(4)
      .tickFormat(d => format('$.4s')(d).replace(/G/, 'B'))


    xAxisG.call(xAxis)
    // .style('color', theme.palette.grey[600])

    yAxisG.call(yAxis)
    // .style('color', theme.palette.grey[600])
  }

  render() {
    const { axisWidth, axisHeight, tooltipOpen, tooltipTop, tooltipLeft } = this.state
    const { classes, height, showAxes, lines } = this.props

    return (
      <div data-test="container"
        ref={node => this.containerNode = node}
        className={`line-chart-container ${classes.container}`}>
        <svg data-test="svg"
          className="line-chart"
          width="100%"
          height={height}
          ref={node => this.node = node}>
          {showAxes ?
            <g data-test="x-axis"
              className={`x-axis-g axis ${classes.xAxis}`}
              transform={`translate(${axisWidth}, ${height - axisHeight})`}></g> :
            null}
          {showAxes ?
            <g data-test="y-axis"
              className={`y-axis-g axis ${classes.xAxis}`}
              transform={`translate(${axisWidth}, 0)`}></g> :
            null}
          <g data-test="plot"
            className="plot-g" transform={`translate(${axisWidth}, 0)`}></g>
        </svg>

        <div data-test="legend"
          className={`${classes.legendContainer}`}>
          {lines.map((line, i) => (
            <div data-test="legend-item"
              key={i}
              className={`${classes.legendItem} ${classes.inlineBlock}`}>
              <Typography data-test="legend-label"
                className={`${classes.legendLabel} ${classes.inlineBlock}`}
                variant="body2">{line.label}</Typography>
              <div data-test="legend-line"
                className={`${classes.legendLine} ${classes.inlineBlock}`}
                style={{
                  backgroundColor: line.color,
                }}></div>
            </div>
          ))}
        </div>

        {tooltipOpen ?
          <Tooltip data-test="tooltip"
            open
            title={this.state.tooltipTitle}
            disableFocusListener disableTouchListener
            placement="right-start">
            <div
              className={classes.tooltip}
              style={{
                top: `${tooltipTop}px`,
                left: `${tooltipLeft}px`,
              }} />
          </Tooltip> :
          null}
      </div>
    )
  }
}

LineChart.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      calendar_date: PropTypes.string,
      value: PropTypes.number
    })),
    color: PropTypes.string
  })).isRequired,
  dataPoints: PropTypes.bool,
  showAxes: PropTypes.bool
}

LineChart.defaultProps = {
  dataPoints: false,
  showAxes: true
}

export default withStyles(style, { withTheme: true })(LineChart)