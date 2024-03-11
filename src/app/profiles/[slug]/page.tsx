import Header from '@/components/Header';
import ProfileSection from '@/components/ProfileSection';
import { getProfileByUsername } from '@/lib/profiles';

export default async function ProfileDetail({
  params,
}: {
  params: { slug: string };
}) {
  console.log('params', params);
  const profileData = await getProfileByUsername(params.slug);

  if (!profileData) {
    return <h2>Not found</h2>;
  }

  const { username, fullName, email, avatar, urls } = profileData;
  console.log('first', profileData);

  const profilePath = `/profiles/${profileData?.username}`;

  return (
    <>
      <Header />
      <ProfileSection
        profilePath={profilePath}
        fullName={fullName}
        email={email}
        avatar={avatar}
        links={urls}
      />
    </>
  );
}
