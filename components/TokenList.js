export default function TokenList({ tokens }) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Token Balances</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tokens.map((token) => (
            <div key={token.mint} className="bg-gray-700 p-4 rounded">
              <div className="flex items-center space-x-2">
                <img src={token.logoURI} alt={token.symbol} className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-bold">{token.symbol}</p>
                  <p className="text-sm text-gray-300">{token.name}</p>
                </div>
              </div>
              <p className="mt-2 text-lg">{token.balance} {token.symbol}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }