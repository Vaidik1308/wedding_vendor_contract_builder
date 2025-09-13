'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Contract } from '@/lib/types';
import { formatDate, formatCurrency } from '@/lib/utils';
import { getContractWithSignature, updateContract, saveSignature } from '@/lib/storage';
import { getCurrentUser } from '@/lib/auth';
import SignaturePad from './signature-pad';
import AnimatedElement from '../common/AnimatedElement';
import { toast } from 'sonner';

interface ContractViewProps {
  contractId: string;
}

export default function ContractView({ contractId }: ContractViewProps) {
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    
    if (contractId && currentUser) {
      const contractData = getContractWithSignature(contractId);
      if (contractData && contractData.vendorId === currentUser.id) {
        setContract(contractData);
      } else {
        router.push('/dashboard');
      }
    }
    setLoading(false);
  }, [contractId, router]);

  const handleSign = () => {
    setShowSignaturePad(true);
  };

  const handleSignatureSave = async (signatureData: string, signatureType: 'drawn' | 'typed', signerName: string) => {
    if (!contract) return;
    
    try {
      // Save signature
      const signature = saveSignature({
        contractId: contract.id,
        signatureData,
        signatureType,
        signerName
      });

      // Update contract status
      updateContract(contract.id, {
        status: 'signed',
        signature
      });

      // Update local state
      setContract(prev => prev ? { ...prev, status: 'signed', signature } : null);
      setShowSignaturePad(false);
      toast.success('Signature saved successfully');
    } catch (error) {
      toast.error('Error saving signature');
      console.error('Error saving signature:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading contract...</div>;
  }

  if (!contract) {
    return <div className="text-center py-8">Contract not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <AnimatedElement variant="fadeInLeft" className="mb-6">
        <Button className='cursor-pointer' variant="outline" onClick={() => router.push('/dashboard')}>
          ← Back to Dashboard
        </Button>
      </AnimatedElement>
      <AnimatedElement variant="fadeInUp">
        <Card>
          <CardHeader>
            <div className="flex md:flex-row flex-col-reverse justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{contract.clientName}</CardTitle>
                <CardDescription>
                  {contract.eventVenue} • {formatDate(contract.eventDate)}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  contract.status === 'signed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {contract.status === 'signed' ? '✓ Signed' : 'Draft'}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">Service Package</h3>
                <p className="text-gray-600">{contract.servicePackage}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Amount</h3>
                <p className="text-gray-600">{formatCurrency(contract.amount)}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Created</h3>
                <p className="text-gray-600">{formatDate(contract.createdAt)}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Contract Content</h3>
              <div className="prose max-w-none">
                <div 
                  className="whitespace-pre-wrap text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: contract.content.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  }}
                />
              </div>
            </div>

            {contract.signature && (
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-700 mb-3">Digital Signature</h3>
                <div className="bg-gray-50 p-4 rounded-lg max-w-full md:w-fit">
                  {contract.signature.signatureType === 'drawn' ? (
                    <div className='w-full max-w-full'>
                      <Image 
                        src={contract.signature.signatureData} 
                        alt="Digital Signature" 
                        width={300}
                        height={100}
                        className=" border border-gray-300 rounded max-w-full"
                      />
                      <p className="text-sm text-gray-600 mt-2">
                        Signed by: {contract.signature.signerName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Signed on: {formatDate(contract.signature.signedAt)}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg font-signature" style={{ fontFamily: 'cursive' }}>
                        {contract.signature.signatureData}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Signed by: {contract.signature.signerName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Signed on: {formatDate(contract.signature.signedAt)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {contract.status === 'draft' && (
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                  className='cursor-pointer'
                  variant="outline"
                  onClick={() => router.push(`/contracts/${contract.id}/edit`)}
                >
                  Edit Contract
                </Button>
                <Button onClick={handleSign}>
                  Sign Contract
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </AnimatedElement>

      {showSignaturePad && (
        <AnimatedElement variant="fadeIn" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-w-full max-h-[90vh] overflow-y-auto">
            <SignaturePad
              onSave={handleSignatureSave}
              onCancel={() => setShowSignaturePad(false)}
            />
          </div>
        </AnimatedElement>
      )}
    </div>
  );
}
