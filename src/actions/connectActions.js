import { actions as dataActions } from './dataActions'

export const actionTypes = {
  DATA_CONNECT: 'DATA_CONNECT',
  DATA_CONNECTING: 'DATA_CONNECTING'
}


export const dataSources = [
  { name: 'RM', endpoint: '/api/v1/people' },
  { name: 'ACCOUNT_KPIS', endpoint: '/api/v1/summary?startDate=01/01/2019&endDate=03/01/2019&rmCode=Adam,%20Lowe' },
  { name: 'ADVISOR', endpoint: '/api/v1/financialadvisor?startDate=01/01/2019&endDate=03/01/2019&rmCode=Adam,%20Lowe' },
  { name: 'GROSS_FLOWS_MONTHLY_EXISTING', endpoint: '/api/v1/daily?startDate=01/01/2019&endDate=03/01/2019&rmCode=Adam,%20Lowe' },
  { name: 'FIRM', endpoint: '/api/v1/firm?startDate=01/01/2019&endDate=03/01/2019&rmName=Adam,%20Lowe' },
  { name: 'METRICSDETAILS', endpoint: '/api/v1/incentive-metrics' },
  { name: 'EXPERIENCE_METRICS', endpoint: '/api/v1/experience-metrics' },
  { name: 'ENGAGEMENTMETRICS', endpoint: '/api/v1/engagement-metrics' }
]

function dataConnect() {
  return dispatch => {
    dataConnecting(true)

    dataSources.forEach(dataSource => {
      dispatch(dataActions.fetchData(dataSource))
    })
  }
}

function getListOfRM() {
  let endpoint = '/api/v1/people'
  let dataSource = { name: "RM", endpoint }
  return dispatch => {
    dataConnecting(true);
    dispatch(dataActions.fetchData(dataSource));
  }

}
function dataConnecting(connecting) {
  return {
    type: actionTypes.DATA_CONNECTING,
    payload: connecting
  }
}
function getDates(asOfDate) {
  let endpoint = `/api/v1/calendar?asofdate=${asOfDate}`

  let dataSource = { name: "CALENDAR", endpoint }
  return dispatch => {
    dataConnecting(true);

    return dispatch(dataActions.fetchData(dataSource))
  }
}
function getMaxDate() {
  let endpoint = `/api/v1/maxcalendardate`
  let dataSource = { name: "MAXCALENDAR", endpoint }
  return dispatch => {
    dataConnecting(true);

    return dispatch(dataActions.fetchData(dataSource))
  }
}

function updateConnection(startDate, endDate, rmCode, name = "ACCOUNT_KPIS") {
  let endpoint = `/api/v1/summary?startDate=${startDate.toDate().toLocaleDateString()}&endDate=${endDate.toDate().toLocaleDateString()}&rmCode=${rmCode}`

  let dataSource = { name, endpoint }

  return dispatch => {
    dataConnecting(true);
    dispatch(dataActions.fetchData(dataSource));

  }
}

/**
 * @description - Get the Account KPIs data for FYTD of commission tile.
 *
 * @param {moment object | string} fyStartDate - Start date for commission tile chart data.
 * @param {moment object | string} asOfDate - End date for commission tile chart data.
 * @param {string} rmCode - Selected RM Code.
 */
const getFYTDAccountKPIs = (fyStartDate, asOfDate, rmCode) => {
  return updateConnection(fyStartDate, asOfDate, rmCode, "FYTD_ACCOUNT_KPIS");
}

function updateChart(startDate, endDate, rmCode, name = "GROSS_FLOWS_MONTHLY_EXISTING") {
  let endpoint = `/api/v1/daily?startDate=${startDate.toDate().toLocaleDateString()}&endDate=${endDate.toDate().toLocaleDateString()}&rmCode=${rmCode}`
  let dataSource = { name, endpoint }
  return dispatch => {
    dataConnecting(true);
    dispatch(dataActions.fetchData(dataSource));

  }
}

/**
 * @description - Get the chart data for FYTD of commission tile.
 *
 * @param {moment object | string} fyStartDate - Start date for commission tile chart data.
 * @param {moment object | string} asOfDate - End date for commission tile chart data.
 * @param {string} rmCode - Selected RM Code.
 */
const getFYTDCommission = (fyStartDate, asOfDate, rmCode) => {
  return updateChart(fyStartDate, asOfDate, rmCode, "FTYD_COMMISSION");
}

function updateFAView(startDate, endDate, rmCode) {
  let name = "ADVISOR"
  let endpoint = `/api/v1/financialadvisor?startDate=${startDate.toDate().toLocaleDateString()}&endDate=${endDate.toDate().toLocaleDateString()}&rmCode=${rmCode}`
  let dataSource = { name, endpoint }
  return dispatch => {
    dataConnecting(true);
    dispatch(dataActions.fetchData(dataSource));

  }
}
function getRMCode(networkId) {
  let name = "RMDATA"
  let endpoint = `/api/v1/people/${networkId}`
  let dataSource = { name, endpoint }
  return dispatch => {
    dataConnecting(true);

    return dispatch(dataActions.fetchData(dataSource))
  }
}

function updateFirmView(startDate, endDate, rmCode) {
  let name = "FIRM"
  let endpoint = `/api/v1/firm?startDate=${startDate.toDate().toLocaleDateString()}&endDate=${endDate.toDate().toLocaleDateString()}&rmCode=${rmCode}`
  let dataSource = { name, endpoint }
  return dispatch => {
    dataConnecting(true);
    dispatch(dataActions.fetchData(dataSource));

  }
}

function getFirmDetails(startDate, endDate, detailId, rmCode, detailsType) {
  if (detailsType == 'fa') {
    let name = "ADVISORDETAILS"
    let endpoint = `/api/v1/advisordetails?startDate=${startDate.toDate().toLocaleDateString()}&endDate=${endDate.toDate().toLocaleDateString()}&rmCode=${rmCode}&advisor=${detailId}`
    let dataSource = { name, endpoint }
    return dispatch => {
      dataConnecting(true);
      dispatch(dataActions.fetchData(dataSource));

    }
  } else if (detailsType == 'firm') {
    let name = "FIRMDETAILS"
    let endpoint = `/api/v1/firmdetails?startDate=${startDate.toDate().toLocaleDateString()}&endDate=${endDate.toDate().toLocaleDateString()}&rmCode=${rmCode}&firm=${detailId}`
    let dataSource = { name, endpoint }
    return dispatch => {
      dataConnecting(true);
      dispatch(dataActions.fetchData(dataSource));

    }
  }
}

function getMetricsDetails() {
  let name = "METRICSDETAILS"
  let endpoint = `/api/v1/incentive-metrics`
  let dataSource = { name, endpoint }
  return dispatch => {
    dataConnecting(true);
    dispatch(dataActions.fetchData(dataSource));
  }
}

function getExperienceMetrics() {
  let name = "EXPERIENCE_METRICS"
  let endpoint = `/api/v1/experience-metrics`
  let dataSource = { name, endpoint }
  return dispatch => {
    dataConnecting(true);
    dispatch(dataActions.fetchData(dataSource));
  }
}
function getEngagementMetrics() {
  let name = "ENGAGEMENTMETRICS"
  let endpoint = `/api/v1/engagement-metrics`
  let dataSource = { name, endpoint }
  return dispatch => {
    dataConnecting(true);
    dispatch(dataActions.fetchData(dataSource));
  }
}
export const actions = {
  dataConnect,
  dataConnecting,
  getDates,
  updateConnection,
  updateChart,
  updateFAView,
  getListOfRM,
  getRMCode,
  getMaxDate,
  updateFirmView,
  getFirmDetails,
  getMetricsDetails,
  getExperienceMetrics,
  getEngagementMetrics,
  getFYTDAccountKPIs,
  getFYTDCommission,
}