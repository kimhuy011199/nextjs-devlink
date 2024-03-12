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
  DropdownMenuShortcut,
} from './ui/dropdown-menu';
import { Dialog, DialogTrigger } from './ui/dialog';
import DeactiveAccount from './DeactiveAccount';

const UserNav = () => {
  const { user } = useUser();
  console.log('user', user);

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.imageUrl} alt="@devlink" />
              <AvatarFallback>DL</AvatarFallback>
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
            <DropdownMenuItem>
              <Link
                className="w-full text-left"
                href={`/profiles/${user?.username}`}
                target="_blank"
              >
                View Profile
              </Link>
              {/* <DropdownMenuShortcut>⌘P</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <button className="w-full text-left">Deactive Account</button>
              </DialogTrigger>
              {/* <DropdownMenuShortcut>⌘D</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton>
              <button className="w-full text-left">Log Out</button>
            </SignOutButton>
            {/* <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeactiveAccount />
    </Dialog>
  );
};

export default UserNav;
