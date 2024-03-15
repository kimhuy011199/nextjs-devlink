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

  const { username, bio, fullName, email, avatar, urls } = profileData;
  const profilePath = `/profiles/${username}`;

  return (
    <>
      <ProfileSection
        profilePath={profilePath}
        fullName={fullName}
        bio={bio}
        email={email}
        avatar={avatar}
        links={urls}
        className="w-96 mx-auto"
      />
    </>
  );
}
