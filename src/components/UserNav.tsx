'use client';

import React from 'react';
import { SignOutButton, useUser } from '@clerk/clerk-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import { Dialog, DialogTrigger } from './ui/dialog';
import DeactiveAccount from './DeactiveAccount';
import { usePathname, useRouter } from 'next/navigation';

const UserNav = () => {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.imageUrl} alt="@devlink" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-md font-medium leading-none">
                {user?.username}
              </p>
              <p className="text-sm leading-none text-muted-foreground">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {pathname !== '/dashboard' ? (
              <DropdownMenuItem>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full text-left"
                >
                  Dashboard
                </button>
              </DropdownMenuItem>
            ) : null}
            {user?.username ? (
              <DropdownMenuItem>
                <Link
                  className="w-full text-left"
                  href={`/profiles/${user?.username}`}
                  target="_blank"
                >
                  View Profile
                </Link>
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <button className="w-full text-left">Deactive Account</button>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton
              signOutCallback={() => {
                router.replace('/');
              }}
            >
              <button className="w-full text-left">Log Out</button>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeactiveAccount />
    </Dialog>
  );
};

export default UserNav;
