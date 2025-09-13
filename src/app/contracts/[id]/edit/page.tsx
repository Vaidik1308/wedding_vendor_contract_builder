'use client';

import { useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import ContractForm from '@/components/contracts/contract-form';
import { getCurrentUser } from '@/lib/auth';

interface EditContractPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditContractPage({ params }: EditContractPageProps) {
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
        <ContractForm contractId={id} isEdit={true} />
      </main>
    </div>
  );
}
