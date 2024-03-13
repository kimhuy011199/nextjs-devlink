import { notFound } from 'next/navigation';
import ProfileSection from '@/components/ProfileSection';
import { getProfileByUsername } from '@/lib/profiles';

export default async function ProfileDetail({
  params,
}: {
  params: { slug: string };
}) {
  const profileData = await getProfileByUsername(params.slug);
  if (!profileData) {
    notFound();
  }

  const { username, fullName, email, avatar, urls } = profileData;
  const profilePath = `/profiles/${username}`;

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
