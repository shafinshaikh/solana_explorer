"use client"
import { useState, useEffect } from 'react';
import TokenList from './TokenList';
import NFTGallery from './NFTGallery';
import DomainList from './DomainList';
import InfoTooltip from './InfoToolTip';
import { fetchRecentTransactions } from '../lib/api';


export default function AccountOverview({ info }) {
  const [activeTab, setActiveTab] = useState('transactions');
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">Account Overview</h2>
        <p><strong>Address:</strong> {info.address}</p>
        <p><strong>SOL Balance:</strong> {info.balance} SOL</p>
        <p>
          <strong>Executable:</strong> {info.executable ? 'Yes' : 'No'}
          <InfoTooltip content="Indicates if this account contains a program" />
        </p>
        <p><strong>Total Net Worth:</strong> ${info.netWorth}</p>
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
        <h2 className="text-2xl font-bold mb-4">Account Insights</h2>
        {/* Add visual representations of account insights here */}
      </div>
    </div>
  );
}

function TransactionHistory({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return <p>No transactions available.</p>;
  }
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Signature</th>
          <th>SOL Change</th>
          <th>Fee</th>
          <th>From</th>
          <th>To</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr key={tx.signature}>
            <td>{tx.signature}</td>
            <td>{tx.solChange}</td>
            <td>{tx.fee}</td>
            <td>{tx.from}</td>
            <td>{tx.to}</td>
            <td>{tx.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}