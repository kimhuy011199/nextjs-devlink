import { redirect } from 'next/navigation';
import { getCurrentProfile } from '@/lib/profiles';
import UsernameForm from './components/UsernameForm';

export default async function RegisterUsername() {
  const profileData = await getCurrentProfile();

  if (profileData?.username) {
    redirect('/dashboard');
  }

  return (
    <>
      <UsernameForm />
    </>
  );
}
