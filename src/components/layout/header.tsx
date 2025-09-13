'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getCurrentUser, logoutUser } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { AuthUser } from '@/lib/types';
import AnimatedElement from '../common/AnimatedElement';
import { toast } from 'sonner';
import { MobileSidebar } from './MobileSidebar';

export default function Header() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    logoutUser();
    toast.success('Logged out successfully');
    router.push('/');
  };

  if (!user) return null;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <AnimatedElement variant='fadeIn' className="flex gap-2 md:gap-0">
            <h1 className="md:**:text-xl font-semibold text-gray-900">
              Wedding AI
            </h1>
            <span className="md:ml-4 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-xs">
              {user.type}
            </span>
          </AnimatedElement>
          <AnimatedElement variant='fadeIn' className=" hidden md:flex items-center space-x-4">
            <span className="hidden md:flex text-sm text-gray-700">
              Welcome, {user.name}
            </span>
            <Button className='cursor-pointer' variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </AnimatedElement>
          <div className='md:hidden flex'>
            <MobileSidebar 
              handleLogout={handleLogout}
              user={user}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
