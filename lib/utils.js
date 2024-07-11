export function shortenAddress(address, chars = 4) {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function formatNumber(num) {
  return new Intl.NumberFormat().format(num);
}

export function formatDate(timestamp) {
  return new Date(timestamp * 1000).toLocaleString();
}

export function formatSol(lamports) {
  return (lamports / 1e9).toFixed(9) + ' SOL';
}

export function formatUSD(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

export function calculatePercentChange(oldValue, newValue) {
  const change = ((newValue - oldValue) / oldValue) * 100;
  return change.toFixed(2) + '%';
}

export function truncate(str, n) {
  return (str.length > n) ? str.slice(0, n-1) + '...' : str;
}