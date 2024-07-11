import { fetchTransactionDetails } from '@/lib/api';
import TransactionDetails from '@/components/TransactionDetails';

export default async function TransactionPage({ params }) {
  const transactionDetails = await fetchTransactionDetails(params.signature);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Transaction Details</h1>
      <TransactionDetails details={transactionDetails} />
    </div>
  );
}