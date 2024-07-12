'use client';

import { useState, useEffect } from 'react';
import Graph from './Graph';
import InfoToolTip from './InfoToolTip';
import { fetchNetworkStats } from '../lib/api';
import { formatNumber, formatSol, formatUSD } from '../lib/utils';

export default function Dashboard() {
  const [networkStats, setNetworkStats] = useState(null);
  const [tpsData, setTpsData] = useState([]);
  const [pingData, setPingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await fetchNetworkStats();
        setNetworkStats(stats);

        // Generate dummy data for graphs
        const now = Date.now();
        const newTpsData = Array.from({ length: 30 }, (_, i) => ({
          time: new Date(now - (29 - i) * 60000).toISOString(),
          value: parseFloat(stats.tps) + Math.random() * 10 - 5,
        }));
        setTpsData(newTpsData);

        const newPingData = Array.from({ length: 30 }, (_, i) => ({
          time: new Date(now - (29 - i) * 60000).toISOString(),
          value: 20 + Math.random() * 10,
        }));
        setPingData(newPingData);
      } catch (error) {
        console.error('Error fetching network stats:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const dummyNews = [
    { title: "Solana Breaks New TPS Record", url: "#" },
    { title: "Major DeFi Protocol Launches on Solana", url: "#" },
    { title: "Solana Foundation Announces New Grant Program", url: "#" },
  ];

  if (!networkStats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-xl font-bold mb-2">
            SOL Supply <InfoToolTip content="Total circulating and non-circulating SOL" />
          </h3>
          <p>Circulating: {formatSol(networkStats.circulatingSupply)}</p>
          <p>Total: {formatSol(networkStats.totalSupply)}</p>
          <p>Price: {formatUSD(networkStats.solPrice)}</p>
          <p>Market Cap: {formatUSD(networkStats.marketCap)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-xl font-bold mb-2">
            Current Epoch <InfoToolTip content="A period of time in the Solana network" />
          </h3>
          <p>Epoch: {networkStats.currentEpoch}</p>
          <p>Total Stake: {formatSol(networkStats.totalStake)}</p>
          <p>Inflation Rate: {(networkStats.inflationRate * 100).toFixed(2)}%</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-xl font-bold mb-2">Top Market News</h3>
          <ul className="space-y-2">
            {dummyNews.map((news, index) => (
              <li key={index}>
                <a href={news.url} className="text-blue-400 hover:underline">
                  {news.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Graph title="TPS (Last 30 min)" data={tpsData} />
        <Graph title="Average Ping Time (Last 30 min)" data={pingData} />
      </div>
    </div>
  );
}