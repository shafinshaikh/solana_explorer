import { NextResponse } from 'next/server';
import { fetchAccountInfo, fetchTransactionDetails } from '@/lib/api';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const value = searchParams.get('value');

  if (!type || !value) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  try {
    let data;
    switch (type) {
      case 'account':
        data = await fetchAccountInfo(value);
        break;
      case 'transaction':
        data = await fetchTransactionDetails(value);
        break;
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}