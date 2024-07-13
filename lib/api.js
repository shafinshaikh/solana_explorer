import { useNetwork } from "@/contexts/NetworkContext";

const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
// const HELIUS_RPC_URL = `https://devnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
const COINGECKO_API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

if (!HELIUS_API_KEY) {
  console.error('HELIUS_API_KEY is not set in the environment variables');
  // You might want to throw an error here or handle it appropriately
}

 function getHeliusRpcUrl(network) {
  console.log("Network in getHeliusRpcUrl: ", network);
  return `https://${network || 'devnet'}.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
}

async function fetchFromHelius(method, params, network = 'devnet') {
  // const { network } = useNetwork();
  const HELIUS_RPC_URL = getHeliusRpcUrl(network);
  console.log("HELIUS_RPC_URL: ", HELIUS_RPC_URL);
  try {
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
    if (response.status === 429) {
      // Implement retry logic with exponential backoff
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.result;
} catch (error) {
  console.error('Error fetching from Helius API:', error);
  throw error;
}
}

export async function fetchAccountInfo(address, ) {
  const accountInfo = await fetchFromHelius('getAccountInfo', [address]);
  const balance = await fetchFromHelius('getBalance', [address]);
  const tokenAccounts = await fetchFromHelius('getTokenAccountsByOwner', [address, { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' }]);

  return {
    address,
    balance: balance.value,
    executable: accountInfo.value.executable,
    owner: accountInfo.value.owner,
    rentEpoch: accountInfo.value.rentEpoch,
    tokens: tokenAccounts.value.map(ta => ({
      mint: ta.account.data.parsed.info.mint,
      amount: ta.account.data.parsed.info.tokenAmount.uiAmount,
    })),
  };
}

export async function fetchTransactionDetails(signature) {
  const tx = await fetchFromHelius('getTransaction', [signature]);

  const from = tx.transaction.message.accountKeys[0];

  const toAddresses = tx.transaction.message.instructions.map(instruction => {
    const accounts = instruction.accounts || [];
    return accounts.length > 1 ? tx.transaction.message.accountKeys[accounts[1]] : null;
  }).filter(Boolean);
  
  return {
    signature,
    slot: tx.slot,
    blockTime: tx.blockTime,
    success: tx.meta.err === null,
    fee: tx.meta.fee,
    balanceChange: tx.meta.postBalances[0] - tx.meta.preBalances[0],
    from,
    to: toAddresses.length === 1 ? toAddresses[0] : toAddresses,
    instructions: tx.transaction.message.instructions.map(instruction => ({
      program: tx.transaction.message.accountKeys[instruction.programIdIndex],
      data: instruction.data,
    })),
    timestamp: new Date(tx.blockTime * 1000).toLocaleString(), // Convert UNIX timestamp to readable date
  };
}

export async function fetchNetworkStats() {
  const [supply, recentPerformanceSamples, epochInfo, inflation] = await Promise.all([
    fetchFromHelius('getSupply', []),
    fetchFromHelius('getRecentPerformanceSamples', [30]),
    fetchFromHelius('getEpochInfo', []),
    fetchFromHelius('getInflationRate', []),
  ]);

  const solPrice = await fetchSolPrice();
  console.log("supply: ", supply);
  const totalSupply = supply.value.total / 1e9; // Convert lamports to SOL
  const marketCap = totalSupply * solPrice;

  console.log("Epoch info: ", epochInfo);
  const averageTps = recentPerformanceSamples.reduce((acc, sample) => acc + sample.numTransactions / sample.samplePeriodSecs, 0) / recentPerformanceSamples.length;

  return {
    solPrice,
    marketCap,
    tps: averageTps.toFixed(2),
    currentEpoch: epochInfo.epoch,
    blockHeight: epochInfo.blockHeight, // Convert lamports to SOL
    slotsInEpoch: epochInfo.slotsInEpoch,
    circulatingSupply: supply.value.circulating / 1e9, // Convert lamports to SOL
    totalSupply,
    inflationRate: inflation.total,
    recentPerformanceSamples, // Include this for graph data
  };
}

export async function fetchRecentTransactions(address, limit = 10) {
  const signatures = await fetchFromHelius('getSignaturesForAddress', [address, { limit }]);
  const transactions = await Promise.all(signatures.map(sig => fetchTransactionDetails(sig.signature)));
  return transactions;
}

async function fetchSolPrice() {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/solana?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false');
  
  const data = await response.json();
  return data.market_data.current_price.usd;
}

export async function fetchNFTs(address) {
  const nfts = await fetchFromHelius('getAssetsByOwner', [address, { page: 1, limit: 1000 }]);
  return nfts.items.map(nft => ({
    mint: nft.id,
    name: nft.content.metadata.name,
    symbol: nft.content.metadata.symbol,
    image: nft.content.files[0]?.uri || '',
    collection: nft.content.metadata.collection?.name || 'Unknown Collection',
  }));
}
