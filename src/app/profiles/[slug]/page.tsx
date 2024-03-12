import { notFound } from 'next/navigation';
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
    notFound();
  }

  const { username, fullName, email, avatar, urls } = profileData;
  console.log('first', profileData);

  const profilePath = `/profiles/${profileData?.username}`;

  return (
    <>
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
