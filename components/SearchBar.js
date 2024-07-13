'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from './Loader'; 

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);

    try {
      if (query.length === 44 || query.length === 32) {
        await router.push(`/account/${query}`);
      } else if (query.length === 88) {
        await router.push(`/transaction/${query}`);
      } else {
        alert("Please enter valid address/signature on the selected network");
      }
    } catch (error) {
      console.error('Search error:', error);
      // Handle error
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for address, signature, block, token..."
        className="w-full px-4 py-2 pr-12 rounded-l bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isSearching ? (
        <div className="absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center bg-blue-500 rounded-r">
          <Loader/>
        </div>
      ) : (
        <button
          type="submit"
          className="absolute right-0 top-0 bottom-0 px-4 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      )}
    </form>
  );
}