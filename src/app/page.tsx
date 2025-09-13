'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/login-form';
import { getCurrentUser } from '@/lib/auth';
import { initializeSampleData } from '@/lib/storage';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Initialize sample data
    initializeSampleData();
    
    // Check if user is already logged in
    const user = getCurrentUser();
    if (user) {
      router.push('/dashboard');
    }
  }, [router]);

  return <LoginForm />;
}
