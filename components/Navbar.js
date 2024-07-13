'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useNetwork } from '@/contexts/NetworkContext';

export default function Navbar() {
  const { network, updateNetwork } = useNetwork("devnet");
  const [wallet, setWallet] = useState(null);

  const connectWallet = async () => {
    // Implement wallet connection logic
    setWallet({ address: 'FTaGN4a9THrV9zGLaYvC8ZouxUBBvb3o8JmZgs3ZB2LP' });
  };

  useEffect(() => {
    // This effect will run when the component mounts
    // It ensures the select element shows the correct network
  }, [network]);

  return (
    <nav className="bg-gray-800 py-4 px-8 flex justify-between items-center">
      <Link href="/">
        <Image src="/solana_logo.svg" alt="Shafin's Solana Explorer" width={50} height={50} />
      </Link>
      <div className="flex items-center space-x-4">
        <select
          value={network}
          onChange={(e) => updateNetwork(e.target.value)}
          className="bg-gray-700 text-white px-2 py-1 rounded"
        >
          <option value="devnet">Devnet</option>
          <option value="mainnet">Mainnet</option>
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