import { NextResponse } from 'next/server';
import { fetchAccountInfo, fetchRecentTransactions } from '../../../lib/api';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  try {
    const [accountInfo, recentTransactions] = await Promise.all([
      fetchAccountInfo(address),
      fetchRecentTransactions(address),
    ]);
    console.log("Accoutn info: ", accountInfo);
    console.log("Recent transactions: ", recentTransactions);

    return NextResponse.json({ accountInfo, recentTransactions });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}