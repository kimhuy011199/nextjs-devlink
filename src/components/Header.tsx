'use client';

import Logo from './Logo';
import AuthButton from './AuthButton';
import Card from './Card';
import { usePathname } from 'next/navigation';

const AUTH_PATH = [
  '/sign-in',
  '/sign-in/sso-callback',
  '/sign-up',
  '/sign-up/sso-callback',
];

const Header = () => {
  const pathname = usePathname();
  const hasAuthButton = !AUTH_PATH.includes(pathname);

  return (
    <Card className="py-4 px-5 justify-between items-center h-16">
      <h1>
        <Logo />
      </h1>
      {hasAuthButton ? <AuthButton /> : null}
    </Card>
  );
};

export default Header;
