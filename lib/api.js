const HELIUS_KEY = process.env.HELIUS_API_KEY;
const HELIUS_RPC_URL = `https://devnet.helius-rpc.com/?api-key=${HELIUS_KEY}`;

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

  console.log("Response: ", response);
  
  if (!response.ok) {
    throw new Error('Failed to fetch from Helius API');
  }

  const data = await response.json();
  return data.result;
}

export async function fetchAccountInfo(address) {
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

  return {
    signature,
    slot: tx.slot,
    blockTime: tx.blockTime,
    success: tx.meta.err === null,
    fee: tx.meta.fee,
    balanceChange: tx.meta.postBalances[0] - tx.meta.preBalances[0],
    instructions: tx.transaction.message.instructions.map(instruction => ({
      program: instruction.programId,
      data: instruction.data,
    })),
  };
}

export async function fetchNetworkStats() {
  const [supply, recentPerformanceSamples, epochInfo, inflation] = await Promise.all([
    fetchFromHelius('getSupply', []),
    fetchFromHelius('getRecentPerformanceSamples', [30]),
    fetchFromHelius('getEpochInfo', []),
    fetchFromHelius('getInflationRate', []),
  ]);

  const averageTps = recentPerformanceSamples.reduce((acc, sample) => acc + sample.numTransactions / sample.samplePeriodSecs, 0) / recentPerformanceSamples.length;

  return {
    solPrice: await fetchSolPrice(),
    marketCap: supply.value.total * await fetchSolPrice(),
    tps: averageTps.toFixed(2),
    currentEpoch: epochInfo.epoch,
    totalStake: epochInfo.totalStake,
    circulatingSupply: supply.value.circulating,
    totalSupply: supply.value.total,
    inflationRate: inflation.total,
  };
}

export async function fetchRecentTransactions(address, limit = 10) {
  const signatures = await fetchFromHelius('getSignaturesForAddress', [address, { limit }]);
  const transactions = await Promise.all(signatures.map(sig => fetchTransactionDetails(sig.signature)));
  return transactions;
}

async function fetchSolPrice() {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
  const data = await response.json();
  return data.solana.usd;
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