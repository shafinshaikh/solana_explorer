"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TokenList from './TokenList';
import NFTGallery from './NFTGallery';
import DomainList from './DomainList';
import InfoTooltip from './InfoToolTip';
import Clipboard from './Clipboard';
import { fetchRecentTransactions } from '../lib/api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export default function AccountOverview({ info }) {
  const [activeTab, setActiveTab] = useState('transactions');
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const txData = await fetchRecentTransactions(info.address);
        setTransactions(txData);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [info.address]);

  useEffect(() => {
    if (transactions) {
      const last7Days = transactions.slice(0, 7).reverse();
      const labels = last7Days.map(tx => new Date(tx.timestamp).toLocaleDateString());
      const data = last7Days.map(tx => parseFloat(tx.balanceChange / 1e9));

      setChartData({
        labels,
        datasets: [
          {
            label: 'SOL Change',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      });
    }
  }, [transactions]);

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">Account Overview</h2>
        <p className='flex flex-row'><strong>Address:</strong> &nbsp; {info.address}<Clipboard text={info.address} /></p>
        <p><strong>SOL Balance:</strong> {info.balance/ 1e9} SOL</p>
        <p>
          <strong>Executable:</strong> {info.executable ? 'Yes' : 'No'}
          <InfoTooltip content="Indicates if this account contains a program" />
        </p>
        <p><strong>Total Net Worth:</strong> {info.netWorth || (info.balance / 1e9 )} SOL</p>
      </div>

      <div className="bg-gray-800 rounded">
        <div className="flex border-b border-gray-700">
          <button
            className={`px-4 py-2 ${activeTab === 'transactions' ? 'bg-gray-700' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'tokens' ? 'bg-gray-700' : ''}`}
            onClick={() => setActiveTab('tokens')}
          >
            Tokens
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'nfts' ? 'bg-gray-700' : ''}`}
            onClick={() => setActiveTab('nfts')}
          >
            NFTs
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'domains' ? 'bg-gray-700' : ''}`}
            onClick={() => setActiveTab('domains')}
          >
            Domains
          </button>
        </div>
        <div className="p-4">
          {/* {activeTab === 'transactions' && <TransactionHistory transactions={info.transactions} />} */}
          {activeTab === 'transactions' && (
    loading ? <p>Loading transactions...</p> : <TransactionHistory transactions={transactions} />
  )}
          {activeTab === 'tokens' && <TokenList tokens={info.tokens} />}
          {activeTab === 'nfts' && <NFTGallery nfts={info.nfts} />}
          {activeTab === 'domains' && <DomainList domains={info.domains} />}
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded">
      <div className="bg-gray-800 p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">Account Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Transaction Volume</h3>
            <p className="text-3xl font-bold">{transactions ? transactions.length : 'Loading...'}</p>
            <p className="text-sm text-gray-400">Total transactions</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Net SOL Change</h3>
            <p className="text-3xl font-bold">
              {transactions
                ? transactions.reduce((sum, tx) => sum + parseFloat(tx.balanceChange / 1e9), 0).toFixed(4)
                : 'Loading...'}
            </p>
            <p className="text-sm text-gray-400">Total SOL change from transactions</p>
          </div>
          <div className="col-span-2">
            <h3 className="text-xl font-semibold mb-2">SOL Change (Last 7 Transactions)</h3>
            {chartData ? (
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            ) : (
              <p>Loading chart data...</p>
            )}
          </div>
          </div>
          </div>
      </div>
    </div>
  );
}

function TransactionHistory({ transactions }) {
  const router = useRouter();

  if (!transactions || transactions.length === 0) {
    return <p>No recent transactions available.</p>;
  }

  const shortenAddress = (address) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleRowClick = (signature) => {
    router.push(`/transaction/${signature}`);
  };


  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-2">Signature</th>
            <th className="px-4 py-2">SOL Change</th>
            <th className="px-4 py-2">Fee</th>
            <th className="px-4 py-2">From</th>
            <th className="px-4 py-2">To</th>
            <th className="px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
        {transactions.map((tx) => (
            <tr 
              key={tx.signature} 
              className="border-t border-gray-700 hover:bg-gray-700 cursor-pointer"
              onClick={() => handleRowClick(tx.signature)}
            >
              <td className="px-4 py-2 flex">
                <span title={tx.signature}>
                  {shortenAddress(tx.signature)}
                </span>
                <Clipboard text={tx.signature} />
              </td>
              <td className="px-4 py-2">{tx.balanceChange / 1e9} SOL</td>
              <td className="px-4 py-2">{tx.fee / 1e9} SOL</td>
              <td className="px-4 py-2 flex">
                <span title={tx.from}>
                  {shortenAddress(tx.from)}
                </span>
              </td>
              <td className="px-4 py-2">
                <span title={tx.to}>
                  {shortenAddress(tx.to)}
                </span>
              </td>
              <td className="px-4 py-2">{formatTimestamp(tx.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}