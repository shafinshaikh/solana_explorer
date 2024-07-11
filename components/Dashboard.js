import Graph from './Graph';
import InfoToolTip from './InfoToolTip';

export default function Dashboard() {
  // Fetch and pass real data to these components
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-xl font-bold mb-2">
            SOL Supply <InfoToolTip content="Total circulating and non-circulating SOL" />
          </h3>
          <p>Circulating: 500,000,000 SOL</p>
          <p>Non-circulating: 100,000,000 SOL</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-xl font-bold mb-2">
            Current Epoch <InfoToolTip content="A period of time in the Solana network" />
          </h3>
          <p>Epoch: 200</p>
          <p>Total Stake: 400,000,000 SOL</p>
          <p>Validators: 1,000</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-xl font-bold mb-2">Top Market News</h3>
          {/* Add news items here */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Graph title="TPS (Last 30 min)" data={[]} />
        <Graph title="Average Ping Time (Last 30 min)" data={[]} />
      </div>
    </div>
  );
}