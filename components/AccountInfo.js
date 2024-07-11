export default function AccountInfo({ info }) {
    if (!info || !info.value) {
      return <div>No account information available.</div>;
    }
  
    const { value } = info;
  
    return (
      <div className="bg-white p-4 rounded shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">Account Information</h2>
        <p><strong>Balance:</strong> {value.lamports / 1e9} SOL</p>
        <p><strong>Executable:</strong> {value.executable ? 'Yes' : 'No'}</p>
        <p><strong>Owner:</strong> {value.owner}</p>
        <p><strong>Rent Epoch:</strong> {value.rentEpoch}</p>
        <p><strong>Space:</strong> {value.space} bytes</p>
      </div>
    );
  }