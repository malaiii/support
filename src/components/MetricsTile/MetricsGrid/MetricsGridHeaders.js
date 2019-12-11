import { currencyFormatter, formatMillions } from '../../../utils/formattingUtils';

export const incentiveMetrics = {
  COLLAPSED: [
    {
      headerName: 'Regional Manager',
      field: 'rm',
      cellClass: 'cell-wrap-text',
      autoHeight: true,
      cellRenderer: (params) => {
        if (params && params.data) {
          return ` <span class='overAllIncentiveTier_${params.data.overallIncentiveTier} overAllIncentiveTier'></span><span> ${params.value} </span>`;
        }
      },
      width: 150
    },
    {
      headerName: 'Rank',
      field: 'rank',
      cellClass: 'cell-border-style',
      suppressCellSelection: true,
      width: 150
    },
    {
      headerName: 'Total Points',
      field: 'totalPoints',
      cellClass: 'cell-border-style',
      sortingOrder: ['desc', 'asc', 'none'],
      width: 150
    },
    {
      headerName: 'Tiebreaker Sales',
      field: 'tiebreakerSales',
      cellClass: 'cell-border-style',
      sortingOrder: ['desc', 'asc', 'none'],
      valueFormatter: currencyFormatter,
      width: 150
    }
  ],
  EXPANDED: [
    {
      headerName: 'Regional Manager',
      field: 'rm',
      cellClass: 'cell-wrap-text',
      autoHeight: true,
      cellRenderer: (params) => {
        if (params && params.data) {
          return ` <span class='overAllIncentiveTier_${params.data.overallIncentiveTier} overAllIncentiveTier'></span><span> ${params.value} </span>`;//params.data.diversificationPoints + ;
        }
      }
    },
    {
      headerName: 'Rank',
      field: 'rank',
      cellClass: 'cell-border-style',
      suppressCellSelection: true
    },
    {
      headerName: 'Total Points',
      field: 'totalPoints',
      cellClass: 'cell-border-style',
      sortingOrder: ['desc', 'asc', 'none']
    },
    {
      headerName: 'MR Points',
      field: 'mrPoints',
      cellClass: 'cell-border-style',
      sortingOrder: ['asc', 'desc', 'none']
    },
    {
      headerName: 'Batting Avg Points',
      field: 'battingAvgPoints',
      cellClass: 'cell-border-style',
      sortingOrder: ['desc', 'asc', 'none']
    },
    {
      headerName: 'Diversification Points',
      field: 'diversificationPoints',
      cellClass: 'cell-border-style',
      sortingOrder: ['desc', 'asc', 'none']
    },
    {
      headerName: 'Tiebreaker Sales',
      field: 'tiebreakerSales',
      cellClass: 'cell-border-style',
      sortingOrder: ['desc', 'asc', 'none'],
      valueFormatter: currencyFormatter
    }
  ]
}

export const experienceMetrics = {
  COLLAPSED: [
    {
      headerName: 'Advisor Consultant',
      field: 'ac',
      cellClass: 'cell-wrap-text',
      autoHeight: true,
      cellRenderer: (params) => {
        if (params && params.data) {
          return ` <span class='overAllIncentiveTier_${params.data.quartile} overAllIncentiveTier'></span><span> ${params.value} </span>`;
        }
      },
      width: 150
    },
    {
      headerName: 'Rank',
      field: 'overallRank',
      cellClass: 'cell-border-style',
      suppressCellSelection: true,
      width: 100
    },
    {
      headerName: 'Total Points',
      field: 'totalPoints',
      cellClass: 'cell-border-style',
      sortingOrder: ['desc', 'asc', 'none'],
      width: 100
    },
    {
      headerName: 'Avg Diversification Sales (Tiebreaker)',
      field: 'averageSales',
      cellClass: 'cell-border-style',
      sortingOrder: ['desc', 'asc', 'none'],
      valueFormatter: formatMillions,
      width: 250
    }
  ],
  EXPANDED: [
    {
      headerName: 'Advisor Consultant',
      field: 'ac',
      cellClass: 'cell-wrap-text',
      autoHeight: true,
      cellRenderer: (params) => {
        if (params && params.data) {
          return ` <span class='overAllIncentiveTier_${params.data.overallIncentiveTier} overAllIncentiveTier'></span><span> ${params.value} </span>`;//params.data.diversificationPoints + ;
        }
      }
    },
    {
      headerName: 'Rank',
      field: 'overallRank',
      cellClass: 'cell-border-style',
      suppressCellSelection: true
    },
    {
      headerName: 'Total Points',
      field: 'totalPoints',
      cellClass: 'cell-border-style',
      sortingOrder: ['desc', 'asc', 'none']
    },
    {
      headerName: 'Retention Points',
      field: 'retentionPoints',
      cellClass: 'cell-border-style',
      sortingOrder: ['asc', 'desc', 'none']
    },
    {
      headerName: 'Multiple Product Owner  Points',
      field: 'crossSellPoints',
      cellClass: 'cell-border-style',
      sortingOrder: ['desc', 'asc', 'none']
    },
    {
      headerName: 'Diversification Points',
      field: 'divQuartilePoints',
      cellClass: 'cell-border-style',
      sortingOrder: ['desc', 'asc', 'none']
    },
    {
      headerName: 'Avg Diversification Sales (Tiebreaker)',
      field: 'averageSales',
      cellClass: 'cell-border-style',
      sortingOrder: ['desc', 'asc', 'none'],
      valueFormatter: currencyFormatter
    }
  ]
}

export const engagementMetrics = {
  COLLAPSED: [
    {
      headerName: 'Advisor Consultant',
      field: 'ac',
      cellClass: 'cell-wrap-text',
      autoHeight: true,
      cellRenderer: (params) => {
        if (params && params.data) {
          return ` <span class='quartile_${params.data.quartile} quartile'></span><span> ${params.value} </span>`;
        }
      },
      width: 150
    },
    {
      headerName: 'Rank',
      field: 'rank',
      cellClass: 'cell-border-style',
      suppressCellSelection: true,
      width: 150
    },
    {
      headerName: 'Total Points',
      field: 'totalPoints',
      cellClass: 'cell-border-style',
      sortingOrder: ['desc', 'asc', 'none'],
      width: 150
    },
    {
      headerName: '$100k Producer Sales',
      field: 'producerSalesForQtr',
      cellClass: 'cell-border-style',
      sortingOrder: ['desc', 'asc', 'none'],
      valueFormatter: formatMillions,
      width: 150
    }
  ],
  EXPANDED: [
    {
      headerName: 'Advisor Consultant',
      field: 'ac',
      cellClass: 'cell-wrap-text',
      autoHeight: true,
      cellRenderer: (params) => {
        if (params && params.data) {
          return ` <span class='quartile_${params.data.quartile} quartile'></span><span> ${params.value} </span>`;//params.data.diversificationPoints + ;
        }
      }
    },
    {
      headerName: 'Rank',
      field: 'rank',
      cellClass: 'cell-border-style',
      suppressCellSelection: true
    },
    {
      headerName: 'Total Points',
      field: 'totalPoints',
      cellClass: 'cell-border-style',
      sortingOrder: ['desc', 'asc', 'none']
    },
    {
      headerName: 'Retention Points',
      field: 'retentionPoints',
      cellClass: 'cell-border-style',
      sortingOrder: ['asc', 'desc', 'none']
    },
    {
      headerName: 'Acquisition Points',
      field: 'acquisitionPoints',
      cellClass: 'cell-border-style',
      sortingOrder: ['desc', 'asc', 'none']
    },
    {
      headerName: '$100k Producer Points',
      field: 'producerPoints',
      cellClass: 'cell-border-style',
      sortingOrder: ['desc', 'asc', 'none']
    },
    {
      headerName: '$100k Producer Sales(Current Qtr Only)',
      field: 'producerSalesForQtr',
      cellClass: 'cell-border-style',
      sortingOrder: ['desc', 'asc', 'none'],
      valueFormatter: currencyFormatter
    }
  ]
}
