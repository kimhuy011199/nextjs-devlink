import MainContent from '@/app/dashboard/components/MainContent';
import Header from '@/components/Header';
import { getCurrentProfile } from '@/lib/profiles';

export default async function Dashboard() {
  const profileData = await getCurrentProfile();
  const profileUrl = profileData ? `/profiles/${profileData?.username}` : '';

  return (
    <>
      <Header
        profileUrl={profileUrl}
        qrCodeUrl={profileUrl}
        isEditMode={!!profileUrl}
      />
      <MainContent formValues={profileData} />
    </>
  );
}
