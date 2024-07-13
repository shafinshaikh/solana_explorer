"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';

const NetworkContext = createContext();

export function NetworkProvider({ children }) {
  const [network, setNetwork] = useState('devnet');

  useEffect(() => {
    // Load the network from localStorage on initial render
    const savedNetwork = localStorage.getItem('selectedNetwork');
    if (savedNetwork) {
      setNetwork(savedNetwork);
    }
  }, []);

  const updateNetwork = (newNetwork) => {
    setNetwork(newNetwork);
    localStorage.setItem('selectedNetwork', newNetwork);
    // Reload the page to refresh data
    window.location.reload();
  };

  return (
    <NetworkContext.Provider value={{ network, updateNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  return useContext(NetworkContext);
}