const HELIUS_API_KEY = process.env.HELIUS_API_KEY;
const HELIUS_RPC_URL = `https://devnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

async function fetchFromHelius(method, params) {
  const response = await fetch(HELIUS_RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'my-id',
      method,
      params,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from Helius API');
  }

  const data = await response.json();
  return data.result;
}

export async function fetchAccountInfo(address) {
  return fetchFromHelius('getAccountInfo', [address]);
}

export async function fetchRecentTransactions(address) {
  return fetchFromHelius('getSignaturesForAddress', [address, { limit: 10 }]);
}