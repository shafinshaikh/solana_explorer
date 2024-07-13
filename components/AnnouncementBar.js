"use client";

import { useState, useEffect } from "react";
import { fetchNetworkStats } from "@/lib/api";
import { useNetwork } from "@/contexts/NetworkContext";

export default function AnnouncementBar() {
  const [stats, setStats] = useState(null);
  const { network } = useNetwork();

  useEffect(() => {
    const fetchStats = async () => {
      const data = await fetchNetworkStats(network);
      setStats(data);
    };
    fetchStats();
    const interval = setInterval(fetchStats, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [network]);

  if (!stats) return null;

  return (
    <div className="bg-gray-950 text-white py-3 px-2 flex  justify-evenly text-sm">
      <span>SOL: ${stats.solPrice}</span>
      <span>mCap: ${stats.marketCap}</span>
      <span>Current TPS: {stats.tps}</span>
      <span>
        Network:{" "}
        <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
          <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
          Active
        </span>
      </span>
    </div>
  );
}
