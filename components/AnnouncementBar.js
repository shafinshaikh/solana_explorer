'use client';

import { useState, useEffect } from 'react';
import { fetchNetworkStats } from '@/lib/api';

export default function AnnouncementBar() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await fetchNetworkStats();
      setStats(data);
    };
    fetchStats();
    const interval = setInterval(fetchStats, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (!stats) return null;

  return (
    <div className="bg-gray-800 text-white py-2 px-4 flex justify-between text-sm">
      <span>SOL: ${stats.solPrice}</span>
      <span>mCap: ${stats.marketCap}</span>
      <span>TPS: {stats.tps}</span>
      <span>Network: {stats.networkStatus}</span>
    </div>
  );
}