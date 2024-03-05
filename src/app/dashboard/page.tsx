import MainContent from '@/app/dashboard/components/MainContent';
import Header from '@/components/Header';
import { getCurrentProfile } from '@/lib/profiles';
import { auth, currentUser } from '@clerk/nextjs';

export default async function Dashboard() {
  const profileData = await getCurrentProfile();
  // const autha = auth();
  // console.log('autha', autha);
  // const token = await autha.getToken();
  // console.log('token', token);

  const profileUrl = profileData
    ? `http://localhost:3000/profiles/${profileData?.username}`
    : '';

  const user = await currentUser();

  const userFullName =
    user?.firstName && user?.lastName && `${user.firstName} ${user.lastName}`;

  const formValues = {
    fullName: profileData?.fullName || userFullName || '',
    email: profileData?.email || user?.emailAddresses?.[0]?.emailAddress || '',
    avatar: profileData?.avatar || user?.imageUrl || '',
    urls: profileData?.urls || [],
  };

  return (
    <>
      <Header
        profileUrl={profileUrl}
        qrCodeUrl={profileUrl}
        isEditMode={!!profileUrl}
      />
      <MainContent formValues={formValues} />
    </>
  );
}
