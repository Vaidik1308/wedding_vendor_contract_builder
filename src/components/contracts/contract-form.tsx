'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AI_CONTRACT_TEMPLATES } from '@/lib/types';
import { saveContract, updateContract, getContractWithSignature } from '@/lib/storage';
import { getCurrentUser } from '@/lib/auth';
import AnimatedElement from '../common/AnimatedElement';
import { Bot } from 'lucide-react';
import { DatePicker } from '../common/DatePicker';
import { toast } from 'sonner';

interface ContractFormProps {
  contractId?: string;
  isEdit?: boolean;
}

export default function ContractForm({ contractId, isEdit = false }: ContractFormProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    eventDate: '',
    eventVenue: '',
    servicePackage: '',
    amount: '',
    content: ''
  });
  const [eventDate, setEventDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    
    if (isEdit && contractId && currentUser) {
      const contract = getContractWithSignature(contractId);
      if (contract && contract.vendorId === currentUser.id) {
        setFormData({
          clientName: contract.clientName,
          eventDate: contract.eventDate,
          eventVenue: contract.eventVenue,
          servicePackage: contract.servicePackage,
          amount: contract.amount.toString(),
          content: contract.content
        });
        // Convert string date to Date object for the date picker
        if (contract.eventDate) {
          setEventDate(new Date(contract.eventDate));
        }
      }
    }
  }, [contractId, isEdit]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setEventDate(date);
    if (date) {
      setFormData(prev => ({ ...prev, eventDate: date.toISOString().split('T')[0] }));
    }
  };

  const generateAIContent = async () => {
    if (!user) return;
    
    setIsGeneratingAI(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const template = AI_CONTRACT_TEMPLATES[user.type];
    let content = template.content;
    
    // Replace placeholders with form data
    content = content.replace(/\[Client Name\]/g, formData.clientName || '[Client Name]');
    content = content.replace(/\[Event Date\]/g, formData.eventDate || '[Event Date]');
    content = content.replace(/\[Event Venue\]/g, formData.eventVenue || '[Event Venue]');
    content = content.replace(/\[Your Name\]/g, user.name);
    content = content.replace(/\[Amount\]/g, formData.amount || '[Amount]');
    content = content.replace(/\[Number\]/g, '100'); // Default guest count
    
    setFormData(prev => ({ ...prev, content }));
    setIsGeneratingAI(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    
    try {
      const contractData = {
        vendorId: user.id,
        clientName: formData.clientName,
        eventDate: formData.eventDate,
        eventVenue: formData.eventVenue,
        servicePackage: formData.servicePackage,
        amount: parseFloat(formData.amount) || 0,
        content: formData.content,
        status: 'draft' as const
      };

      if (isEdit && contractId) {
        updateContract(contractId, contractData);
      } else {
        saveContract(contractData);
      }
      
      router.push('/dashboard');
      toast.success('Contract saved successfully');
    } catch (error) {
      console.error('Error saving contract:', error);
      toast.error('Error saving contract');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedElement variant='fadeInUp' className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {isEdit ? 'Edit Contract' : 'Create New Contract'}
          </CardTitle>
          <CardDescription>
            Fill in the details for your wedding vendor contract
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  placeholder="e.g., John & Jane Smith"
                  required
                />
              </div>
               <DatePicker
                 label="Event Date"
                 placeholder="Select event date"
                 value={eventDate}
                 onChange={handleDateChange}
                 id="eventDate"
                 required
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventVenue">Event Venue</Label>
                <Input
                  id="eventVenue"
                  value={formData.eventVenue}
                  onChange={(e) => handleInputChange('eventVenue', e.target.value)}
                  placeholder="e.g., Garden Manor"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="servicePackage">Service Package</Label>
                <Input
                  id="servicePackage"
                  value={formData.servicePackage}
                  onChange={(e) => handleInputChange('servicePackage', e.target.value)}
                  placeholder="e.g., Full Wedding Package"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                placeholder="e.g., 2500"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="content">Contract Content</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateAIContent}
                  disabled={isGeneratingAI}
                  className='flex items-center'
                > 
                  <Bot className="w-4 h-4 mr-2" />
                  <span>
                    {isGeneratingAI ? 'Generating...' : 'AI Assist'}
                  </span>
                </Button>
              </div>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Enter your contract content here..."
                className="w-full h-64 p-3 border border-gray-300 rounded-md resize-vertical"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : (isEdit ? 'Update Contract' : 'Save Draft')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AnimatedElement>
  );
}
