'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import ContractForm from '@/components/contracts/contract-form';
import { getCurrentUser } from '@/lib/auth';

export default function NewContract() {
  const router = useRouter();

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
        <ContractForm />
      </main>
    </div>
  );
}
