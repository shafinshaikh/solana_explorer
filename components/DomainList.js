"use client"

export default function DomainList({ domains }) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Solana Domains</h3>
        <ul className="space-y-2">
          {domains.map((domain) => (
            <li key={domain} className="bg-gray-700 p-3 rounded">
              {domain}
            </li>
          ))}
        </ul>
      </div>
    );
  }