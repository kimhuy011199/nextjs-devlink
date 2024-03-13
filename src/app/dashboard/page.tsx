import { redirect } from 'next/navigation';
import MainContent from '@/app/dashboard/components/MainContent';
import { getCurrentProfile } from '@/lib/profiles';

export const revalidate = 0;
// export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const profileData = await getCurrentProfile();
  const profilePath = profileData ? `/profiles/${profileData?.username}` : '';
  console.log('profilePath', profilePath);

  if (!profileData?.username) {
    redirect('/register');
  }

  console.log('profileData?.username', profileData?.username);

  return (
    <>
      <MainContent formValues={profileData} profilePath={profilePath} />
    </>
  );
}
