'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authenticateUser, setCurrentUser } from '@/lib/auth';
import AnimatedElement from '../common/AnimatedElement';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = authenticateUser(email, password);
      if (user) {
        setCurrentUser(user);
        router.push('/dashboard');
        toast.success('Login successful');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedElement variant='fadeInUp' className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Wedding Vendor Portal</CardTitle>
          <CardDescription>
            Sign in to manage your contracts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <Button type="submit" className="w-full flex items-center gap-1" disabled={isLoading}>
              {isLoading && (
                <Loader className="w-4 h-4 animate-spin" />
              )}
              <span>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </span>
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Test Accounts:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div>📸 photographer@test.com</div>
              <div>🍽️ caterer@test.com</div>
              <div>🌸 florist@test.com</div>
              <div className="mt-2 font-medium">Password: password123</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedElement>
  );
}
