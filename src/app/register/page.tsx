import { redirect } from 'next/navigation';
import { getCurrentProfile } from '@/lib/profiles';
import UsernameForm from './components/UsernameForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dev Link - Register new username',
};

export default async function RegisterUsername() {
  const profileData = await getCurrentProfile();

  if (!profileData) {
    redirect('/sign-up');
  }

  if (profileData?.username) {
    redirect('/dashboard');
  }

  return <UsernameForm />;
}
