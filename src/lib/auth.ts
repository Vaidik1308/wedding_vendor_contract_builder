import { TEST_VENDORS, type AuthUser } from './types';

export function authenticateUser(email: string, password: string): AuthUser | null {
  if (password !== 'password123') {
    return null;
  }

  const vendor = TEST_VENDORS.find(v => v.email === email);
  if (!vendor) {
    return null;
  }

  return {
    id: vendor.id,
    email: vendor.email,
    name: vendor.name,
    type: vendor.type
  };
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  
  const userData = localStorage.getItem('wedding_vendor_user');
  if (!userData) return null;
  
  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: AuthUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('wedding_vendor_user', JSON.stringify(user));
}

export function logoutUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('wedding_vendor_user');
}
