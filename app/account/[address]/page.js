import { fetchAccountInfo } from '@/lib/api';
import AccountOverview from '@/components/AccountOverview';

export default async function AccountPage({ params }) {
  const accountInfo = await fetchAccountInfo(params.address);

  return (
    <div>
      <h1 className="text-center text-2xl sm:text-3xl font-bold mb-8">Account Details</h1>
      <AccountOverview info={accountInfo} />
    </div>
  );
}