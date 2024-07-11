'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [network, setNetwork] = useState('mainnet');
  const [wallet, setWallet] = useState(null);

  const connectWallet = async () => {
    // Implement wallet connection logic
    setWallet({ address: 'dummy-address' });
  };

  return (
    <nav className="bg-gray-800 py-4 px-8 flex justify-between items-center">
      <Link href="/">
        <Image src="/logo.svg" alt="Solana Explorer" width={150} height={40} />
      </Link>
      <div className="flex items-center space-x-4">
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="bg-gray-700 text-white px-2 py-1 rounded"
        >
          <option value="mainnet">Mainnet</option>
          <option value="devnet">Devnet</option>
          <option value="testnet">Testnet</option>
        </select>
        {wallet ? (
          <Link href="/profile" className="text-white hover:text-gray-300">
            My Profile
          </Link>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}