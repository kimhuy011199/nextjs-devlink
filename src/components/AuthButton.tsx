'use client';

import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import UserNav from './UserNav';

const AuthButton = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      {isSignedIn ? (
        <UserNav />
      ) : (
        <Link
          className="flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline"
          href="/dashboard"
        >
          <span>Create Profile</span>
          <LogIn size={16} strokeWidth={2.5} />
        </Link>
      )}
    </>
  );
};

export default AuthButton;
