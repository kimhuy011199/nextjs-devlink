import { redirect } from 'next/navigation';
import MainContent from '@/app/dashboard/components/MainContent';
import Header from '@/components/Header';
import { getCurrentProfile } from '@/lib/profiles';

export default async function Dashboard() {
  const profileData = await getCurrentProfile();
  const profilePath = profileData ? `/profiles/${profileData?.username}` : '';

  if (!profileData?.username) {
    redirect('/dashboard/register');
  }

  return (
    <>
      <Header profilePath={profilePath} isEditMode={!!profilePath} />
      <MainContent formValues={profileData} profilePath={profilePath} />
    </>
  );
}
