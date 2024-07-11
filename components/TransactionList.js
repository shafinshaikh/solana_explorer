export default function TransactionList({ transactions }) {
    if (!transactions || transactions.length === 0) {
      return (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
          <p>No recent transactions found.</p>
        </div>
      );
    }
  
    return (
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
        <ul>
          {transactions.map((tx) => (
            <li key={tx.signature} className="mb-4 p-2 border-b">
              <p><strong>Signature:</strong> {tx.signature}</p>
              <p><strong>Block:</strong> {tx.slot}</p>
              <p><strong>Time:</strong> {tx.blockTime ? new Date(tx.blockTime * 1000).toLocaleString() : 'N/A'}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }