'use client';

import { useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import ContractView from '@/components/contracts/contract-view';
import { getCurrentUser } from '@/lib/auth';

interface ContractPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ContractPage({ params }: ContractPageProps) {
  const router = useRouter();
  const { id } = use(params);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <ContractView contractId={id} />
      </main>
    </div>
  );
}
