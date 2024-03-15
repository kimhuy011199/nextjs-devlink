import { SignUp } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dev Link - Sign Up',
};

export default function Page() {
  return <SignUp />;
}
