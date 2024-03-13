'use client';

import React, { useState } from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

const DeactiveAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signOut } = useClerk();
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  const handleDeactiveAccount = async () => {
    setIsLoading(true);
    await fetch(`/api/profiles/${user?.id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        toast({
          description: 'Your account have been successfully deactivated!',
        });
        signOut(() => router.push('/'));
      })
      .catch(() => {
        toast({
          description: 'Something went wrong. Please try again!',
          variant: 'destructive',
        });
      });
    setIsLoading(false);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Deactive Your Account</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Are your sure to deactive your account? This action cannot be undone.
      </DialogDescription>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button
          disabled={isLoading}
          variant="destructive"
          onClick={handleDeactiveAccount}
        >
          Deactive
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeactiveAccount;
