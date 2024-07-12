export function shortenAddress(address, chars = 4) {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatDate(timestamp) {
  return new Date(timestamp * 1000).toLocaleString();
}

export function formatSol(value) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value) + ' SOL';
}

export function formatUSD(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function calculatePercentChange(oldValue, newValue) {
  const change = ((newValue - oldValue) / oldValue) * 100;
  return change.toFixed(2) + '%';
}

export function truncate(str, n) {
  return (str.length > n) ? str.slice(0, n-1) + '...' : str;
}