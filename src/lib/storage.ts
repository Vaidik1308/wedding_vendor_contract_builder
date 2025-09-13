import { Contract, Signature } from './types';
import { generateId } from './utils';

const STORAGE_KEYS = {
  CONTRACTS: 'wedding_vendor_contracts',
  SIGNATURES: 'wedding_vendor_signatures'
};

export function getContracts(): Contract[] {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem(STORAGE_KEYS.CONTRACTS);
  if (!data) return [];
  
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveContract(contract: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>): Contract {
  const contracts = getContracts();
  const newContract: Contract = {
    ...contract,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  contracts.push(newContract);
  localStorage.setItem(STORAGE_KEYS.CONTRACTS, JSON.stringify(contracts));
  
  return newContract;
}

export function updateContract(id: string, updates: Partial<Contract>): Contract | null {
  const contracts = getContracts();
  const index = contracts.findIndex(c => c.id === id);
  
  if (index === -1) return null;
  
  contracts[index] = {
    ...contracts[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem(STORAGE_KEYS.CONTRACTS, JSON.stringify(contracts));
  return contracts[index];
}

export function deleteContract(id: string): boolean {
  const contracts = getContracts();
  const filtered = contracts.filter(c => c.id !== id);
  
  if (filtered.length === contracts.length) return false;
  
  localStorage.setItem(STORAGE_KEYS.CONTRACTS, JSON.stringify(filtered));
  return true;
}

export function getSignatures(): Signature[] {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem(STORAGE_KEYS.SIGNATURES);
  if (!data) return [];
  
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveSignature(signature: Omit<Signature, 'id' | 'signedAt'>): Signature {
  const signatures = getSignatures();
  const newSignature: Signature = {
    ...signature,
    id: generateId(),
    signedAt: new Date().toISOString()
  };
  
  signatures.push(newSignature);
  localStorage.setItem(STORAGE_KEYS.SIGNATURES, JSON.stringify(signatures));
  
  return newSignature;
}

export function getContractWithSignature(contractId: string): Contract | null {
  const contracts = getContracts();
  const signatures = getSignatures();
  
  const contract = contracts.find(c => c.id === contractId);
  if (!contract) return null;
  
  const signature = signatures.find(s => s.contractId === contractId);
  if (signature) {
    contract.signature = signature;
  }
  
  return contract;
}

// Initialize with sample data
export function initializeSampleData(): void {
  if (typeof window === 'undefined') return;
  
  const existingContracts = getContracts();
  if (existingContracts.length > 0) return;
  
  const sampleContracts: Contract[] = [
    {
      id: '1',
      vendorId: '1',
      clientName: 'John & Jane Smith',
      eventDate: '2024-06-15',
      eventVenue: 'Garden Manor',
      servicePackage: 'Full Wedding Package',
      amount: 2500,
      content: 'Sample wedding photography contract...',
      status: 'draft',
      createdAt: new Date('2024-01-15').toISOString(),
      updatedAt: new Date('2024-01-15').toISOString()
    },
    {
      id: '2',
      vendorId: '2',
      clientName: 'Mike & Sarah Johnson',
      eventDate: '2024-07-20',
      eventVenue: 'Riverside Hotel',
      servicePackage: 'Premium Catering Package',
      amount: 4500,
      content: 'Sample catering contract...',
      status: 'signed',
      createdAt: new Date('2024-01-20').toISOString(),
      updatedAt: new Date('2024-01-25').toISOString()
    }
  ];
  
  localStorage.setItem(STORAGE_KEYS.CONTRACTS, JSON.stringify(sampleContracts));
}
