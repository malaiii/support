import { format } from 'd3-format'

export function formatData(data) {
  return data.map(d => ({
    ...d,
    gross_sales: format('(,.2f')(d.gross_sales),
    lot_depletion: format('(,.2f')(d.lot_depletion),
    aged_off: format('(,.2f')(d.aged_off),
    current_lot_balance: format('(,.2f')(d.current_lot_balance),
    commission_earned: format('(,.2f')(d.commission_earned)
  }))
}

export function currencyFormatter(params) {
  if (params && params.value) {
    return "\x24" + formatNumber(params.value);
  }
}

export function formatNumber(number) {
  if (number) {
    return (number)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
}

export function negativeCurrencyFormatter(params) {
  if (params && params.value) {
    return formatNegativeNumber(params.value);
  }
}

export function formatNegativeNumber(number) {
  if (number) {
    return format('($,.2f')(number)
  }
}

export function formatMillions(params) {
  // Use 3 significant digits above 1M
  if (params && params.value && params.value > 1e6) {
    return format("$,.3s")(params.value).replace("G", "B");// Replace default “G” (for giga) suffix with “B” (for billions)
  }

  // No decimal below 1 million
  return format("$,.0f")(params.value);
};