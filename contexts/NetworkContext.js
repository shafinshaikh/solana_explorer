"use client";
import React, { createContext, useState, useContext } from 'react';

const NetworkContext = createContext();

export function NetworkProvider({ children }) {
  const [network, setNetwork] = useState('devnet');

  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  return useContext(NetworkContext);
}