'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Menu, X } from 'lucide-react'; // Make sure to install lucide-react

export default function Navbar() {
  const [wallet, setWallet] = useState(null);
  const [network, setNetwork] = useState('devnet');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 py-4 px-4 sm:px-8">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image src="/solana_logo.svg" alt="Shafin's Solana Explorer" width={50} height={50} />
        </Link>
        <div className="hidden sm:flex items-center space-x-4">
          <select
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="bg-gray-700 text-white px-2 py-1 rounded"
          >
            <option value="devnet">Devnet</option>
            <option value="mainnet">Mainnet</option>
            <option value="testnet">Testnet</option>
          </select>
          <WalletMultiButton style={{}} />
        </div>
        <button onClick={toggleMenu} className="sm:hidden text-white">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="mt-4 sm:hidden">
          <select
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="bg-gray-700 text-white px-2 py-1 rounded w-full mb-2"
          >
            <option value="devnet">Devnet</option>
            <option value="mainnet">Mainnet</option>
            <option value="testnet">Testnet</option>
          </select>
          <div className="flex justify-center">
            <WalletMultiButton style={{}} />
          </div>
        </div>
      )}
    </nav>
  );
}