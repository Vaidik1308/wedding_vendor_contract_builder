'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Contract } from '@/lib/types';
import { formatDate, formatCurrency } from '@/lib/utils';
import { getContracts } from '@/lib/storage';
import { getCurrentUser } from '@/lib/auth';
import { Loader } from 'lucide-react';
import AnimatedElement from '../common/AnimatedElement';

export default function ContractList() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    
    if (currentUser) {
      const userContracts = getContracts().filter(c => c.vendorId === currentUser.id);
      setContracts(userContracts);
    }
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    return status === 'signed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  if (loading) {
    return <div className="text-center py-8 flex justify-center items-center gap-2">
      <Loader className="w-4 h-4 animate-spin" />
      <span>Loading</span>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between gap-4 md:gap-0 w-full md:items-center md:flex-row flex-col">
        <AnimatedElement variant="fadeInLeft">
          <h2 className="text-2xl font-bold text-gray-900">Your Contracts</h2>
        </AnimatedElement>
        <AnimatedElement variant="fadeInRight">
          <Button className='text-xs md:text-base' onClick={() => router.push('/contracts/new')}>
          Create New Contract
          </Button>
        </AnimatedElement>
      </div>

      {contracts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500 mb-4">No contracts found</p>
            <Button onClick={() => router.push('/contracts/new')}>
              Create Your First Contract
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contracts.map((contract, index) => (
            <AnimatedElement key={contract.id} delay={index * 0.1} variant="fadeInUp">
              <Card key={contract.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{contract.clientName}</CardTitle>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contract.status)}`}>
                      {contract.status}
                    </span>
                  </div>
                  <CardDescription>
                    {contract.eventVenue} • {formatDate(contract.eventDate)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <strong>Package:</strong> {contract.servicePackage}
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Amount:</strong> {formatCurrency(contract.amount)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Created: {formatDate(contract.createdAt)}
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/contracts/${contract.id}`)}
                    >
                      View
                    </Button>
                    {contract.status === 'draft' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/contracts/${contract.id}/edit`)}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AnimatedElement>
          ))}
        </div>
      )}
    </div>
  );
}
