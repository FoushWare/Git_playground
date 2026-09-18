export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

export function formatNumber(num: number, decimals: number = 2): string {
  return num.toFixed(decimals);
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}